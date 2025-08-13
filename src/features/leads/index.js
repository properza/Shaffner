import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ReactSpeedometer from "react-d3-speedometer";


const devices = [
    { id: 1, img: '../image/FFU.png', name: 'Fan Filter Unit 01', speed: '50', pressureDrop: '125', status: 'active', position: { top: '28%', left: '25%' } },
    { id: 2, img: '../image/FFU.png', name: 'Fan Filter Unit 02', speed: '50', pressureDrop: '186', status: 'active', position: { top: '28%', left: '53%' } },
    { id: 3, img: '../image/FFU.png', name: 'Fan Filter Unit 03', speed: '50', pressureDrop: '155', status: 'active', position: { top: '65%', left: '32%' } },
    { id: 4, img: '../image/FFU.png', name: 'Fan Filter Unit 04', speed: '50', pressureDrop: '450', status: 'active', position: { top: '65%', left: '66%' } },
]

const devices2 = [
    { id: 1, img: '../image/FFU.png', name: 'Fan Filter Unit 01', speed: '50', pressureDrop: '125', status: 'active', position: { top: '20%', left: '25%' } },
    { id: 2, img: '../image/FFU.png', name: 'Fan Filter Unit 02', speed: '50', pressureDrop: '186', status: 'active', position: { top: '20%', left: '53%' } },
    { id: 3, img: '../image/FFU.png', name: 'Fan Filter Unit 03', speed: '50', pressureDrop: '155', status: 'active', position: { top: '70%', left: '32%' } },
    { id: 4, img: '../image/FFU.png', name: 'Fan Filter Unit 04', speed: '50', pressureDrop: '135', status: 'active', position: { top: '70%', left: '66%' } },
]

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

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const data = selectedOption === "electricity" ? accumulatedCostData : pressureDropData;

    const handleDeviceClick = (device) => {
        setSelectedDevice(device);
    }

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



    return (
        <div className="flex gap-1">
            <div className="bg-base-100 shadow-xl p-2 rounded-md w-[50rem] h-[86vh]">
                <div className="grid gap-2">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">Fan Filter Unit</p>
                        <p>( {devices.length} )</p>
                    </div>
                    <div className="flex gap-3">
                        <p className='py-1 px-2 text-white bg-[#166B19] rounded-md font-semibold'>Online {devices.length}</p>
                        <p className='py-1 px-2 text-white bg-[#3C3C4399] rounded-md font-semibold'>Offline {devices.length}</p>
                    </div>
                    <div className="">
                        {devices.map((device) => {
                            const speedPercentage = (device.speed / 100) * 100;
                            const pressureDropPercentage = (device.pressureDrop / 500) * 100;

                            return (
                                <div key={device.id} className='my-1' onClick={() => handleDeviceClick(device)}>
                                    <div className="flex gap-2 items-center w-full hover:bg-gray-100 cursor-pointer">
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {!selectedDevice ?
                <div className="p-10 h-[86vh] flex justify-center relative">
                    <img src="../image/2dMock.png" alt="" className="w-[80%] m-auto" />
                    {devices.map((device) => {
                        return (
                            <div key={device.id} className='absolute' style={{ top: device.position.top, left: device.position.left }}>
                                <img src={device.img} alt={device.name} className="w-16 h-16 rounded-md" />
                            </div>
                        )
                    })}
                </div> :

                <div className="shadow-xl">
                    <div className="flex justify-start">
                        <div className="bg-base-100 p-2 w-[45%] h-[50vh]">
                            <p>Device Details</p>
                            {selectedDevice ? (
                                <div className="">
                                    <div className="flex gap-1 justify-between items-center">
                                        <img src={selectedDevice.img} alt="Device" className="w-13 h-13" />
                                        <h3 className="text-xl font-semibold">{selectedDevice.name}</h3>
                                        <p className='py-1 px-2 text-white bg-[#166B19] rounded-md font-semibold'>Online</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mb-2 text-sm">
                                        <p>Date of Installation </p>
                                        <p>25/07/2568</p>
                                        <p>Lase avtive</p>
                                        <p>25/07/2568 : Time 08:00-18:00</p>
                                    </div>

                                    <div className="grid gap-2 mb-4">
                                        <p className="text-lg font-bold">Set up the device</p>
                                        <div className="flex gap-2">

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
                                    </div>
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
                                </div>
                            ) : (
                                <p>No device selected</p>
                            )}
                        </div>

                        <div className="p-10 w-full h-auto flex justify-center relative">
                            <img src="../image/2dMock.png" alt="" className="w-[80%] m-auto" />
                            {devices2.map((device) => {
                                return (
                                    <div key={device.id} className={`absolute`} style={{ top: device.position.top, left: device.position.left }}>
                                        <div className={`px-1 ${selectedDevice.id === device.id ? 'bg-green-600 rounded-md ' : ''} `}>
                                            <img src={device.img} alt={device.name} className={`w-16 h-16 `} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="bg-base-100 pt-2 h-[36vh]">
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
                            <div className="flex w-1/5 mx-10">
                                {selectedDevice ? (
                                    <div className="flex flex-col justify-center w-full relative">
                                        <div className="flex justify-center items-center">
                                            <ReactSpeedometer
                                                value={selectedDevice.pressureDrop}
                                                minValue={0}
                                                maxValue={500}
                                                segments={5}
                                                segmentColors={["#89D13F", "#BAD64E", "#FFC85E", "#F89749", "#D53B3B"]}
                                                className='my-auto'
                                            />
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
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Leads;