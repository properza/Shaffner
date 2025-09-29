import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ReactSpeedometer from "react-d3-speedometer";
import Select from "react-select";

const devices = {
  Airconditioner: [
    // { id: 1, img: '../image/airMock.png', name: 'Daikin CX01', speed: '25', pressureDrop: '125', status: 'active', mode: 'fan', battery: '78%', position: { top: '35%', left: '70%' }, building: 'A', floor: '1' },
    // { id: 2, img: '../image/airMock.png', name: 'Daikin CX02', speed: '25', pressureDrop: '186', status: 'active', mode: 'fan', battery: '78%', position: { top: '43%', left: '70%' }, building: 'A', floor: '1' },
    // { id: 3, img: '../image/airMock.png', name: 'Daikin CX03', speed: '25', pressureDrop: '155', status: 'active', mode: 'cool', battery: '78%', position: { top: '65%', left: '70%' }, building: 'A', floor: '1' },
    // { id: 4, img: '../image/airMock.png', name: 'Daikin CX04', speed: '25', pressureDrop: '450', status: 'active', mode: 'cool', battery: '78%', position: { top: '65%', left: '60%' }, building: 'A', floor: '1' },
    // { id: 5, img: '../image/airMock.png', name: 'Daikin CX05', speed: '25', pressureDrop: '450', status: 'active', mode: 'cool', battery: '78%', position: { top: '65%', left: '51%' }, building: 'A', floor: '1' },
    // { id: 6, img: '../image/airMock.png', name: 'Daikin CX06', speed: '25', pressureDrop: '125', status: 'active', mode: 'fan', battery: '78%', position: { top: '65%', left: '43%' }, building: 'A', floor: '1' },

    {
      id: 7,
      img: "../image/airMock.png",
      name: "Daikin CX07",
      speed: "25",
      pressureDrop: "186",
      status: "active",
      mode: "fan",
      battery: "78%",
      position: { top: "13%", left: "44%" },
      building: "A",
      floor: "2",
    },
    {
      id: 8,
      img: "../image/airMock.png",
      name: "Daikin CX08",
      speed: "25",
      pressureDrop: "155",
      status: "active",
      mode: "cool",
      battery: "78%",
      position: { top: "13%", left: "54%" },
      building: "A",
      floor: "2",
    },
    {
      id: 9,
      img: "../image/airMock.png",
      name: "Daikin CX09",
      speed: "25",
      pressureDrop: "450",
      status: "active",
      mode: "cool",
      battery: "78%",
      position: { top: "13%", left: "64%" },
      building: "A",
      floor: "2",
    },
    {
      id: 10,
      img: "../image/airMock.png",
      name: "Daikin CX010",
      speed: "25",
      pressureDrop: "125",
      status: "active",
      mode: "fan",
      battery: "78%",
      position: { top: "13%", left: "74%" },
      building: "A",
      floor: "2",
    },
    {
      id: 11,
      img: "../image/airMock.png",
      name: "Daikin CX011",
      speed: "25",
      pressureDrop: "186",
      status: "active",
      mode: "fan",
      battery: "78%",
      position: { top: "42%", left: "71%" },
      building: "A",
      floor: "2",
    },
    {
      id: 12,
      img: "../image/airMock.png",
      name: "Daikin CX012",
      speed: "25",
      pressureDrop: "155",
      status: "active",
      mode: "cool",
      battery: "78%",
      position: { top: "51%", left: "71%" },
      building: "A",
      floor: "2",
    },
    {
      id: 13,
      img: "../image/airMock.png",
      name: "Daikin CX013",
      speed: "25",
      pressureDrop: "450",
      status: "active",
      mode: "cool",
      battery: "78%",
      position: { top: "65%", left: "44%" },
      building: "A",
      floor: "2",
    },
    {
      id: 14,
      img: "../image/airMock.png",
      name: "Daikin CX014",
      speed: "25",
      pressureDrop: "125",
      status: "active",
      mode: "fan",
      battery: "78%",
      position: { top: "65%", left: "54%" },
      building: "A",
      floor: "2",
    },
    {
      id: 15,
      img: "../image/airMock.png",
      name: "Daikin CX015",
      speed: "25",
      pressureDrop: "186",
      status: "active",
      mode: "fan",
      battery: "78%",
      position: { top: "65%", left: "64%" },
      building: "A",
      floor: "2",
    },
    {
      id: 16,
      img: "../image/airMock.png",
      name: "Daikin CX016",
      speed: "25",
      pressureDrop: "155",
      status: "active",
      mode: "cool",
      battery: "78%",
      position: { top: "65%", left: "74%" },
      building: "A",
      floor: "2",
    },

    // { id: 17, img: '../image/airMock.png', name: 'Daikin CX017', speed: '25', pressureDrop: '450', status: 'active', mode: 'cool', battery: '78%', position: { top: '13%', left: '48%' }, building: 'A', floor: '3' },
    // { id: 18, img: '../image/airMock.png', name: 'Daikin CX018', speed: '25', pressureDrop: '125', status: 'active', mode: 'fan', battery: '78%', position: { top: '13%', left: '57%' }, building: 'A', floor: '3' },
    // { id: 19, img: '../image/airMock.png', name: 'Daikin CX019', speed: '25', pressureDrop: '186', status: 'active', mode: 'fan', battery: '78%', position: { top: '13%', left: '65%' }, building: 'A', floor: '3' },
    // { id: 20, img: '../image/airMock.png', name: 'Daikin CX020', speed: '25', pressureDrop: '155', status: 'active', mode: 'cool', battery: '78%', position: { top: '13%', left: '73%' }, building: 'A', floor: '3' },
    // { id: 21, img: '../image/airMock.png', name: 'Daikin CX021', speed: '25', pressureDrop: '450', status: 'active', mode: 'cool', battery: '78%', position: { top: '44%', left: '49%' }, building: 'A', floor: '3' },
    // { id: 22, img: '../image/airMock.png', name: 'Daikin CX022', speed: '25', pressureDrop: '450', status: 'active', mode: 'cool', battery: '78%', position: { top: '51%', left: '49%' }, building: 'A', floor: '3' },
    // { id: 23, img: '../image/airMock.png', name: 'Daikin CX023', speed: '25', pressureDrop: '450', status: 'active', mode: 'cool', battery: '78%', position: { top: '49%', left: '56%' }, building: 'A', floor: '3' },
    // { id: 24, img: '../image/airMock.png', name: 'Daikin CX024', speed: '25', pressureDrop: '450', status: 'active', mode: 'cool', battery: '78%', position: { top: '56%', left: '56%' }, building: 'A', floor: '3' },
  ],
  fanfilter: [
    {
      id: 1,
      img: "../image/FFU.png",
      name: "Fan Filter Unit 01",
      speed: "50",
      pressureDrop: "125",
      status: "active",
      position: { top: "41%", left: "65%" },
      building: "A",
      floor: "1",
    },
    {
      id: 2,
      img: "../image/FFU.png",
      name: "Fan Filter Unit 02",
      speed: "50",
      pressureDrop: "186",
      status: "active",
      position: { top: "41%", left: "65%" },
      building: "A",
      floor: "2",
    },
    {
      id: 3,
      img: "../image/FFU.png",
      name: "Fan Filter Unit 03",
      speed: "50",
      pressureDrop: "155",
      status: "active",
      position: { top: "41%", left: "65%" },
      building: "A",
      floor: "3",
    },

    {
      id: 4,
      img: "../image/FFU.png",
      name: "Fan Filter Unit 04",
      speed: "50",
      pressureDrop: "450",
      status: "active",
      position: { top: "21%", left: "40%" },
      building: "B",
      floor: "1",
    },
    {
      id: 5,
      img: "../image/FFU.png",
      name: "Fan Filter Unit 05",
      speed: "50",
      pressureDrop: "125",
      status: "active",
      position: { top: "21%", left: "66%" },
      building: "B",
      floor: "1",
    },
    {
      id: 6,
      img: "../image/FFU.png",
      name: "Fan Filter Unit 06",
      speed: "50",
      pressureDrop: "186",
      status: "active",
      position: { top: "56%", left: "66%" },
      building: "B",
      floor: "1",
    },

    {
      id: 7,
      img: "../image/FFU.png",
      name: "Fan Filter Unit 07",
      speed: "50",
      pressureDrop: "155",
      status: "active",
      position: { top: "23%", left: "41%" },
      building: "B",
      floor: "2",
    },
    {
      id: 8,
      img: "../image/FFU.png",
      name: "Fan Filter Unit 08",
      speed: "50",
      pressureDrop: "450",
      status: "active",
      position: { top: "23%", left: "62%" },
      building: "B",
      floor: "2",
    },
    {
      id: 9,
      img: "../image/FFU.png",
      name: "Fan Filter Unit 09",
      speed: "50",
      pressureDrop: "450",
      status: "active",
      position: { top: "56%", left: "41%" },
      building: "B",
      floor: "2",
    },
  ],
};

const devicesGroup = {
  Airconditioner: [
    {
      id: 0,
      img: "../image/airMock.png",
      name: "Daikin CX01",
      speed: "25",
      pressureDrop: "125",
      status: "active",
      mode: "fan",
      battery: "78%",
      position: { top: "20%", left: "44%" },
    },
  ],
  fanfilter: [
    {
      id: 0,
      img: "../image/FFU.png",
      name: "Fan Filter Unit 01",
      speed: "50",
      pressureDrop: "125",
      status: "active",
      position: { top: "20%", left: "20%" },
    },
  ],
};

const accumulatedCostData = [
  { time: "06:00", cost: 2 },
  { time: "07:00", cost: 3 },
  { time: "08:00", cost: 4 },
  { time: "09:00", cost: 6 },
  { time: "10:00", cost: 8 },
  { time: "11:00", cost: 9 },
  { time: "12:00", cost: 10 },
  { time: "13:00", cost: 12 },
  { time: "14:00", cost: 13 },
  { time: "15:00", cost: 14 },
  { time: "16:00", cost: 15 },
  { time: "17:00", cost: 16 },
];

const pressureDropData = [
  { time: "06:00", drop: 50 },
  { time: "07:00", drop: 55 },
  { time: "08:00", drop: 60 },
  { time: "09:00", drop: 75 },
  { time: "10:00", drop: 80 },
  { time: "11:00", drop: 90 },
  { time: "12:00", drop: 110 },
  { time: "13:00", drop: 120 },
  { time: "14:00", drop: 140 },
  { time: "15:00", drop: 160 },
  { time: "16:00", drop: 180 },
  { time: "17:00", drop: 200 },
  { time: "18:00", drop: 204 },
  { time: "19:00", drop: 208 },
  { time: "20:00", drop: 215 },
  { time: "21:00", drop: 198 },
  { time: "22:00", drop: 240 },
  { time: "23:00", drop: 150 },
  { time: "00:00", drop: 160 },
  { time: "01:00", drop: 165 },
  { time: "02:00", drop: 170 },
  { time: "03:00", drop: 175 },
  { time: "04:00", drop: 172 },
  { time: "05:00", drop: 178 },
];

function Leads() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedOption, setSelectedOption] = useState("electricity");
  const [expandedMenuId, setExpandedMenuId] = useState(false);
  const [selectedDeviceCheck, setSelectedDeviceCheck] =
    useState("Airconditioner");
  const [selectedMode, setSelectedMode] = useState("single");
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(true);
  const [deviceStatus, setDeviceStatus] = useState({});
  const [activeBtn, setActiveBtn] = useState(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [timeStart, setTimeStart] = useState("08:00");
  const [timeEnd, setTimeEnd] = useState("18:00");
  const [selectedDays, setSelectedDays] = useState([]); // ['MON','TUE',...]
  const [schedules, setSchedules] = useState({}); // { [deviceId]: { timeStart, timeEnd, days } }

  const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const { selectedBuilding, selectedFloor } = useSelector(
    (state) => state.data
  );
  const filteredDevices = React.useMemo(() => {
    return (devices[selectedDeviceCheck] || []).filter(
      (d) => d.building === selectedBuilding && d.floor === selectedFloor
    );
  }, [selectedDeviceCheck, selectedBuilding, selectedFloor]);

  // 👇🏻 แล้วค่อยประกาศฟังก์ชัน/ตัวแปรที่พึ่ง filteredDevices
  const isOn = (id) => !!deviceStatus[id];

  const onlineCount = React.useMemo(() => {
    return filteredDevices.filter((d) => isOn(d.id)).length;
  }, [filteredDevices, deviceStatus]);

  const offlineCount = filteredDevices.length - onlineCount;

  const TEMP_MIN = 18;
  const TEMP_MAX = 30;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const incTemp = () => {
    if (!selectedDevice) return;
    setSelectedDevice((prev) => {
      const cur = parseInt(prev?.speed ?? TEMP_MIN);
      return { ...prev, speed: clamp(cur + 1, TEMP_MIN, TEMP_MAX) };
    });
  };

  const decTemp = () => {
    if (!selectedDevice) return;
    setSelectedDevice((prev) => {
      const cur = parseInt(prev?.speed ?? TEMP_MIN);
      return { ...prev, speed: clamp(cur - 1, TEMP_MIN, TEMP_MAX) };
    });
  };

  // ไว้คำนวณความกว้างแท่งแสดงผล (จาก 18→30 เทียบเป็น 0→100%)
  const tempPercent = (() => {
    const cur = clamp(
      parseInt(selectedDevice?.speed ?? TEMP_MIN),
      TEMP_MIN,
      TEMP_MAX
    );
    return ((cur - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * 100;
  })();

  const openScheduleModal = () => {
    if (!selectedDevice) return;
    const existing = schedules[selectedDevice.id] || {
      timeStart: "08:00",
      timeEnd: "18:00",
      days: [],
    };
    setTimeStart(existing.timeStart);
    setTimeEnd(existing.timeEnd);
    setSelectedDays(existing.days);
    setIsScheduleOpen(true);
  };

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const saveSchedule = () => {
    if (!selectedDevice) return;
    setSchedules((prev) => ({
      ...prev,
      [selectedDevice.id]: { timeStart, timeEnd, days: selectedDays },
    }));
    setIsScheduleOpen(false);
  };

  console.log(selectedBuilding, selectedFloor);

  useEffect(() => {
    setActiveBtn(null);
  }, [selectedDevice?.id]);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // เซ็ตครั้งแรกเฉพาะ id ที่ยังไม่มีค่าใน state (ป้องกันกระพริบ)
    setDeviceStatus((prev) => {
      const next = { ...prev };
      filteredDevices.forEach((d) => {
        if (next[d.id] === undefined) {
          next[d.id] = d.status === "active";
        }
      });
      return next;
    });
  }, [filteredDevices]);

  const togglePower = (id) => {
    if (id === 0) {
      setDeviceStatus((prev) => {
        const anyOffInGroup = filteredDevices.some((d) => !prev[d.id]);
        const turnOn = anyOffInGroup;
        const next = { ...prev };
        filteredDevices.forEach((d) => {
          next[d.id] = turnOn;
        });
        return next;
      });
      return;
    }

    setDeviceStatus((prev) => ({ ...prev, [id]: !prev[id] }));

    if (selectedDevice?.id === id) {
      setSelectedDevice((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === "active" ? "inactive" : "active",
            }
          : prev
      );
    }
  };

  const hourlyLabels = Array.from(
    { length: 24 },
    (_, i) => `${String((i + 6) % 24).padStart(2, "0")}:00`
  );

  // ทำ map จากข้อมูลที่มี (จะหาได้เร็ว ๆ)
  const accumulatedCostMap = Object.fromEntries(
    accumulatedCostData.map((d) => [d.time, d.cost])
  );
  const pressureDropMap = Object.fromEntries(
    pressureDropData.map((d) => [d.time, d.drop])
  );

  // ประกอบชุดข้อมูล 24 ชั่วโมง (ถ้าชั่วโมงไหนไม่มีข้อมูล ให้เป็น 0)
  const chartData24 = hourlyLabels.map((time) => ({
    time,
    cost: accumulatedCostMap[time] ?? 0,
    drop: pressureDropMap[time] ?? 0,
  }));

  const data = chartData24;

  const PX_PER_POINT = 80;
  const chartWidth = Math.max((data?.length || 0) * PX_PER_POINT, 800);

  const handleDeviceClick = (device) => {
    setSelectedDevice(device.id !== selectedDevice?.id ? device : null);
  };

  const toggleSubMenu = () => {
    setExpandedMenuId(!expandedMenuId);
  };

  const handleDeviceSelection = (deviceName) => {
    setSelectedDeviceCheck(deviceName === selectedDevice ? null : deviceName);
    setExpandedMenuId(false);
    setSelectedDevice(null);
  };

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
    setExpandedMenuId(false);
    setSelectedDevice(null);
  };

  const handleIncreaseSpeed = () => {
    if (selectedDevice) {
      setSelectedDevice((prevDevice) => ({
        ...prevDevice,
        speed: Math.min(parseInt(prevDevice.speed) + 10, 100),
      }));
    }
  };

  const handleDecreaseSpeed = () => {
    if (selectedDevice) {
      setSelectedDevice((prevDevice) => ({
        ...prevDevice,
        speed: Math.max(parseInt(prevDevice.speed) - 10, 0),
      }));
    }
  };

  const deviceOptions = (devices[selectedDeviceCheck] || []).map((device) => (
    <div
      key={device.id}
      className="flex items-center justify-start gap-5 p-2 w-full cursor-pointer border"
    >
      <div className="flex gap-1 w-1/2">
        <img
          src={device.img}
          alt={device.name}
          className="w-8 h-8 rounded-md"
        />
        <span>{device.name}</span>
      </div>

      {selectedDeviceCheck === "Airconditioner" && (
        <div className="flex justify-start gap-1 gap-y-2 items-center">
          <div className="flex gap-1">
            <svg
              fill="#000000"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 3.48154C7.29535 3.48154 3.48148 7.29541 3.48148 12.0001C3.48148 16.7047 7.29535 20.5186 12 20.5186C16.7046 20.5186 20.5185 16.7047 20.5185 12.0001C20.5185 7.29541 16.7046 3.48154 12 3.48154ZM2 12.0001C2 6.47721 6.47715 2.00006 12 2.00006C17.5228 2.00006 22 6.47721 22 12.0001C22 17.5229 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.5229 2 12.0001Z"
                ></path>{" "}
                <path d="M12 11.3C11.8616 11.3 11.7262 11.3411 11.6111 11.418C11.496 11.4949 11.4063 11.6042 11.3533 11.7321C11.3003 11.86 11.2864 12.0008 11.3134 12.1366C11.3405 12.2724 11.4071 12.3971 11.505 12.495C11.6029 12.5929 11.7277 12.6596 11.8634 12.6866C11.9992 12.7136 12.14 12.6997 12.2679 12.6467C12.3958 12.5937 12.5051 12.504 12.582 12.3889C12.6589 12.2738 12.7 12.1385 12.7 12C12.7 11.8144 12.6262 11.6363 12.495 11.505C12.3637 11.3738 12.1857 11.3 12 11.3ZM12.35 5.00002C15.5 5.00002 15.57 7.49902 13.911 8.32502C13.6028 8.50778 13.3403 8.75856 13.1438 9.05822C12.9473 9.35787 12.8218 9.69847 12.777 10.054C13.1117 10.1929 13.4073 10.4116 13.638 10.691C16.2 9.29102 19 9.84401 19 12.35C19 15.5 16.494 15.57 15.675 13.911C15.4869 13.6029 15.232 13.341 14.9291 13.1448C14.6262 12.9485 14.283 12.8228 13.925 12.777C13.7844 13.1108 13.566 13.406 13.288 13.638C14.688 16.221 14.128 19 11.622 19C8.5 19 8.423 16.494 10.082 15.668C10.3852 15.4828 10.644 15.2332 10.84 14.9368C11.036 14.6404 11.1644 14.3046 11.216 13.953C10.8729 13.8188 10.5711 13.5967 10.341 13.309C7.758 14.695 5 14.149 5 11.65C5 8.50002 7.478 8.42302 8.304 10.082C8.48945 10.3888 8.74199 10.6496 9.04265 10.8448C9.34332 11.0399 9.68431 11.1645 10.04 11.209C10.1748 10.8721 10.3971 10.5772 10.684 10.355C9.291 7.80001 9.844 5.00002 12.336 5.00002H12.35Z"></path>{" "}
              </g>
            </svg>
            <p>Mode: {device.mode}</p>
          </div>
          {/* <div className="flex gap-1 items-center">
            {device.battery}
            <svg
              viewBox="0 0 512 512"
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill="#000000"
                  d="M201 16c-15 0-20 3.38-20 20v15h-45c-29.547 0-35 5.453-35 35v375c0 29.547 5.453 35 35 35h240c29.547 0 35-5.453 35-35V86c0-29.547-5.453-35-35-35h-45V36c0-16.62-5-20-20-20H201zm-48.094 69.813c4.666.02 10.594.187 18.094.187h170c40 0 35-5 35 35v305c0 40 5 35-35 35H171c-40 0-35 5-35-35V121c0-32.5-3.31-35.283 16.906-35.188zM161 191c-5.54 0-10 4.46-10 10v55c0 5.54 4.46 10 10 10h190c5.54 0 10-4.46 10-10v-55c0-5.54-4.46-10-10-10H161zm0 90c-5.54 0-10 4.46-10 10v55c0 5.54 4.46 10 10 10h190c5.54 0 10-4.46 10-10v-55c0-5.54-4.46-10-10-10H161zm0 90c-5.54 0-10 4.46-10 10v55c0 5.54 4.46 10 10 10h190c5.54 0 10-4.46 10-10v-55c0-5.54-4.46-10-10-10H161z"
                ></path>
              </g>
            </svg>
          </div> */}
        </div>
      )}
    </div>
  ));

  const bgimage = () => {
    if (selectedBuilding === "A" && selectedFloor === "1") {
      return "../image/buildingA1.png";
    } else if (selectedBuilding === "A" && selectedFloor === "2") {
      return "../image/buildingA2.png";
    } else if (selectedBuilding === "A" && selectedFloor === "3") {
      return "../image/buildingA3.png";
    } else if (selectedBuilding === "B" && selectedFloor === "1") {
      return "../image/buildingB1.png";
    } else if (selectedBuilding === "B" && selectedFloor === "2") {
      return "../image/buildingB2.png";
    }
    return "../image/2dMock.png";
  };

  return (
    <>
      <div className="flex h-full">
        <div className="bg-base-100 shadow-xl border-r p-2 w-[25%] h-auto">
          <div className="grid gap-2">
            <div className="relative">
              <div className="flex justify-center items-center border-b pb-2">
                <button
                  className={`mt-2 flex gap-1 px-1 w-full py-2 text-left hover:bg-gray-100 ${
                    expandedMenuId ? "bg-gray-100" : ""
                  }`}
                  onClick={() => toggleSubMenu(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                  Sensors Activity
                </button>
              </div>
              {expandedMenuId && (
                <div className="absolute z-10 bg-white border shadow-md top-[3rem] left-[0rem] rounded-md w-full">
                  <div className="p-2 border bg-[#F4F4F4]">
                    <p className="text-lg text-[#1D24A1] font-semibold">
                      Device options menu
                    </p>
                    <ul>
                      <li
                        className={`p-1 hover:bg-gray-100 cursor-pointer ${
                          selectedDeviceCheck === "Airconditioner"
                            ? "bg-blue-100"
                            : ""
                        }`}
                        onClick={() => handleDeviceSelection("Airconditioner")}
                      >
                        <label htmlFor="" className="flex gap-1">
                          <input
                            type="checkbox"
                            checked={selectedDeviceCheck === "Airconditioner"}
                            onChange={() => {}}
                          />{" "}
                          Air conditioner
                        </label>
                      </li>
                      <li
                        className={`p-1 hover:bg-gray-100 cursor-pointer ${
                          selectedDeviceCheck === "fanfilter"
                            ? "bg-blue-100"
                            : ""
                        }`}
                        onClick={() => handleDeviceSelection("fanfilter")}
                      >
                        <label htmlFor="" className="flex gap-1">
                          <input
                            type="checkbox"
                            checked={selectedDeviceCheck === "fanfilter"}
                            onChange={() => {}}
                          />{" "}
                          Fan Filter Unit
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="p-2 border bg-[#F4F4F4]">
                    <ul>
                      <li
                        className={`p-1 hover:bg-gray-100 cursor-pointer ${
                          selectedMode === "single" ? "bg-blue-100" : ""
                        }`}
                        onClick={() => handleModeSelection("single")}
                      >
                        <label htmlFor="" className="flex gap-1">
                          <input
                            type="checkbox"
                            checked={selectedMode === "single"}
                            onChange={() => {}}
                          />{" "}
                          Single Device
                        </label>
                      </li>
                      <li
                        className={`p-1 hover:bg-gray-100 cursor-pointer ${
                          selectedMode === "group" ? "bg-blue-100" : ""
                        }`}
                        onClick={() => handleModeSelection("group")}
                      >
                        <label htmlFor="" className="flex gap-1">
                          <input
                            type="checkbox"
                            checked={selectedMode === "group"}
                            onChange={() => {}}
                          />{" "}
                          Group Device
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            {/* <div className="divider mt-0"></div> */}
            <div className="flex justify-between">
              <p className="text-xl font-semibold">
                {selectedDeviceCheck === "Airconditioner"
                  ? "Air Conditioner "
                  : "Fan Filter Unit"}
              </p>
              <p>( {devices[selectedDeviceCheck]?.length} )</p>
            </div>
            <div className="flex gap-3">
              <p className="py-1 px-2 text-white bg-[#166B19] rounded-md font-semibold">
                Online {filteredDevices?.length}
              </p>
              <p className="py-1 px-2 text-white bg-[#3C3C4399] rounded-md font-semibold">
                Offline {filteredDevices?.length}
              </p>
            </div>

            <div className=" overflow-x-auto h-[75vh]">
              {selectedMode === "group" ? (
                <div className="w-full">
                  <div className="flex">
                    {(devicesGroup[selectedDeviceCheck] || []).map((device) => {
                      const speedPercentage = (device.speed / 100) * 100;
                      const pressureDropPercentage =
                        (device.pressureDrop / 500) * 100;
                      return (
                        <div
                          key={device.id}
                          className="flex justify-between w-full gap-1 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleDeviceClick(device)}
                        >
                          <div className="grid w-full grid-cols-2 border-collapse border border-gray-300 justify-center">
                            {(devices[selectedDeviceCheck] || [])
                              .slice(0, 4)
                              .map((device) => (
                                <div key={device.id} className="border p-2">
                                  <img
                                    src={device.img}
                                    alt={device.name}
                                    className="w-8 h-8 mx-auto"
                                  />
                                </div>
                              ))}
                          </div>
                          {selectedDeviceCheck === "Airconditioner" ? (
                            <div className="flex flex-col gap-1 w-full gap-y-2 items-start">
                              <p>Group 1</p>
                              <p className="text-sm">
                                {devices[selectedDeviceCheck].length} Device
                                Connected
                              </p>
                              <div className="flex gap-1 text-sm">
                                <svg
                                  fill="#000000"
                                  className="w-5 h-5"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g
                                    id="SVGRepo_bgCarrier"
                                    stroke-width="0"
                                  ></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M12 3.48154C7.29535 3.48154 3.48148 7.29541 3.48148 12.0001C3.48148 16.7047 7.29535 20.5186 12 20.5186C16.7046 20.5186 20.5185 16.7047 20.5185 12.0001C20.5185 7.29541 16.7046 3.48154 12 3.48154ZM2 12.0001C2 6.47721 6.47715 2.00006 12 2.00006C17.5228 2.00006 22 6.47721 22 12.0001C22 17.5229 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.5229 2 12.0001Z"
                                    ></path>{" "}
                                    <path d="M12 11.3C11.8616 11.3 11.7262 11.3411 11.6111 11.418C11.496 11.4949 11.4063 11.6042 11.3533 11.7321C11.3003 11.86 11.2864 12.0008 11.3134 12.1366C11.3405 12.2724 11.4071 12.3971 11.505 12.495C11.6029 12.5929 11.7277 12.6596 11.8634 12.6866C11.9992 12.7136 12.14 12.6997 12.2679 12.6467C12.3958 12.5937 12.5051 12.504 12.582 12.3889C12.6589 12.2738 12.7 12.1385 12.7 12C12.7 11.8144 12.6262 11.6363 12.495 11.505C12.3637 11.3738 12.1857 11.3 12 11.3ZM12.35 5.00002C15.5 5.00002 15.57 7.49902 13.911 8.32502C13.6028 8.50778 13.3403 8.75856 13.1438 9.05822C12.9473 9.35787 12.8218 9.69847 12.777 10.054C13.1117 10.1929 13.4073 10.4116 13.638 10.691C16.2 9.29102 19 9.84401 19 12.35C19 15.5 16.494 15.57 15.675 13.911C15.4869 13.6029 15.232 13.341 14.9291 13.1448C14.6262 12.9485 14.283 12.8228 13.925 12.777C13.7844 13.1108 13.566 13.406 13.288 13.638C14.688 16.221 14.128 19 11.622 19C8.5 19 8.423 16.494 10.082 15.668C10.3852 15.4828 10.644 15.2332 10.84 14.9368C11.036 14.6404 11.1644 14.3046 11.216 13.953C10.8729 13.8188 10.5711 13.5967 10.341 13.309C7.758 14.695 5 14.149 5 11.65C5 8.50002 7.478 8.42302 8.304 10.082C8.48945 10.3888 8.74199 10.6496 9.04265 10.8448C9.34332 11.0399 9.68431 11.1645 10.04 11.209C10.1748 10.8721 10.3971 10.5772 10.684 10.355C9.291 7.80001 9.844 5.00002 12.336 5.00002H12.35Z"></path>{" "}
                                  </g>
                                </svg>
                                <p>Mode: {device.mode}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="grid gap-1 gap-y-2 w-full items-start">
                              <p className="text-sm flex gap-1">
                                <img
                                  src="../icon/computer-fan-svgrepo-com.svg"
                                  className="w-5 h-5"
                                  alt=""
                                />
                                {device.speed}{" "}
                                <span className="text-sm">speed</span>
                              </p>
                              <div className="w-full h-2 bg-gray-300 rounded-full">
                                <div
                                  className="h-full bg-[#0090CD] rounded-full"
                                  style={{ width: `${speedPercentage}%` }}
                                ></div>
                              </div>

                              <p className="text-sm flex gap-1">
                                <img
                                  src="../icon/pressure-alt-svgrepo-com.svg"
                                  className="w-5 h-5"
                                  alt=""
                                />
                                {device.pressureDrop}%
                              </p>
                              <div className="w-full h-2 bg-gray-300 rounded-full">
                                <div
                                  className="h-full bg-[#515191] rounded-full"
                                  style={{
                                    width: `${pressureDropPercentage}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="">
                  {filteredDevices.map((device) => {
                    const speedPercentage = (device.speed / 100) * 100;
                    const pressureDropPercentage =
                      (device.pressureDrop / 500) * 100;
                    return (
                      <div
                        key={device.id}
                        className="my-1"
                        onClick={() => handleDeviceClick(device)}
                      >
                        <div
                          className={`flex gap-2 items-center w-full hover:bg-gray-100 cursor-pointer ${
                            selectedDevice?.id === device?.id
                              ? "bg-[#EBEEFD]"
                              : ""
                          }`}
                        >
                          <img
                            src={device.img}
                            alt="Device"
                            className="w-18 h-18"
                          />
                          <div className="flex justify-start w-full ">
                            <div className="flex flex-col gap-1 w-full">
                              <div className="flex justify-between w-full mb-1">
                                <p className="font-semibold">{device.name}</p>
                                {device.status === "active" &&
                                isOn(device.id) ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="#166B19"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m4.5 12.75 6 6 9-13.5"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="red"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 18 18 6M6 6l12 12"
                                    />
                                  </svg>
                                )}
                              </div>
                              {selectedDeviceCheck === "Airconditioner" ? (
                                <div className="flex justify-between gap-1 gap-y-2 items-center">
                                  <div className="flex gap-1">
                                    <svg
                                      fill="#000000"
                                      className="w-6 h-6"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                      ></g>
                                      <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      ></g>
                                      <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M12 3.48154C7.29535 3.48154 3.48148 7.29541 3.48148 12.0001C3.48148 16.7047 7.29535 20.5186 12 20.5186C16.7046 20.5186 20.5185 16.7047 20.5185 12.0001C20.5185 7.29541 16.7046 3.48154 12 3.48154ZM2 12.0001C2 6.47721 6.47715 2.00006 12 2.00006C17.5228 2.00006 22 6.47721 22 12.0001C22 17.5229 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.5229 2 12.0001Z"
                                        ></path>{" "}
                                        <path d="M12 11.3C11.8616 11.3 11.7262 11.3411 11.6111 11.418C11.496 11.4949 11.4063 11.6042 11.3533 11.7321C11.3003 11.86 11.2864 12.0008 11.3134 12.1366C11.3405 12.2724 11.4071 12.3971 11.505 12.495C11.6029 12.5929 11.7277 12.6596 11.8634 12.6866C11.9992 12.7136 12.14 12.6997 12.2679 12.6467C12.3958 12.5937 12.5051 12.504 12.582 12.3889C12.6589 12.2738 12.7 12.1385 12.7 12C12.7 11.8144 12.6262 11.6363 12.495 11.505C12.3637 11.3738 12.1857 11.3 12 11.3ZM12.35 5.00002C15.5 5.00002 15.57 7.49902 13.911 8.32502C13.6028 8.50778 13.3403 8.75856 13.1438 9.05822C12.9473 9.35787 12.8218 9.69847 12.777 10.054C13.1117 10.1929 13.4073 10.4116 13.638 10.691C16.2 9.29102 19 9.84401 19 12.35C19 15.5 16.494 15.57 15.675 13.911C15.4869 13.6029 15.232 13.341 14.9291 13.1448C14.6262 12.9485 14.283 12.8228 13.925 12.777C13.7844 13.1108 13.566 13.406 13.288 13.638C14.688 16.221 14.128 19 11.622 19C8.5 19 8.423 16.494 10.082 15.668C10.3852 15.4828 10.644 15.2332 10.84 14.9368C11.036 14.6404 11.1644 14.3046 11.216 13.953C10.8729 13.8188 10.5711 13.5967 10.341 13.309C7.758 14.695 5 14.149 5 11.65C5 8.50002 7.478 8.42302 8.304 10.082C8.48945 10.3888 8.74199 10.6496 9.04265 10.8448C9.34332 11.0399 9.68431 11.1645 10.04 11.209C10.1748 10.8721 10.3971 10.5772 10.684 10.355C9.291 7.80001 9.844 5.00002 12.336 5.00002H12.35Z"></path>{" "}
                                      </g>
                                    </svg>
                                    <p>Mode: {device.mode}</p>
                                  </div>
                                  {/* <div className="flex gap-1">
                                    {device.battery}
                                    <svg
                                      viewBox="0 0 512 512"
                                      className="w-5 h-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="#000000"
                                    >
                                      <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                      ></g>
                                      <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      ></g>
                                      <g id="SVGRepo_iconCarrier">
                                        <path
                                          fill="#000000"
                                          d="M201 16c-15 0-20 3.38-20 20v15h-45c-29.547 0-35 5.453-35 35v375c0 29.547 5.453 35 35 35h240c29.547 0 35-5.453 35-35V86c0-29.547-5.453-35-35-35h-45V36c0-16.62-5-20-20-20H201zm-48.094 69.813c4.666.02 10.594.187 18.094.187h170c40 0 35-5 35 35v305c0 40 5 35-35 35H171c-40 0-35 5-35-35V121c0-32.5-3.31-35.283 16.906-35.188zM161 191c-5.54 0-10 4.46-10 10v55c0 5.54 4.46 10 10 10h190c5.54 0 10-4.46 10-10v-55c0-5.54-4.46-10-10-10H161zm0 90c-5.54 0-10 4.46-10 10v55c0 5.54 4.46 10 10 10h190c5.54 0 10-4.46 10-10v-55c0-5.54-4.46-10-10-10H161zm0 90c-5.54 0-10 4.46-10 10v55c0 5.54 4.46 10 10 10h190c5.54 0 10-4.46 10-10v-55c0-5.54-4.46-10-10-10H161z"
                                        ></path>
                                      </g>
                                    </svg>
                                  </div> */}
                                </div>
                              ) : (
                                <div className="grid grid-cols-2 gap-1 gap-y-2 items-center">
                                  <p className="text-sm flex gap-1">
                                    <img
                                      src="../icon/computer-fan-svgrepo-com.svg"
                                      className="w-5 h-5"
                                      alt=""
                                    />
                                    {device.speed}{" "}
                                    <span className="text-sm">speed</span>
                                  </p>
                                  <div className="w-full h-2 bg-gray-300 rounded-full">
                                    <div
                                      className="h-full bg-[#0090CD] rounded-full"
                                      style={{ width: `${speedPercentage}%` }}
                                    ></div>
                                  </div>

                                  <p className="text-sm flex gap-1">
                                    <img
                                      src="../icon/pressure-alt-svgrepo-com.svg"
                                      className="w-5 h-5"
                                      alt=""
                                    />
                                    {device.pressureDrop}%
                                  </p>
                                  <div className="w-full h-2 bg-gray-300 rounded-full">
                                    <div
                                      className="h-full bg-[#515191] rounded-full"
                                      style={{
                                        width: `${pressureDropPercentage}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        {selectedDevice === null ? (
          <div className="flex justify-center bg-base-100 h-full w-full relative">
            <div className="p-20">
              <img src={bgimage()} alt="" className="w-[100%] m-auto" />
            </div>
            {filteredDevices.map((device) => {
              return (
                <div
                  key={device.id}
                  className="absolute"
                  style={{
                    top: device.position.top,
                    left: device.position.left,
                  }}
                >
                  <img
                    src={device.img}
                    alt={device.name}
                    className="w-16 h-16 rounded-lg bg-[#69696B] border-2 border-white"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-full">
            <div className="flex justify-start border-b">
              <div className="bg-base-100 p-2 w-[45%]">
                <p className="text-xl font-semibold">Device Details</p>
                {selectedDevice ? (
                  <div className="">
                    <div className="flex gap-1 justify-between items-center">
                      <img
                        src={selectedDevice.img}
                        alt="Device"
                        className="w-13 h-13"
                      />
                      <h3 className="text-xl font-semibold">
                        {selectedDevice.id === 0
                          ? "Group 1"
                          : selectedDevice.name}
                      </h3>
                      {isOn(selectedDevice.id) ? (
                        <p className="py-1 px-2 text-white bg-[#166B19] rounded-md font-semibold">
                          Online
                        </p>
                      ) : (
                        <p className="py-1 px-2 text-white bg-gray-500 rounded-md font-semibold">
                          Offline
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2 text-sm">
                      <p>Date of Installation </p>
                      <p>25/07/2568</p>
                      <p>Lase avtive</p>
                      <p>25/07/2568 : Time 08:00-18:00</p>
                    </div>

                    {selectedDevice.id === 0 && (
                      <div className="relative">
                        <button
                          onClick={toggleMenu}
                          className={`py-2 px-4  text-white rounded-md w-full hover:bg-blue-500 ${
                            isOpen ? "bg-[#6791FF]" : "bg-[#BCBCBC]"
                          }`}
                        >
                          List Of All Grouping Device
                        </button>

                        {/* เมนูแสดงอุปกรณ์เมื่อกดปุ่ม */}
                        {isOpen && (
                          <div className="absolute w-full z-10 bg-white shadow-md rounded-md mt-1 border">
                            {deviceOptions}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="grid gap-2 mb-4">
                      <p className="text-lg font-bold">Set up the device</p>
                      {selectedDeviceCheck === "Airconditioner" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => togglePower(selectedDevice.id)}
                            className={`${
                              isOn(selectedDevice.id)
                                ? "bg-[#166B19E3]"
                                : "bg-gray-400"
                            } p-2 rounded-md flex justify-center items-center hover:bg-green-900`}
                          >
                            <img
                              src="../icon/switch1.svg"
                              alt=""
                              className="w-8 h-8"
                            />
                          </button>
                          <div className="flex">
                            <button
                              onClick={() => {
                                setActiveBtn("fan"); // ไฮไลต์ปุ่มพัดลม
                                setSelectedDevice((prev) =>
                                  prev ? { ...prev, mode: "fan" } : prev
                                ); // ยังสลับเป็น cool ตามที่ตั้งใจ
                              }}
                              className={`bg-base-300 p-2 rounded-l-lg flex justify-center w-[50px] items-center hover:bg-gray-400
    ${
      selectedDevice.mode === "fan"
        ? "border-[2px] border-[#4472C4] bg-[#b2ccfa]"
        : ""
    }`}
                            >
                              <svg
                                fill={`${activeBtn === "fan" ? "#4472C4" : ""}`}
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <svg
                                  fill={`${
                                    selectedDevice.mode === "fan"
                                      ? "#4472C4"
                                      : ""
                                  }`}
                                  className="w-6 h-6"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g
                                    id="SVGRepo_bgCarrier"
                                    stroke-width="0"
                                  ></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M12 3.48154C7.29535 3.48154 3.48148 7.29541 3.48148 12.0001C3.48148 16.7047 7.29535 20.5186 12 20.5186C16.7046 20.5186 20.5185 16.7047 20.5185 12.0001C20.5185 7.29541 16.7046 3.48154 12 3.48154ZM2 12.0001C2 6.47721 6.47715 2.00006 12 2.00006C17.5228 2.00006 22 6.47721 22 12.0001C22 17.5229 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.5229 2 12.0001Z"
                                    ></path>{" "}
                                    <path d="M12 11.3C11.8616 11.3 11.7262 11.3411 11.6111 11.418C11.496 11.4949 11.4063 11.6042 11.3533 11.7321C11.3003 11.86 11.2864 12.0008 11.3134 12.1366C11.3405 12.2724 11.4071 12.3971 11.505 12.495C11.6029 12.5929 11.7277 12.6596 11.8634 12.6866C11.9992 12.7136 12.14 12.6997 12.2679 12.6467C12.3958 12.5937 12.5051 12.504 12.582 12.3889C12.6589 12.2738 12.7 12.1385 12.7 12C12.7 11.8144 12.6262 11.6363 12.495 11.505C12.3637 11.3738 12.1857 11.3 12 11.3ZM12.35 5.00002C15.5 5.00002 15.57 7.49902 13.911 8.32502C13.6028 8.50778 13.3403 8.75856 13.1438 9.05822C12.9473 9.35787 12.8218 9.69847 12.777 10.054C13.1117 10.1929 13.4073 10.4116 13.638 10.691C16.2 9.29102 19 9.84401 19 12.35C19 15.5 16.494 15.57 15.675 13.911C15.4869 13.6029 15.232 13.341 14.9291 13.1448C14.6262 12.9485 14.283 12.8228 13.925 12.777C13.7844 13.1108 13.566 13.406 13.288 13.638C14.688 16.221 14.128 19 11.622 19C8.5 19 8.423 16.494 10.082 15.668C10.3852 15.4828 10.644 15.2332 10.84 14.9368C11.036 14.6404 11.1644 14.3046 11.216 13.953C10.8729 13.8188 10.5711 13.5967 10.341 13.309C7.758 14.695 5 14.149 5 11.65C5 8.50002 7.478 8.42302 8.304 10.082C8.48945 10.3888 8.74199 10.6496 9.04265 10.8448C9.34332 11.0399 9.68431 11.1645 10.04 11.209C10.1748 10.8721 10.3971 10.5772 10.684 10.355C9.291 7.80001 9.844 5.00002 12.336 5.00002H12.35Z"></path>{" "}
                                  </g>
                                </svg>
                              </svg>
                            </button>

                            <button
                              onClick={() => {
                                setActiveBtn("cool"); // ไฮไลต์ปุ่มหิมะ
                                setSelectedDevice((prev) =>
                                  prev ? { ...prev, mode: "cool" } : prev
                                ); // ยังสลับเป็น fan ตามที่ตั้งใจ
                              }}
                              className={`bg-base-300 p-2 rounded-r-lg flex justify-center w-[50px] items-center hover:bg-gray-400
    ${
      selectedDevice.mode === "cool"
        ? "border-[2px] border-[#4472C4] bg-[#b2ccfa]"
        : ""
    }`}
                            >
                              <svg
                                viewBox="0 0 45 45"
                                className="w-6 h-6"
                                fill={`${
                                  activeBtn === "cool" ? "#4472C4" : ""
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <svg
                                  viewBox="0 0 45 45"
                                  className="w-6 h-6"
                                  fill={`${
                                    selectedDevice.mode === "cool"
                                      ? "#4472C4"
                                      : ""
                                  }`}
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g
                                    id="SVGRepo_bgCarrier"
                                    stroke-width="0"
                                  ></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                      d="M23.0261 7.548V11.578L27.0521 9.253L28.0521 10.986L23.0261 13.887V20.815L29.0261 17.351V11.548H31.0261V16.196L34.5171 14.182L35.5171 15.914L32.0261 17.929L36.0521 20.253L35.0521 21.986L30.0261 19.083L24.0261 22.547L30.0271 26.012L35.0521 23.11L36.0521 24.842L32.0261 27.166L35.5171 29.182L34.5171 30.914L31.0261 28.899V33.548H29.0261V27.744L23.0261 24.279V31.208L28.0521 34.11L27.0521 35.842L23.0261 33.517V37.548H21.0261V33.517L17.0001 35.842L16.0001 34.11L21.0261 31.208V24.279L15.0261 27.743V33.548H13.0261V28.898L9.53606 30.914L8.53606 29.182L12.0251 27.166L8.00006 24.842L9.00006 23.11L14.0251 26.011L20.0251 22.547L14.0261 19.083L9.00006 21.986L8.00006 20.253L12.0261 17.929L8.53606 15.914L9.53606 14.182L13.0261 16.196V11.548H15.0261V17.351L21.0261 20.815V13.887L16.0001 10.986L17.0001 9.253L21.0261 11.578V7.548H23.0261Z"
                                      fill={`${
                                        selectedDevice.mode === "cool"
                                          ? "#4472C4"
                                          : ""
                                      }`}
                                    ></path>{" "}
                                  </g>
                                </svg>
                              </svg>
                            </button>
                          </div>
                          <button
                            onClick={openScheduleModal}
                            className="bg-base-300 p-2 rounded-md flex justify-center items-center hover:bg-gray-400"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-8 h-8"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => togglePower(selectedDevice.id)}
                            className={`${
                              isOn(selectedDevice.id)
                                ? "bg-[#166B19E3]"
                                : "bg-gray-400"
                            } p-2 rounded-md flex justify-center items-center hover:bg-green-900`}
                          >
                            <img
                              src="../icon/switch1.svg"
                              alt=""
                              className="w-8 h-8"
                            />
                          </button>

                          <button
                            onClick={openScheduleModal}
                            className="bg-base-300 p-2 rounded-md flex justify-center items-center hover:bg-gray-400"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-8 h-8"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          </button>

                          <button
                            className="bg-base-300 p-2 rounded-md flex justify-center items-center hover:bg-gray-400"
                            onClick={handleIncreaseSpeed}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                              />
                            </svg>
                          </button>

                          <input
                            type="text"
                            value={selectedDevice.speed}
                            readOnly
                            className="bg-base-300 p-2 shadow-inner-md text-xl font-bold text-center rounded-md w-20 flex justify-center items-center"
                          />

                          <button
                            className="bg-base-300 p-2 rounded-md flex justify-center items-center hover:bg-gray-400"
                            onClick={handleDecreaseSpeed}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h14"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                    {selectedDeviceCheck === "Airconditioner" ? (
                      <div className="grid pl-3 gap-3">
                        {selectedDevice.mode === "cool" ? (
                          <>
                            <div className="w-full grid gap-2">
                              <div className="flex gap-2 items-center">
                                <img
                                  src="../icon/computer-fan-svgrepo-com.svg"
                                  className="w-4 h-4"
                                  alt=""
                                />
                                <p>Temperature</p>
                                <div className="ml-auto flex items-center gap-2">
                                  <button
                                    onClick={decTemp}
                                    className="bg-base-300 px-3 py-1 rounded-md hover:bg-gray-400"
                                  >
                                    −
                                  </button>

                                  <div className="bg-base-200 px-3 py-1 rounded-md text-lg font-semibold min-w-[3.5rem] text-center">
                                    {clamp(
                                      parseInt(
                                        selectedDevice.speed ?? TEMP_MIN
                                      ),
                                      TEMP_MIN,
                                      TEMP_MAX
                                    )}
                                    °c
                                  </div>

                                  <button
                                    onClick={incTemp}
                                    className="bg-base-300 px-3 py-1 rounded-md hover:bg-gray-400"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              {/* แท่งแสดงผลช่วง 18–30 → map เป็น 0–100% */}
                              {/* <div className="w-full h-[10px] bg-gray-300 rounded-sm">
                                <div
                                  className="h-full bg-[#0090CD] rounded-sm"
                                  style={{ width: `${tempPercent}%` }}
                                />
                              </div>

                              <div className="flex justify-between text-[#4472C4] text-sm">
                                <p>{TEMP_MIN}°c</p>
                                <p>{TEMP_MIN + 3}°c</p>
                                <p>{TEMP_MIN + 6}°c</p>
                                <p>{TEMP_MIN + 9}°c</p>
                                <p>{TEMP_MAX}°c</p>
                              </div> */}
                            </div>
                          </>
                        ) : (
                          <div className="w-full grid gap-2 mb-3"></div>
                        )}
                        <div className="bg-gradient-to-b shadow-inner from-[#1E3F6C] via-[#3A7BD2] to-[#3268B2] text-white p-2 rounded-lg font-DS-Digital">
                          <div className="flex justify-between">
                            <div className="flex gap-2">
                              <svg
                                fill={`${
                                  selectedDevice.mode === "fan"
                                    ? "white"
                                    : "#717D96"
                                }`}
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12 3.48154C7.29535 3.48154 3.48148 7.29541 3.48148 12.0001C3.48148 16.7047 7.29535 20.5186 12 20.5186C16.7046 20.5186 20.5185 16.7047 20.5185 12.0001C20.5185 7.29541 16.7046 3.48154 12 3.48154ZM2 12.0001C2 6.47721 6.47715 2.00006 12 2.00006C17.5228 2.00006 22 6.47721 22 12.0001C22 17.5229 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.5229 2 12.0001Z"
                                  ></path>{" "}
                                  <path d="M12 11.3C11.8616 11.3 11.7262 11.3411 11.6111 11.418C11.496 11.4949 11.4063 11.6042 11.3533 11.7321C11.3003 11.86 11.2864 12.0008 11.3134 12.1366C11.3405 12.2724 11.4071 12.3971 11.505 12.495C11.6029 12.5929 11.7277 12.6596 11.8634 12.6866C11.9992 12.7136 12.14 12.6997 12.2679 12.6467C12.3958 12.5937 12.5051 12.504 12.582 12.3889C12.6589 12.2738 12.7 12.1385 12.7 12C12.7 11.8144 12.6262 11.6363 12.495 11.505C12.3637 11.3738 12.1857 11.3 12 11.3ZM12.35 5.00002C15.5 5.00002 15.57 7.49902 13.911 8.32502C13.6028 8.50778 13.3403 8.75856 13.1438 9.05822C12.9473 9.35787 12.8218 9.69847 12.777 10.054C13.1117 10.1929 13.4073 10.4116 13.638 10.691C16.2 9.29102 19 9.84401 19 12.35C19 15.5 16.494 15.57 15.675 13.911C15.4869 13.6029 15.232 13.341 14.9291 13.1448C14.6262 12.9485 14.283 12.8228 13.925 12.777C13.7844 13.1108 13.566 13.406 13.288 13.638C14.688 16.221 14.128 19 11.622 19C8.5 19 8.423 16.494 10.082 15.668C10.3852 15.4828 10.644 15.2332 10.84 14.9368C11.036 14.6404 11.1644 14.3046 11.216 13.953C10.8729 13.8188 10.5711 13.5967 10.341 13.309C7.758 14.695 5 14.149 5 11.65C5 8.50002 7.478 8.42302 8.304 10.082C8.48945 10.3888 8.74199 10.6496 9.04265 10.8448C9.34332 11.0399 9.68431 11.1645 10.04 11.209C10.1748 10.8721 10.3971 10.5772 10.684 10.355C9.291 7.80001 9.844 5.00002 12.336 5.00002H12.35Z"></path>{" "}
                                </g>
                              </svg>
                              <svg
                                viewBox="0 0 45 45"
                                className="w-[1.6rem] h-[1.6rem]"
                                fill={`${
                                  selectedDevice.mode === "cool"
                                    ? "white"
                                    : "#717D96"
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <path
                                    d="M23.0261 7.548V11.578L27.0521 9.253L28.0521 10.986L23.0261 13.887V20.815L29.0261 17.351V11.548H31.0261V16.196L34.5171 14.182L35.5171 15.914L32.0261 17.929L36.0521 20.253L35.0521 21.986L30.0261 19.083L24.0261 22.547L30.0271 26.012L35.0521 23.11L36.0521 24.842L32.0261 27.166L35.5171 29.182L34.5171 30.914L31.0261 28.899V33.548H29.0261V27.744L23.0261 24.279V31.208L28.0521 34.11L27.0521 35.842L23.0261 33.517V37.548H21.0261V33.517L17.0001 35.842L16.0001 34.11L21.0261 31.208V24.279L15.0261 27.743V33.548H13.0261V28.898L9.53606 30.914L8.53606 29.182L12.0251 27.166L8.00006 24.842L9.00006 23.11L14.0251 26.011L20.0251 22.547L14.0261 19.083L9.00006 21.986L8.00006 20.253L12.0261 17.929L8.53606 15.914L9.53606 14.182L13.0261 16.196V11.548H15.0261V17.351L21.0261 20.815V13.887L16.0001 10.986L17.0001 9.253L21.0261 11.578V7.548H23.0261Z"
                                    fill={`${
                                      selectedDevice.mode === "cool"
                                        ? "white"
                                        : "#717D96"
                                    }`}
                                  ></path>{" "}
                                </g>
                              </svg>
                            </div>
                            <p className="tracking-widest">Daily 00/00/0000 </p>
                          </div>

                          <div className="my-3 py-4 border-y text-6xl text-center border-white">
                            <p>{selectedDevice.speed}°c</p>
                          </div>

                          <div className="flex justify-between text-sm mt-2">
                            <div className="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                              <p className="tracking-widest">05:35:12</p>
                            </div>
                            <div className="flex gap-6">
                              <p className="tracking-widest">Open 08:00</p>
                              <p className="tracking-widest">Close 18:00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid pl-3 gap-3">
                        <div className="w-full grid gap-2">
                          <div className="flex gap-1 items-center">
                            <img
                              src="../icon/computer-fan-svgrepo-com.svg"
                              className="w-4 h-4"
                              alt=""
                            />{" "}
                            <p>Fan Speed : {selectedDevice.speed} speed</p>
                          </div>
                          <div className="w-full h-[10px] bg-gray-300  rounded-sm">
                            <div
                              className="h-full bg-[#0090CD]"
                              style={{ width: `${selectedDevice.speed}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-[#4472C4]">
                            <p>0%</p>
                            <p>25%</p>
                            <p>50%</p>
                            <p>75%</p>
                            <p>100%</p>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <div className="flex gap-1 items-center">
                            <img
                              src="../icon/pressure-alt-svgrepo-com.svg"
                              className="w-4 h-4"
                              alt=""
                            />{" "}
                            <p>
                              Pressure drop : {selectedDevice.pressureDrop} %
                            </p>
                          </div>
                          <div className="w-auto h-[10px] bg-gray-300 rounded-sm">
                            <div
                              className="h-full bg-[#515191] "
                              style={{
                                width: `${selectedDevice.pressureDrop / 5}%`,
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between  my-2">
                            <div className="bg-[#89D13F] h-[10px] w-full rounded-l-sm"></div>
                            <div className="bg-[#BAD64E] h-[10px] w-full"></div>
                            <div className="bg-[#FFC85E] h-[10px] w-full"></div>
                            <div className="bg-[#F89749] h-[10px] w-full"></div>
                            <div className="bg-[#D53B3B] h-[10px] w-full rounded-r-sm"></div>
                          </div>
                          <div className="flex justify-between text-[#4472C4]">
                            <p>0%</p>
                            <p>100%</p>
                            <p>200%</p>
                            <p>300%</p>
                            <p>400%</p>
                            <p>500%</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p>No device selected</p>
                )}
              </div>

              <div className="w-full h-full p-2 bg-base-100 flex justify-center relative border">
                <div className="p-2">
                  <img src={bgimage()} alt="" className="w-[70%] m-auto" />
                </div>
                {filteredDevices.map((device) => {
                  return (
                    <div
                      key={device.id}
                      className={`absolute`}
                      style={{
                        top: device.position.top,
                        left: device.position.left,
                      }}
                    >
                      <div
                        className={`px-1 ${
                          selectedDevice.id === device.id ||
                          selectedDevice.id === 0
                            ? "bg-green-600 rounded-md "
                            : ""
                        } `}
                      >
                        <img
                          src={device.img}
                          alt={device.name}
                          className={`w-16 h-16 `}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-base-100 p-2">
              <div className="flex w-full">
                <div className="flex w-full">
                  <div className="w-full">
                    <div className="flex justify-between w-full">
                      <select
                        value={selectedOption}
                        onChange={handleSelectChange}
                        className="border p-1 rounded-md"
                      >
                        <option value="electricity">
                          Accumulated Electricity Bill
                        </option>
                        <option value="pressure">Pressure Drop Values</option>
                      </select>
                      {selectedOption === "electricity" ? (
                        <p className="ml-auto">
                          Accumulated Electricity Bill 45.98 (฿)
                        </p>
                      ) : (
                        <p className="ml-auto flex gap-1">
                          Pressure Drop Values{" "}
                          <p className="text-[#8979FF]">
                            {selectedDevice.pressureDrop}
                          </p>{" "}
                          %
                        </p>
                      )}
                    </div>

                    <div className="py-3 overflow-x-auto">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey={
                              selectedOption === "electricity" ? "cost" : "drop"
                            }
                            stroke={`${
                              selectedOption === "electricity"
                                ? "#FF8C00"
                                : "#8979FF"
                            }`}
                            fillOpacity={0.1}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                {selectedDeviceCheck !== "Airconditioner" && (
                  <div className="flex w-1/5 mx-10">
                    {selectedDevice ? (
                      <div className="flex flex-col justify-center w-full relative">
                        <div className="flex justify-center items-center relative">
                          <ReactSpeedometer
                            value={selectedDevice.pressureDrop}
                            minValue={0}
                            maxValue={500}
                            segments={5}
                            segmentColors={[
                              "#89D13F",
                              "#BAD64E",
                              "#FFC85E",
                              "#F89749",
                              "#D53B3B",
                            ]}
                            className="my-auto"
                          />
                          <p className="absolute top-[9.85rem] right-[5.4rem] text-sm font-semibold">
                            PSI
                          </p>
                        </div>
                        <div className="grid grid-cols-2 justify-center text-center gap-1 absolute bottom-10">
                          <div className="flex gap-1 items-center">
                            <div className="rounded-full w-2 h-2 bg-[#89D13F]"></div>
                            <p>good</p>
                          </div>
                          <div className="flex gap-1 items-center">
                            <div className="rounded-full w-2 h-2 bg-[#BAD64E]"></div>
                            <p>medium</p>
                          </div>
                          <div className="flex gap-1 items-center">
                            <div className="rounded-full w-2 h-2 bg-[#FFC85E]"></div>
                            <p>Not good</p>
                          </div>
                          <div className="flex gap-1 items-center">
                            <div className="rounded-full w-2 h-2 bg-[#F89749]"></div>
                            <p>extremely bad</p>
                          </div>
                          <div className="flex gap-1 items-center">
                            <div className="rounded-full w-2 h-2 bg-[#D53B3B]"></div>
                            <p>dangerous</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p>No device selected</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {isScheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => {
              setIsScheduleOpen(false);
              setSelectedDays(null);
            }}
          />

          {/* modal */}
          <div className="relative z-10 w-full max-w-md rounded-xl bg-base-100 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Set Schedule</h3>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setIsScheduleOpen(false);
                  setSelectedDays(null);
                }}
              >
                ✕
              </button>
            </div>

            {/* เวลาเปิด-ปิด */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-sm font-medium">Start</label>
                <input
                  type="time"
                  value={timeStart}
                  onChange={(e) => setTimeStart(e.target.value)}
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium">End</label>
                <input
                  type="time"
                  value={timeEnd}
                  onChange={(e) => setTimeEnd(e.target.value)}
                  className="mt-1 w-full border rounded-md p-2"
                />
              </div>
            </div>

            {/* ปุ่มวัน */}
            <div className="flex gap-2 justify-center my-2 flex-wrap">
              {DAYS.map((d) => {
                const active = selectedDays.includes(d);
                return (
                  <button
                    key={d}
                    onClick={() => toggleDay(d)}
                    className={`p-2 rounded-md transition
                ${
                  active
                    ? "bg-[#4472C4] text-white"
                    : "bg-gray-300 hover:bg-gray-500"
                }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>

            {/* Action */}
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                onClick={() => {
                  setIsScheduleOpen(false);
                  setSelectedDays(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-3 py-2 rounded-md bg-[#4472C4] text-white hover:brightness-95"
                onClick={saveSchedule}
              >
                Save
              </button>
            </div>

            {/* แสดง preview ค่าที่ตั้งไว้ (ออปชัน) */}
            {selectedDevice && schedules[selectedDevice.id] && (
              <p className="mt-3 text-xs text-gray-500">
                Current for{" "}
                <span className="font-medium">
                  {selectedDevice.name || `Device #${selectedDevice.id}`}
                </span>
                : {schedules[selectedDevice.id].timeStart} -{" "}
                {schedules[selectedDevice.id].timeEnd} /{" "}
                {schedules[selectedDevice.id].days.join(", ") || "—"}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Leads;
