// src/services/devices.js
const API_BASE =
  process.env.REACT_APP_API_BASE ||
  'https://164478cbc2ce.ngrok-free.app/api';

export async function fetchDevices(params = {}) {
  const usp = new URLSearchParams(params);
  const url = `${API_BASE}/api/devices${usp.toString() ? `?${usp}` : ''}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`fetchDevices failed: ${res.status} ${text}`);
  }
  return res.json();
}

export const pickImage = (t) =>
  t === 'ac' ? '../image/airMock.png'
  : t === 'ffu' ? '../image/FFU.png'
  : '../image/unknown.png';

const parseBuilding = (row) => {
  const m = String(row.location || '').match(/Zone\s+([A-Za-z])/i);
  if (m) return m[1].toUpperCase();
  const m2 = String(row.site || '').match(/([A-Za-z])\-line/i);
  return m2 ? m2[1].toUpperCase() : 'A';
};

const parseFloor = (row) => {
  const m = String(row.floor || '').match(/(\d+)/);
  return m ? m[1] : '1';
};

export function mapRowsToUiGroups(rows = []) {
  const groups = { Airconditioner: [], fanfilter: [] };
  rows
    .filter(r => r.device_type === 'ac' || r.device_type === 'ffu')
    .sort((a,b) => a.device_type.localeCompare(b.device_type) || ((a.short_index??0)-(b.short_index??0)))
    .forEach((r) => {
      const kind = r.device_type === 'ac' ? 'Airconditioner' : 'fanfilter';
      groups[kind].push({
        id: r.device_id,
        img: pickImage(r.device_type),
        name: r.device_name || r.device_id,
        status: r.read_only ? 'inactive' : 'active',
        speed: r.device_type === 'ac' ? 24 : 50, // ค่าเริ่มต้น; ค่าจริงมาทาง WS
        pressureDrop: 125,
        mode: r.device_type === 'ac' ? 'cool' : undefined,
        battery: '78%',
        position: r.position || { top: '0%', left: '0%' },
        building: parseBuilding(r),
        floor: parseFloor(r),
        device_type: r.device_type,
      });
    });
  return groups;
}

export async function getDevicesGrouped(params = {}) {
  const rows = await fetchDevices({ order_by: 'device_type,short_index', ...params });
  return mapRowsToUiGroups(rows);
}
