import React, { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ReactSpeedometer from "react-d3-speedometer";
import Select from 'react-select';


const devices = {
    Airconditioner: [
        { id: 1, img: '../image/airMock.png', name: 'Daikin CX01', speed: '25', pressureDrop: '125', status: 'active', mode: 'fan', battery: '78%', position: { top: '26%', left: '45%' } },
        { id: 2, img: '../image/airMock.png', name: 'Daikin CX02', speed: '25', pressureDrop: '186', status: 'active', mode: 'fan', battery: '78%', position: { top: '13%', left: '40%' } },
        { id: 3, img: '../image/airMock.png', name: 'Daikin CX03', speed: '25', pressureDrop: '155', status: 'active', mode: 'cool', battery: '78%', position: { top: '42%', left: '45%' } },
        { id: 4, img: '../image/airMock.png', name: 'Daikin CX04', speed: '25', pressureDrop: '450', status: 'active', mode: 'cool', battery: '78%', position: { top: '13%', left: '76%' } },
    ],
    fanfilter: [
        { id: 1, img: '../image/FFU.png', name: 'Fan Filter Unit 01', speed: '50', pressureDrop: '125', status: 'active', position: { top: '28%', left: '23%' } },
        { id: 2, img: '../image/FFU.png', name: 'Fan Filter Unit 02', speed: '50', pressureDrop: '186', status: 'active', position: { top: '10%', left: '40%' } },
        { id: 3, img: '../image/FFU.png', name: 'Fan Filter Unit 03', speed: '50', pressureDrop: '155', status: 'active', position: { top: '50%', left: '16%' } },
        { id: 4, img: '../image/FFU.png', name: 'Fan Filter Unit 04', speed: '50', pressureDrop: '450', status: 'active', position: { top: '75%', left: '10%' } },
    ]
}

const devices2 = {
    Airconditioner: [
        { id: 1, img: '../image/airMock.png', name: 'Daikin CX01', speed: '25', pressureDrop: '125', status: 'active', mode: 'fan', battery: '78%', position: { top: '20%', left: '44%' } },
        { id: 2, img: '../image/airMock.png', name: 'Daikin CX02', speed: '25', pressureDrop: '186', status: 'active', mode: 'fan', battery: '78%', position: { top: '3%', left: '39%' } },
        { id: 3, img: '../image/airMock.png', name: 'Daikin CX03', speed: '25', pressureDrop: '155', status: 'active', mode: 'cool', battery: '78%', position: { top: '38%', left: '44%' } },
        { id: 4, img: '../image/airMock.png', name: 'Daikin CX04', speed: '25', pressureDrop: '135', status: 'active', mode: 'cool', battery: '78%', position: { top: '3%', left: '74%' } },
    ],
    fanfilter: [
        { id: 1, img: '../image/FFU.png', name: 'Fan Filter Unit 01', speed: '50', pressureDrop: '125', status: 'active', position: { top: '20%', left: '20%' } },
        { id: 2, img: '../image/FFU.png', name: 'Fan Filter Unit 02', speed: '50', pressureDrop: '186', status: 'active', position: { top: '0%', left: '39%' } },
        { id: 3, img: '../image/FFU.png', name: 'Fan Filter Unit 03', speed: '50', pressureDrop: '155', status: 'active', position: { top: '45%', left: '14%' } },
        { id: 4, img: '../image/FFU.png', name: 'Fan Filter Unit 04', speed: '50', pressureDrop: '135', status: 'active', position: { top: '75%', left: '7%' } },
    ]
}

const devicesGroup = {
    Airconditioner: [
        { id: 0, img: '../image/airMock.png', name: 'Daikin CX01', speed: '25', pressureDrop: '125', status: 'active', mode: 'fan', battery: '78%', position: { top: '20%', left: '44%' } },
    ],
    fanfilter: [
        { id: 0, img: '../image/FFU.png', name: 'Fan Filter Unit 01', speed: '50', pressureDrop: '125', status: 'active', position: { top: '20%', left: '20%' } },
    ]
}

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
    { time: "17:00", cost: 16 }
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
    { time: "17:00", drop: 200 }
];


function Leads() {
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [selectedOption, setSelectedOption] = useState("electricity");
    const [expandedMenuId, setExpandedMenuId] = useState(false);
    const [selectedDeviceCheck, setSelectedDeviceCheck] = useState('Airconditioner');
    const [selectedMode, setSelectedMode] = useState('single');
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const data = selectedOption === "electricity" ? accumulatedCostData : pressureDropData;

    const handleDeviceClick = (device) => {
        setSelectedDevice(device.id !== selectedDevice?.id ? device : null);
    }

    console.log(selectedDevice)

    const toggleSubMenu = () => {
        setExpandedMenuId(!expandedMenuId)
    };

    const handleDeviceSelection = (deviceName) => {
        setSelectedDeviceCheck(deviceName === selectedDevice ? null : deviceName);
        setExpandedMenuId(false)
        setSelectedDevice(null)
    };

    const handleModeSelection = (mode) => {
        setSelectedMode(mode);
        setExpandedMenuId(false)
        setSelectedDevice(null)
    };

    const handleIncreaseSpeed = () => {
        if (selectedDevice) {
            setSelectedDevice((prevDevice) => ({
                ...prevDevice,
                speed: Math.min(parseInt(prevDevice.speed) + 10, 100), // Ensure the speed doesn't exceed 100
            }));
        }
    }

    const handleDecreaseSpeed = () => {
        if (selectedDevice) {
            setSelectedDevice((prevDevice) => ({
                ...prevDevice,
                speed: Math.max(parseInt(prevDevice.speed) - 10, 0), // Ensure the speed doesn't go below 0
            }));
        }
    }

    const deviceOptions = (devices[selectedDeviceCheck] || []).map((device) => (
        <div key={device.id} className="flex items-center justify-start gap-5 p-2 w-full cursor-pointer border">
            <div className="flex gap-1 w-1/2">
                <img src={device.img} alt={device.name} className="w-8 h-8 rounded-md" />
                <span>{device.name}</span>
            </div>

            {selectedDeviceCheck === 'Airconditioner' &&
                <div className="flex justify-start gap-1 gap-y-2 items-center">
                    <div className="flex gap-1">
                        <svg fill="#000000" className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.48154C7.29535 3.48154 3.48148 7.29541 3.48148 12.0001C3.48148 16.7047 7.29535 20.5186 12 20.5186C16.7046 20.5186 20.5185 16.7047 20.5185 12.0001C20.5185 7.29541 16.7046 3.48154 12 3.48154ZM2 12.0001C2 6.47721 6.47715 2.00006 12 2.00006C17.5228 2.00006 22 6.47721 22 12.0001C22 17.5229 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.5229 2 12.0001Z"></path> <path d="M12 11.3C11.8616 11.3 11.7262 11.3411 11.6111 11.418C11.496 11.4949 11.4063 11.6042 11.3533 11.7321C11.3003 11.86 11.2864 12.0008 11.3134 12.1366C11.3405 12.2724 11.4071 12.3971 11.505 12.495C11.6029 12.5929 11.7277 12.6596 11.8634 12.6866C11.9992 12.7136 12.14 12.6997 12.2679 12.6467C12.3958 12.5937 12.5051 12.504 12.582 12.3889C12.6589 12.2738 12.7 12.1385 12.7 12C12.7 11.8144 12.6262 11.6363 12.495 11.505C12.3637 11.3738 12.1857 11.3 12 11.3ZM12.35 5.00002C15.5 5.00002 15.57 7.49902 13.911 8.32502C13.6028 8.50778 13.3403 8.75856 13.1438 9.05822C12.9473 9.35787 12.8218 9.69847 12.777 10.054C13.1117 10.1929 13.4073 10.4116 13.638 10.691C16.2 9.29102 19 9.84401 19 12.35C19 15.5 16.494 15.57 15.675 13.911C15.4869 13.6029 15.232 13.341 14.9291 13.1448C14.6262 12.9485 14.283 12.8228 13.925 12.777C13.7844 13.1108 13.566 13.406 13.288 13.638C14.688 16.221 14.128 19 11.622 19C8.5 19 8.423 16.494 10.082 15.668C10.3852 15.4828 10.644 15.2332 10.84 14.9368C11.036 14.6404 11.1644 14.3046 11.216 13.953C10.8729 13.8188 10.5711 13.5967 10.341 13.309C7.758 14.695 5 14.149 5 11.65C5 8.50002 7.478 8.42302 8.304 10.082C8.48945 10.3888 8.74199 10.6496 9.04265 10.8448C9.34332 11.0399 9.68431 11.1645 10.04 11.209C10.1748 10.8721 10.3971 10.5772 10.684 10.355C9.291 7.80001 9.844 5.00002 12.336 5.00002H12.35Z"></path> </g></svg>
                        <p>Mode: {device.mode}</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        {device.battery}
                        <svg viewBox="0 0 512 512" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                                <path fill="#000000" d="M201 16c-15 0-20 3.38-20 20v15h-45c-29.547 0-35 5.453-35 35v375c0 29.547 5.453 35 35 35h240c29.547 0 35-5.453 35-35V86c0-29.547-5.453-35-35-35h-45V36c0-16.62-5-20-20-20H201zm-48.094 69.813c4.666.02 10.594.187 18.094.187h170c40 0 35-5 35 35v305c0 40 5 35-35 35H171c-40 0-35 5-35-35V121c0-32.5-3.31-35.283 16.906-35.188zM161 191c-5.54 0-10 4.46-10 10v55c0 5.54 4.46 10 10 10h190c5.54 0 10-4.46 10-10v-55c0-5.54-4.46-10-10-10H161zm0 90c-5.54 0-10 4.46-10 10v55c0 5.54 4.46 10 10 10h190c5.54 0 10-4.46 10-10v-55c0-5.54-4.46-10-10-10H161zm0 90c-5.54 0-10 4.46-10 10v55c0 5.54 4.46 10 10 10h190c5.54 0 10-4.46 10-10v-55c0-5.54-4.46-10-10-10H161z"></path>
                            </g>
                        </svg>
                    </div>
                </div>
            }

        </div>
    ));

    return (
        <div className="flex h-full">
            <div className="bg-base-100 shadow-xl border-r p-2 w-[50%] h-auto">
                <div className="grid gap-2">
                    <div className="relative">
                        <div className="flex justify-center items-center border-b pb-2">
                            <button
                                className={`mt-2 flex gap-1 px-1 w-full py-2 text-left hover:bg-gray-100 ${expandedMenuId ? 'bg-gray-100' : ''}`}
                                onClick={() => toggleSubMenu(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                Sensors Activity
                            </button>
                        </div>
                        {expandedMenuId && (
                            <div className="absolute z-10 bg-white border shadow-md top-[3rem] left-[0rem] rounded-md w-full">
                                <div className="p-2 border bg-[#F4F4F4]">
                                    <p className="text-lg text-[#1D24A1] font-semibold">Device options menu</p>
                                    <ul>
                                        <li
                                            className={`p-1 hover:bg-gray-100 cursor-pointer ${selectedDeviceCheck === 'Airconditioner' ? 'bg-blue-100' : ''}`}
                                            onClick={() => handleDeviceSelection('Airconditioner')}
                                        >
                                            <label htmlFor="" className="flex gap-1">
                                                <input type="checkbox" checked={selectedDeviceCheck === 'Airconditioner'} onChange={() => { }} /> Air conditioner
                                            </label>
                                        </li>
                                        <li
                                            className={`p-1 hover:bg-gray-100 cursor-pointer ${selectedDeviceCheck === 'fanfilter' ? 'bg-blue-100' : ''}`}
                                            onClick={() => handleDeviceSelection('fanfilter')}
                                        >
                                            <label htmlFor="" className="flex gap-1">
                                                <input type="checkbox" checked={selectedDeviceCheck === 'fanfilter'} onChange={() => { }} /> Fan Filter Unit
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <div className="p-2 border bg-[#F4F4F4]">
                                    <ul>
                                        {/* <li
                                            className={`p-1 hover:bg-gray-100 cursor-pointer ${selectedMode === 'all' ? 'bg-blue-100' : ''}`}
                                            onClick={() => handleModeSelection('all')}
                                        >
                                            <label htmlFor="" className="flex gap-1">
                                                <input type="checkbox" checked={selectedMode === 'all'} onChange={() => { }} /> All
                                            </label>
                                        </li> */}
                                        <li
                                            className={`p-1 hover:bg-gray-100 cursor-pointer ${selectedMode === 'single' ? 'bg-blue-100' : ''}`}
                                            onClick={() => handleModeSelection('single')}
                                        >
                                            <label htmlFor="" className="flex gap-1">
                                                <input type="checkbox" checked={selectedMode === 'single'} onChange={() => { }} /> Single Device
                                            </label>
                                        </li>
                                        <li
                                            className={`p-1 hover:bg-gray-100 cursor-pointer ${selectedMode === 'group' ? 'bg-blue-100' : ''}`}
                                            onClick={() => handleModeSelection('group')}
                                        >
                                            <label htmlFor="" className="flex gap-1">
                                                <input type="checkbox" checked={selectedMode === 'group'} onChange={() => { }} /> Group Device
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* <div className="divider mt-0"></div> */}
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">{selectedDeviceCheck === 'Airconditioner' ? 'Air Conditioner ' : 'Fan Filter Unit'}</p>
                        <p>( {devices[selectedDeviceCheck]?.length} )</p>
                    </div>
                    <div className="flex gap-3">
                        <p className='py-1 px-2 text-white bg-[#166B19] rounded-md font-semibold'>Online {devices[selectedDeviceCheck]?.length}</p>
                        <p className='py-1 px-2 text-white bg-[#3C3C4399] rounded-md font-semibold'>Offline {devices[selectedDeviceCheck]?.length}</p>
                    </div>
                    {selectedMode === 'group' ?
                        <div className="w-full">
                            <div className="flex">
                                {(devicesGroup[selectedDeviceCheck] || []).map((device) => {
                                    const speedPercentage = (device.speed / 100) * 100;
                                    const pressureDropPercentage = (device.pressureDrop / 500) * 100;
                                    return (
                                        <div key={device.id} className="flex justify-between w-full gap-1 hover:bg-gray-100 cursor-pointer" onClick={() => handleDeviceClick(device)}>
                                            <div className="grid w-full grid-cols-2 border-collapse border border-gray-300 justify-center">
                                                {(devices[selectedDeviceCheck] || []).slice(0, 4).map((device) => (
                                                    <div key={device.id} className="border p-2">
                                                        <img src={device.img} alt={device.name} className="w-8 h-8 mx-auto" />
                                                    </div>
                                                ))}
                                            </div>
                                            {selectedDeviceCheck === 'Airconditioner' ?
                                                <div className="flex flex-col gap-1 w-full gap-y-2 items-start">
                                                    <p>Group 1</p>
                                                    <p>{devices[selectedDeviceCheck].length} Device Connected</p>
                                                    <div className="flex gap-1">
                                                        <svg fill="#000000" className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.48154C7.29535 3.48154 3.48148 7.29541 3.48148 12.0001C3.48148 16.7047 7.29535 20.5186 12 20.5186C16.7046 20.5186 20.5185 16.7047 20.5185 12.0001C20.5185 7.29541 16.7046 3.48154 12 3.48154ZM2 12.0001C2 6.47721 6.47715 2.00006 12 2.00006C17.5228 2.00006 22 6.47721 22 12.0001C22 17.5229 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.5229 2 12.0001Z"></path> <path d="M12 11.3C11.8616 11.3 11.7262 11.3411 11.6111 11.418C11.496 11.4949 11.4063 11.6042 11.3533 11.7321C11.3003 11.86 11.2864 12.0008 11.3134 12.1366C11.3405 12.2724 11.4071 12.3971 11.505 12.495C11.6029 12.5929 11.7277 12.6596 11.8634 12.6866C11.9992 12.7136 12.14 12.6997 12.2679 12.6467C12.3958 12.5937 12.5051 12.504 12.582 12.3889C12.6589 12.2738 12.7 12.1385 12.7 12C12.7 11.8144 12.6262 11.6363 12.495 11.505C12.3637 11.3738 12.1857 11.3 12 11.3ZM12.35 5.00002C15.5 5.00002 15.57 7.49902 13.911 8.32502C13.6028 8.50778 13.3403 8.75856 13.1438 9.05822C12.9473 9.35787 12.8218 9.69847 12.777 10.054C13.1117 10.1929 13.4073 10.4116 13.638 10.691C16.2 9.29102 19 9.84401 19 12.35C19 15.5 16.494 15.57 15.675 13.911C15.4869 13.6029 15.232 13.341 14.9291 13.1448C14.6262 12.9485 14.283 12.8228 13.925 12.777C13.7844 13.1108 13.566 13.406 13.288 13.638C14.688 16.221 14.128 19 11.622 19C8.5 19 8.423 16.494 10.082 15.668C10.3852 15.4828 10.644 15.2332 10.84 14.9368C11.036 14.6404 11.1644 14.3046 11.216 13.953C10.8729 13.8188 10.5711 13.5967 10.341 13.309C7.758 14.695 5 14.149 5 11.65C5 8.50002 7.478 8.42302 8.304 10.082C8.48945 10.3888 8.74199 10.6496 9.04265 10.8448C9.34332 11.0399 9.68431 11.1645 10.04 11.209C10.1748 10.8721 10.3971 10.5772 10.684 10.355C9.291 7.80001 9.844 5.00002 12.336 5.00002H12.35Z"></path> </g></svg>
                                                        <p>Mode: {device.mode}</p>
                                                    </div>
                                                </div>
                                                :
                                                <div className="grid gap-1 gap-y-2 w-full items-start">
                                                    <p className="text-sm flex gap-1"><img src="../icon/computer-fan-svgrepo-com.svg" className="w-5 h-5" alt="" />{device.speed} <span className="text-sm">speed</span></p>
                                                    <div className="w-full h-2 bg-gray-300 rounded-full">
                                                        <div className="h-full bg-[#0090CD] rounded-full" style={{ width: `${speedPercentage}%` }}></div>
                                                    </div>

                                                    <p className="text-sm flex gap-1"><img src="../icon/pressure-alt-svgrepo-com.svg" className="w-5 h-5" alt="" />{device.pressureDrop}%</p>
                                                    <div className="w-full h-2 bg-gray-300 rounded-full">
                                                        <div className="h-full bg-[#515191] rounded-full" style={{ width: `${pressureDropPercentage}%` }}></div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        :
                        <div className="">
                            {(devices[selectedDeviceCheck] || []).map((device) => {
                                const speedPercentage = (device.speed / 100) * 100;
                                const pressureDropPercentage = (device.pressureDrop / 500) * 100;
                                return (
                                    <div key={device.id} className='my-1' onClick={() => handleDeviceClick(device)}>
                                        <div className={`flex gap-2 items-center w-full hover:bg-gray-100 cursor-pointer ${selectedDevice?.id === device?.id ? 'bg-[#EBEEFD]' : ''}`}>
                                            <img src={device.img} alt="Device" className="w-18 h-18" />
                                            <div className='flex justify-start w-full '>
                                                <div className="flex flex-col gap-1 w-full">
                                                    <div className="flex justify-between w-full mb-1">
                                                        <p className="font-semibold">{device.name}</p>
                                                        {device.status === 'active' ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#166B19" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                            </svg> :
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                            </svg>
                                                        }
                                                    </div>
                                                    {selectedDeviceCheck === 'Airconditioner' ?
                                                        <div className="flex justify-between gap-1 gap-y-2 items-center">
                                                            <div className="flex gap-1">
                                                                <svg fill="#000000" className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.48154C7.29535 3.48154 3.48148 7.29541 3.48148 12.0001C3.48148 16.7047 7.29535 20.5186 12 20.5186C16.7046 20.5186 20.5185 16.7047 20.5185 12.0001C20.5185 7.29541 16.7046 3.48154 12 3.48154ZM2 12.0001C2 6.47721 6.47715 2.00006 12 2.00006C17.5228 2.00006 22 6.47721 22 12.0001C22 17.5229 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.5229 2 12.0001Z"></path> <path d="M12 11.3C11.8616 11.3 11.7262 11.3411 11.6111 11.418C11.496 11.4949 11.4063 11.6042 11.3533 11.7321C11.3003 11.86 11.2864 12.0008 11.3134 12.1366C11.3405 12.2724 11.4071 12.3971 11.505 12.495C11.6029 12.5929 11.7277 12.6596 11.8634 12.6866C11.9992 12.7136 12.14 12.6997 12.2679 12.6467C12.3958 12.5937 12.5051 12.504 12.582 12.3889C12.6589 12.2738 12.7 12.1385 12.7 12C12.7 11.8144 12.6262 11.6363 12.495 11.505C12.3637 11.3738 12.1857 11.3 12 11.3ZM12.35 5.00002C15.5 5.00002 15.57 7.49902 13.911 8.32502C13.6028 8.50778 13.3403 8.75856 13.1438 9.05822C12.9473 9.35787 12.8218 9.69847 12.777 10.054C13.1117 10.1929 13.4073 10.4116 13.638 10.691C16.2 9.29102 19 9.84401 19 12.35C19 15.5 16.494 15.57 15.675 13.911C15.4869 13.6029 15.232 13.341 14.9291 13.1448C14.6262 12.9485 14.283 12.8228 13.925 12.777C13.7844 13.1108 13.566 13.406 13.288 13.638C14.688 16.221 14.128 19 11.622 19C8.5 19 8.423 16.494 10.082 15.668C10.3852 15.4828 10.644 15.2332 10.84 14.9368C11.036 14.6404 11.1644 14.3046 11.216 13.953C10.8729 13.8188 10.5711 13.5967 10.341 13.309C7.758 14.695 5 14.149 5 11.65C5 8.50002 7.478 8.42302 8.304 10.082C8.48945 10.3888 8.74199 10.6496 9.04265 10.8448C9.34332 11.0399 9.68431 11.1645 10.04 11.209C10.1748 10.8721 10.3971 10.5772 10.684 10.355C9.291 7.80001 9.844 5.00002 12.336 5.00002H12.35Z"></path> </g></svg>
                                                                <p>Mode: {device.mode}</p>
                                                            </div>
                                                            <div className="flex gap-1">
                                                                {device.battery}
                                                                <svg viewBox="0 0 512 512" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                                                                        <path fill="#000000" d="M201 16c-15 0-20 3.38-20 20v15h-45c-29.547 0-35 5.453-35 35v375c0 29.547 5.453 35 35 35h240c29.547 0 35-5.453 35-35V86c0-29.547-5.453-35-35-35h-45V36c0-16.62-5-20-20-20H201zm-48.094 69.813c4.666.02 10.594.187 18.094.187h170c40 0 35-5 35 35v305c0 40 5 35-35 35H171c-40 0-35 5-35-35V121c0-32.5-3.31-35.283 16.906-35.188zM161 191c-5.54 0-10 4.46-10 10v55c0 5.54 4.46 10 10 10h190c5.54 0 10-4.46 10-10v-55c0-5.54-4.46-10-10-10H161zm0 90c-5.54 0-10 4.46-10 10v55c0 5.54 4.46 10 10 10h190c5.54 0 10-4.46 10-10v-55c0-5.54-4.46-10-10-10H161zm0 90c-5.54 0-10 4.46-10 10v55c0 5.54 4.46 10 10 10h190c5.54 0 10-4.46 10-10v-55c0-5.54-4.46-10-10-10H161z"></path>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="grid grid-cols-2 gap-1 gap-y-2 items-center">
                                                            <p className="text-sm flex gap-1"><img src="../icon/computer-fan-svgrepo-com.svg" className="w-5 h-5" alt="" />{device.speed} <span className="text-sm">speed</span></p>
                                                            <div className="w-full h-2 bg-gray-300 rounded-full">
                                                                <div className="h-full bg-[#0090CD] rounded-full" style={{ width: `${speedPercentage}%` }}></div>
                                                            </div>

                                                            <p className="text-sm flex gap-1"><img src="../icon/pressure-alt-svgrepo-com.svg" className="w-5 h-5" alt="" />{device.pressureDrop}%</p>
                                                            <div className="w-full h-2 bg-gray-300 rounded-full">
                                                                <div className="h-full bg-[#515191] rounded-full" style={{ width: `${pressureDropPercentage}%` }}></div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }

                </div>
            </div >
            {selectedDevice === null ?
                <div className=" flex justify-center bg-base-100 h-full relative">
                    <img src="../image/2dMock.png" alt="" className="w-[100%] m-auto" />
                    {(devices[selectedDeviceCheck] || []).map((device) => {
                        return (
                            <div key={device.id} className='absolute' style={{ top: device.position.top, left: device.position.left }}>
                                <img src={device.img} alt={device.name} className="w-16 h-16 rounded-md" />
                            </div>
                        )
                    })}
                </div>
                :

                <div className="h-full">
                    <div className="flex justify-start border-b">
                        <div className="bg-base-100 p-2 w-[45%]">
                            <p className="text-xl font-semibold">Device Details</p>
                            {selectedDevice ? (
                                <div className="">
                                    <div className="flex gap-1 justify-between items-center">
                                        <img src={selectedDevice.img} alt="Device" className="w-13 h-13" />
                                        <h3 className="text-xl font-semibold">{selectedDevice.id === 0 ? 'Group 1' : selectedDevice.name}</h3>
                                        <p className='py-1 px-2 text-white bg-[#166B19] rounded-md font-semibold'>Online</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mb-2 text-sm">
                                        <p>Date of Installation </p>
                                        <p>25/07/2568</p>
                                        <p>Lase avtive</p>
                                        <p>25/07/2568 : Time 08:00-18:00</p>
                                    </div>

                                    {selectedDevice.id === 0 &&
                                        <div className="relative">
                                            <button
                                                onClick={toggleMenu}
                                                className={`py-2 px-4  text-white rounded-md w-full hover:bg-blue-500 ${isOpen ? 'bg-[#6791FF]' : 'bg-[#BCBCBC]'}`}
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
                                    }


                                    <div className="grid gap-2 mb-4">
                                        <p className="text-lg font-bold">Set up the device</p>
                                        {selectedDeviceCheck === 'Airconditioner' ?
                                            <div className="flex gap-2">
                                                <button className="bg-[#166B19E3] p-2 rounded-md flex justify-center items-center hover:bg-green-900">
                                                    <img src="../icon/switch1.svg" alt="" className="w-8 h-8" />
                                                </button>
                                                <div className="flex">
                                                    <button className={`bg-base-300 p-2 rounded-l-lg flex justify-center w-[50px] items-center hover:bg-gray-400 ${selectedDevice.mode === 'fan' ? 'border-[2px] border-[#4472C4] bg-[#b2ccfa]' : ''}`} >
                                                        <svg fill={`${selectedDevice.mode === 'fan' ? '#4472C4' : ''}`} className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.48154C7.29535 3.48154 3.48148 7.29541 3.48148 12.0001C3.48148 16.7047 7.29535 20.5186 12 20.5186C16.7046 20.5186 20.5185 16.7047 20.5185 12.0001C20.5185 7.29541 16.7046 3.48154 12 3.48154ZM2 12.0001C2 6.47721 6.47715 2.00006 12 2.00006C17.5228 2.00006 22 6.47721 22 12.0001C22 17.5229 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.5229 2 12.0001Z"></path> <path d="M12 11.3C11.8616 11.3 11.7262 11.3411 11.6111 11.418C11.496 11.4949 11.4063 11.6042 11.3533 11.7321C11.3003 11.86 11.2864 12.0008 11.3134 12.1366C11.3405 12.2724 11.4071 12.3971 11.505 12.495C11.6029 12.5929 11.7277 12.6596 11.8634 12.6866C11.9992 12.7136 12.14 12.6997 12.2679 12.6467C12.3958 12.5937 12.5051 12.504 12.582 12.3889C12.6589 12.2738 12.7 12.1385 12.7 12C12.7 11.8144 12.6262 11.6363 12.495 11.505C12.3637 11.3738 12.1857 11.3 12 11.3ZM12.35 5.00002C15.5 5.00002 15.57 7.49902 13.911 8.32502C13.6028 8.50778 13.3403 8.75856 13.1438 9.05822C12.9473 9.35787 12.8218 9.69847 12.777 10.054C13.1117 10.1929 13.4073 10.4116 13.638 10.691C16.2 9.29102 19 9.84401 19 12.35C19 15.5 16.494 15.57 15.675 13.911C15.4869 13.6029 15.232 13.341 14.9291 13.1448C14.6262 12.9485 14.283 12.8228 13.925 12.777C13.7844 13.1108 13.566 13.406 13.288 13.638C14.688 16.221 14.128 19 11.622 19C8.5 19 8.423 16.494 10.082 15.668C10.3852 15.4828 10.644 15.2332 10.84 14.9368C11.036 14.6404 11.1644 14.3046 11.216 13.953C10.8729 13.8188 10.5711 13.5967 10.341 13.309C7.758 14.695 5 14.149 5 11.65C5 8.50002 7.478 8.42302 8.304 10.082C8.48945 10.3888 8.74199 10.6496 9.04265 10.8448C9.34332 11.0399 9.68431 11.1645 10.04 11.209C10.1748 10.8721 10.3971 10.5772 10.684 10.355C9.291 7.80001 9.844 5.00002 12.336 5.00002H12.35Z"></path> </g></svg>
                                                    </button>
                                                    <button className={`bg-base-300 p-2 rounded-r-lg flex justify-center w-[50px] items-center hover:bg-gray-400 ${selectedDevice.mode === 'cool' ? 'border-[2px] border-[#4472C4] bg-[#b2ccfa]' : ''}`} >
                                                        <svg viewBox="0 0 45 45" className="w-6 h-6" fill={`${selectedDevice.mode === 'cool' ? '#4472C4' : ''}`} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M23.0261 7.548V11.578L27.0521 9.253L28.0521 10.986L23.0261 13.887V20.815L29.0261 17.351V11.548H31.0261V16.196L34.5171 14.182L35.5171 15.914L32.0261 17.929L36.0521 20.253L35.0521 21.986L30.0261 19.083L24.0261 22.547L30.0271 26.012L35.0521 23.11L36.0521 24.842L32.0261 27.166L35.5171 29.182L34.5171 30.914L31.0261 28.899V33.548H29.0261V27.744L23.0261 24.279V31.208L28.0521 34.11L27.0521 35.842L23.0261 33.517V37.548H21.0261V33.517L17.0001 35.842L16.0001 34.11L21.0261 31.208V24.279L15.0261 27.743V33.548H13.0261V28.898L9.53606 30.914L8.53606 29.182L12.0251 27.166L8.00006 24.842L9.00006 23.11L14.0251 26.011L20.0251 22.547L14.0261 19.083L9.00006 21.986L8.00006 20.253L12.0261 17.929L8.53606 15.914L9.53606 14.182L13.0261 16.196V11.548H15.0261V17.351L21.0261 20.815V13.887L16.0001 10.986L17.0001 9.253L21.0261 11.578V7.548H23.0261Z" fill={`${selectedDevice.mode === 'cool' ? '#4472C4' : ''}`}></path> </g></svg>
                                                    </button>
                                                </div>
                                                <button className="bg-base-300 p-2 rounded-md flex justify-center items-center hover:bg-gray-400">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            : <div className="flex gap-2">
                                                <button className="bg-[#166B19E3] p-2 rounded-md flex justify-center items-center hover:bg-green-900">
                                                    <img src="../icon/switch1.svg" alt="" className="w-8 h-8" />
                                                </button>

                                                <button className="bg-base-300 p-2 rounded-md flex justify-center items-center hover:bg-gray-400">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </button>

                                                <button className="bg-base-300 p-2 rounded-md flex justify-center items-center hover:bg-gray-400" onClick={handleIncreaseSpeed}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                </button>

                                                <input type="text" value={selectedDevice.speed} readOnly className="bg-base-300 p-2 shadow-inner-md text-xl font-bold text-center rounded-md w-20 flex justify-center items-center" />

                                                <button className="bg-base-300 p-2 rounded-md flex justify-center items-center hover:bg-gray-400" onClick={handleDecreaseSpeed}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                                    </svg>
                                                </button>
                                            </div>
                                        }
                                    </div>
                                    {selectedDeviceCheck === 'Airconditioner' ?
                                        <div className="grid pl-3 gap-3">
                                            <div className="w-full grid gap-2">
                                                <div className="flex gap-1 items-center"><img src="../icon/computer-fan-svgrepo-com.svg" className="w-4 h-4" alt="" /> <p>Fan Speed : {selectedDevice.speed} speed</p></div>
                                                <div className="w-full h-[10px] bg-gray-300 flex items-center rounded-sm relative">
                                                    <div className="h-full bg-[#0090CD] rounded-sm" style={{ width: `${selectedDevice.speed}%` }}></div>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        step="1"
                                                        value={selectedDevice.speed}
                                                        onChange={(e) => {
                                                            const newSpeed = parseInt(e.target.value);
                                                            setSelectedDevice((prevDevice) => ({
                                                                ...prevDevice,
                                                                speed: newSpeed,
                                                            }));
                                                        }}
                                                        className="absolute w-full appearance-none h-[10px] bg-transparent rounded-sm cursor-pointer"
                                                    />
                                                </div>

                                                <div className="flex justify-between text-end text-[#4472C4]">
                                                    <p>0%</p>
                                                    <p>25%</p>
                                                    <p>50%</p>
                                                    <p>75%</p>
                                                    <p>100%</p>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-b shadow-inner from-[#1E3F6C] via-[#3A7BD2] to-[#3268B2] text-white p-2 rounded-lg font-DS-Digital">
                                                <div className="flex justify-between">
                                                    <div className="flex gap-2">
                                                        <svg fill={`${selectedDevice.mode === 'fan' ? 'white' : '#717D96'}`} className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.48154C7.29535 3.48154 3.48148 7.29541 3.48148 12.0001C3.48148 16.7047 7.29535 20.5186 12 20.5186C16.7046 20.5186 20.5185 16.7047 20.5185 12.0001C20.5185 7.29541 16.7046 3.48154 12 3.48154ZM2 12.0001C2 6.47721 6.47715 2.00006 12 2.00006C17.5228 2.00006 22 6.47721 22 12.0001C22 17.5229 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.5229 2 12.0001Z"></path> <path d="M12 11.3C11.8616 11.3 11.7262 11.3411 11.6111 11.418C11.496 11.4949 11.4063 11.6042 11.3533 11.7321C11.3003 11.86 11.2864 12.0008 11.3134 12.1366C11.3405 12.2724 11.4071 12.3971 11.505 12.495C11.6029 12.5929 11.7277 12.6596 11.8634 12.6866C11.9992 12.7136 12.14 12.6997 12.2679 12.6467C12.3958 12.5937 12.5051 12.504 12.582 12.3889C12.6589 12.2738 12.7 12.1385 12.7 12C12.7 11.8144 12.6262 11.6363 12.495 11.505C12.3637 11.3738 12.1857 11.3 12 11.3ZM12.35 5.00002C15.5 5.00002 15.57 7.49902 13.911 8.32502C13.6028 8.50778 13.3403 8.75856 13.1438 9.05822C12.9473 9.35787 12.8218 9.69847 12.777 10.054C13.1117 10.1929 13.4073 10.4116 13.638 10.691C16.2 9.29102 19 9.84401 19 12.35C19 15.5 16.494 15.57 15.675 13.911C15.4869 13.6029 15.232 13.341 14.9291 13.1448C14.6262 12.9485 14.283 12.8228 13.925 12.777C13.7844 13.1108 13.566 13.406 13.288 13.638C14.688 16.221 14.128 19 11.622 19C8.5 19 8.423 16.494 10.082 15.668C10.3852 15.4828 10.644 15.2332 10.84 14.9368C11.036 14.6404 11.1644 14.3046 11.216 13.953C10.8729 13.8188 10.5711 13.5967 10.341 13.309C7.758 14.695 5 14.149 5 11.65C5 8.50002 7.478 8.42302 8.304 10.082C8.48945 10.3888 8.74199 10.6496 9.04265 10.8448C9.34332 11.0399 9.68431 11.1645 10.04 11.209C10.1748 10.8721 10.3971 10.5772 10.684 10.355C9.291 7.80001 9.844 5.00002 12.336 5.00002H12.35Z"></path> </g></svg>
                                                        <svg viewBox="0 0 45 45" className="w-[1.6rem] h-[1.6rem]" fill={`${selectedDevice.mode === 'cool' ? 'white' : '#717D96'}`} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M23.0261 7.548V11.578L27.0521 9.253L28.0521 10.986L23.0261 13.887V20.815L29.0261 17.351V11.548H31.0261V16.196L34.5171 14.182L35.5171 15.914L32.0261 17.929L36.0521 20.253L35.0521 21.986L30.0261 19.083L24.0261 22.547L30.0271 26.012L35.0521 23.11L36.0521 24.842L32.0261 27.166L35.5171 29.182L34.5171 30.914L31.0261 28.899V33.548H29.0261V27.744L23.0261 24.279V31.208L28.0521 34.11L27.0521 35.842L23.0261 33.517V37.548H21.0261V33.517L17.0001 35.842L16.0001 34.11L21.0261 31.208V24.279L15.0261 27.743V33.548H13.0261V28.898L9.53606 30.914L8.53606 29.182L12.0251 27.166L8.00006 24.842L9.00006 23.11L14.0251 26.011L20.0251 22.547L14.0261 19.083L9.00006 21.986L8.00006 20.253L12.0261 17.929L8.53606 15.914L9.53606 14.182L13.0261 16.196V11.548H15.0261V17.351L21.0261 20.815V13.887L16.0001 10.986L17.0001 9.253L21.0261 11.578V7.548H23.0261Z" fill={`${selectedDevice.mode === 'cool' ? 'white' : '#717D96'}`} ></path> </g></svg>
                                                    </div>
                                                    <p className="tracking-widest">Daily 00/00/0000 </p>

                                                </div>

                                                <div className="my-3 py-4 border-y text-6xl text-center border-white">
                                                    <p>{selectedDevice.speed}%</p>
                                                </div>

                                                <div className="flex justify-between text-sm mt-2">
                                                    <div className="flex items-center gap-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
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
                                        :
                                        <div className="grid pl-3 gap-3">
                                            <div className="w-full grid gap-2">
                                                <div className="flex gap-1 items-center"><img src="../icon/computer-fan-svgrepo-com.svg" className="w-4 h-4" alt="" /> <p>Fan Speed : {selectedDevice.speed} speed</p></div>
                                                <div className="w-full h-[10px] bg-gray-300  rounded-sm">
                                                    <div className="h-full bg-[#0090CD]" style={{ width: `${selectedDevice.speed}%` }}></div>
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
                                                <div className="flex gap-1 items-center"><img src="../icon/pressure-alt-svgrepo-com.svg" className="w-4 h-4" alt="" /> <p>Pressure drop : {selectedDevice.pressureDrop} %</p></div>
                                                <div className="w-auto h-[10px] bg-gray-300 rounded-sm">
                                                    <div className="h-full bg-[#515191] " style={{ width: `${selectedDevice.pressureDrop / 5}%` }}></div>
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
                                    }
                                </div>
                            ) : (
                                <p>No device selected</p>
                            )}
                        </div>

                        <div className="w-full h-full p-2 bg-base-100 flex justify-center relative border">
                            <img src="../image/2dMock.png" alt="" className="w-[100%] m-auto" />
                            {(devices2[selectedDeviceCheck] || []).map((device) => {
                                return (
                                    <div key={device.id} className={`absolute`} style={{ top: device.position.top, left: device.position.left }}>
                                        <div className={`px-1 ${(selectedDevice.id === device.id) || (selectedDevice.id === 0) ? 'bg-green-600 rounded-md ' : ''} `}>
                                            <img src={device.img} alt={device.name} className={`w-16 h-16 `} />
                                        </div>
                                    </div>
                                )
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
                                            className="border p-1 rounded-md">
                                            <option value="electricity">Accumulated Electricity Bill</option>
                                            <option value="pressure">Pressure Drop Values</option>
                                        </select>
                                        {selectedOption === "electricity" ?
                                            <p className="ml-auto">Accumulated Electricity Bill 45.98 (฿)</p> :
                                            <p className="ml-auto flex gap-1">Pressure Drop Values <p className="text-[#8979FF]">{selectedDevice.pressureDrop}</p> %</p>}
                                    </div>

                                    <div className="py-3">
                                        <ResponsiveContainer width="100%" height={300}>
                                            <LineChart data={data}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="time" />
                                                <YAxis />
                                                <Tooltip />
                                                <Line
                                                    type="monotone"
                                                    dataKey={selectedOption === "electricity" ? "cost" : "drop"}
                                                    stroke={`${selectedOption === "electricity" ? "#FF8C00" : "#8979FF"}`}
                                                    fillOpacity={0.1}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>

                                </div>
                            </div>
                            {selectedDeviceCheck !== 'Airconditioner' &&
                                <div className="flex w-1/5 mx-10">
                                    {selectedDevice ? (
                                        <div className="flex flex-col justify-center w-full relative">
                                            <div className="flex justify-center items-center relative">
                                                <ReactSpeedometer
                                                    value={selectedDevice.pressureDrop}
                                                    minValue={0}
                                                    maxValue={500}
                                                    segments={5}
                                                    segmentColors={["#89D13F", "#BAD64E", "#FFC85E", "#F89749", "#D53B3B"]}
                                                    className='my-auto'
                                                />
                                                <p className="absolute top-[9.85rem] right-[5.4rem] text-sm font-semibold">PSI</p>
                                            </div>
                                            <div className="grid grid-cols-2 justify-center text-center gap-1 absolute bottom-10">
                                                <div className="flex gap-1 items-center"><div className="rounded-full w-2 h-2 bg-[#89D13F]"></div><p>good</p></div>
                                                <div className="flex gap-1 items-center"><div className="rounded-full w-2 h-2 bg-[#BAD64E]"></div><p>medium</p></div>
                                                <div className="flex gap-1 items-center"><div className="rounded-full w-2 h-2 bg-[#FFC85E]"></div><p>Not good</p></div>
                                                <div className="flex gap-1 items-center"><div className="rounded-full w-2 h-2 bg-[#F89749]"></div><p>extremely bad</p></div>
                                                <div className="flex gap-1 items-center"><div className="rounded-full w-2 h-2 bg-[#D53B3B]"></div><p>dangerous</p></div>

                                            </div>
                                        </div>
                                    ) : (
                                        <p>No device selected</p>
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}

export default Leads;