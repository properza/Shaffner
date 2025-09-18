// useDevicesData.js
import { useEffect, useMemo, useRef, useState } from "react";
import { sendFfu as sendFfuApi, sendAc as sendAcApi } from "../services/commands";

const pickImage = (t) =>
  t === "ac" ? "../image/airMock.png" :
  t === "ffu" ? "../image/FFU.png" :
  "../image/unknown.png";

// "Zone A" -> "A"
const parseBuilding = (row) => {
  const m = String(row.location || "").match(/Zone\s+([A-Za-z])/i);
  if (m) return m[1].toUpperCase();
  const m2 = String(row.site || "").match(/([A-Za-z])\-line/i);
  return m2 ? m2[1].toUpperCase() : "A";
};
// "Floor 1" -> "1"
const parseFloor = (row) => {
  const m = String(row.floor || "").match(/(\d+)/);
  return m ? m[1] : "1";
};

export default function useDevicesData({
  apiBase = "https://164478cbc2ce.ngrok-free.app/api",
  wsUrl  = "wss://164478cbc2ce.ngrok-free.app/ws",
  onAck,                         // (device_id, data) => void
} = {}) {

  // -------- register (metadata) --------
  const [registerRows, setRegisterRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const TOKEN = localStorage.getItem("token")

  // -------- realtime states --------
  const [ffu, setFfu] = useState({}); // { FFU01: { power, fan_speed, fault, ts } }
  const [ac,  setAc]  = useState({}); // { AC01:  { power, set_temp, room_temp, mode, fault, ts } }
  const [pm,  setPm]  = useState({}); // { PM01:  { pm25, hum, temp, ts } }
  const [wsStatus, setWsStatus] = useState("disconnected");

  const wsRef = useRef(null);
  const aliveRef = useRef(null);
  const ffuDebRef = useRef({});       // per-device debounce timer for fan_speed

  // ---- fetch register (and expose refresher) ----
  const refreshRegister = async () => {
    const res = await fetch(`${apiBase}/ac`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = await res.json();
    setRegisterRows(rows || []);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await refreshRegister();
        if (!cancelled) setLoadError(null);
      } catch (e) {
        if (!cancelled) setLoadError(e.message || "load error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [apiBase]);

  // ---- websocket realtime ----
  useEffect(() => {
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setWsStatus("connected");
      aliveRef.current = setInterval(() => {
        try { ws.send(JSON.stringify({ type: "ping" })); } catch {}
      }, 30_000);
    };
    ws.onclose = () => {
      setWsStatus("disconnected");
      if (aliveRef.current) clearInterval(aliveRef.current);
      aliveRef.current = null;
    };
    ws.onerror = () => setWsStatus("error");
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        switch (msg.type) {
          case "ffu_status": {
            const st = msg.data || {};
            setFfu((prev) => ({
              ...prev,
              [msg.device_id]: {
                power: st.power,
                fan_speed: Number(st.fan_speed ?? 0),
                fault: !!st.fault,
                ts: st.ts,
              },
            }));
            break;
          }
          case "ac_status": {
            const st = msg.data || {};
            setAc((prev) => ({
              ...prev,
              [msg.device_id]: {
                power: st.power,
                set_temp: Number(st.set_temp ?? 24),
                room_temp: Number(st.room_temp ?? 0),
                mode: st.mode || "cool",
                fault: !!st.fault,
                ts: st.ts,
              },
            }));
            break;
          }
          case "pm25_value": {
            const st = msg.data || {};
            setPm((prev) => ({
              ...prev,
              [msg.device_id]: {
                pm25: Number(st.pm25 ?? st.v ?? 0),
                hum: Number(st.hum ?? st.h ?? 0),
                temp: Number(st.temp ?? st.t ?? 0),
                ts: st.ts,
              },
            }));
            break;
          }
          case "ack": {
            // แจ้งขึ้นไปให้หน้า UI แสดง feed ได้
            if (typeof onAck === "function") onAck(msg.device_id, msg.data || {});
            break;
          }
          default:
            break;
        }
      } catch {}
    };

    return () => {
      try { ws.close(); } catch {}
      if (aliveRef.current) clearInterval(aliveRef.current);
      aliveRef.current = null;
      // เคลียร์ debounce timers
      Object.values(ffuDebRef.current || {}).forEach((t) => clearTimeout(t));
      ffuDebRef.current = {};
    };
  }, [wsUrl, onAck]);

  // ---- merge register + realtime into UI groups ----
  const groups = useMemo(() => {
    const out = { Airconditioner: [], fanfilter: [] };
    const rows = [...registerRows]
      .filter((r) => r.device_type === "ac" || r.device_type === "ffu")
      .sort(
        (a, b) =>
          a.device_type.localeCompare(b.device_type) ||
          ((a.short_index ?? 0) - (b.short_index ?? 0))
      );

    for (const r of rows) {
      const kind = r.device_type === "ac" ? "Airconditioner" : "fanfilter";
      const st   = r.device_type === "ac" ? ac[r.device_id] : ffu[r.device_id];

      out[kind].push({
        id: r.device_id,
        img: pickImage(r.device_type),
        name: r.device_name || r.device_id,
        status: r.read_only ? "inactive" : "active",
        // NOTE:
        // - FFU: ใช้ fan_speed จริงถ้ามี (0..100)
        // - AC : ใช้ set_temp เป็น "speed" ของ UI เดิมเพื่อไม่ต้องเปลี่ยน layout
        speed: r.device_type === "ffu"
          ? Number(st?.fan_speed ?? 50)
          : Number(st?.set_temp ?? 24),
        pressureDrop: 125, // เติมค่าจริงได้ภายหลังถ้ามี
        mode: r.device_type === "ac" ? (st?.mode || "cool") : undefined,
        battery: "78%",    // mock
        position: r.position || { top: "0%", left: "0%" },
        building: parseBuilding(r),
        floor: parseFloor(r),
        device_type: r.device_type,
        _st: st, // เผื่อหน้าอื่นต้องการสถานะดิบ
      });
    }
    return out;
  }, [registerRows, ac, ffu]);

  // -------- command helpers (downlink) --------
  // FFU: รองรับ debounce เมื่อเป็นคำสั่ง set fan_speed จากสไลเดอร์
  const sendFfu = async (id, body, { debounceMs = 0, optimistic = true } = {}) => {
    // optimistic update (เฉพาะ key ที่เรารู้จัก)
    if (optimistic) {
      setFfu((prev) => {
        const cur = prev[id] || {};
        return { ...prev, [id]: {
          ...cur,
          ...(body.power ? { power: body.power } : {}),
          ...(typeof body.fan_speed === "number" ? { fan_speed: body.fan_speed } : {}),
        }};
      });
    }

    if (debounceMs > 0 && "fan_speed" in body) {
      clearTimeout(ffuDebRef.current[id]);
      ffuDebRef.current[id] = setTimeout(() => {
        sendFfuApi(id, body).catch(() => {});
      }, debounceMs);
      return;
    }
    return sendFfuApi(id, body);
  };

  // AC: ส่งทันที (ทั่วไปไม่ต้อง debounce)
  const sendAc = async (id, body, { optimistic = true } = {}) => {
    if (optimistic) {
      setAc((prev) => {
        const cur = prev[id] || {};
        return { ...prev, [id]: {
          ...cur,
          ...(body.power ? { power: body.power } : {}),
          ...(typeof body.set_temp === "number" ? { set_temp: body.set_temp } : {}),
          ...(body.mode ? { mode: body.mode } : {}),
        }};
      });
    }
    return sendAcApi(id, body);
  };

  return {
    // data for Leads
    groups,                 // { Airconditioner:[], fanfilter:[] }
    loading, loadError,
    wsStatus,

    // raw maps (ถ้าหน้าอื่นอยากใช้)
    ffu, ac, pm,

    // downlink commands
    sendFfu, sendAc,

    // utilities
    refreshRegister,
  };
}