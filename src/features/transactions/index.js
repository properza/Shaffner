import moment from "moment";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import TitleCard2 from "../../components/Cards/TitileCard2";

const devices = [
    { id: 1, img: "../image/FFU.png", name: "Fan Filter Unit 01", DeviceID: "FFN01", whereInstall: "Building A", speed: "50", pressureDrop: "125", status: "active", floor: "1", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
    { id: 2, img: "../image/FFU.png", name: "Fan Filter Unit 02", DeviceID: "FFN02", whereInstall: "Building A", speed: "50", pressureDrop: "186", status: "active", floor: "1", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
    { id: 3, img: "../image/FFU.png", name: "Fan Filter Unit 03", DeviceID: "FFN03", whereInstall: "Building A", speed: "50", pressureDrop: "155", status: "active", floor: "2", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
    { id: 4, img: "../image/FFU.png", name: "Fan Filter Unit 04", DeviceID: "FFN04", whereInstall: "Building A", speed: "50", pressureDrop: "450", status: "active", floor: "2", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
];

const groupsDevice = [
    { id: 1, GroupName: 'Fan Unit 1', whereInstall: 'Building A', floor: "1", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", DeviceMod: 'Fan', TimeUse: "11:30:20", connectLength: '4', status: 'active' },
]

function Transactions() {
    const [activeBtn, setActiveBtn] = useState("Single");
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [selectedDevices, setSelectedDevices] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [expandedMenuId, setExpandedMenuId] = useState(null);

    const [x, setX] = useState("");
    const [y, setY] = useState("");

    const toggleSubMenu = (id) => {
        if (expandedMenuId === id) {
            setExpandedMenuId(null);
        } else {
            setExpandedMenuId(id);
        }
    };

    const handleAddDevice = () => {
        setShowModal(true);
    };

    const handleGroupDevice = () => {
        setShowModal2(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowModal2(false);
    };

    const handleCheckboxChange = (deviceId) => {
        setSelectedDevices((prev) => {
            if (prev.includes(deviceId)) {
                return prev.filter(id => id !== deviceId);
            } else {
                return [...prev, deviceId];
            }
        });
    };

    const handleRowClick = (deviceId) => {
        setExpandedRows((prevExpandedRows) => {
            if (prevExpandedRows.includes(deviceId)) {
                return prevExpandedRows.filter(id => id !== deviceId);
            } else {
                return [...prevExpandedRows, deviceId];
            }
        });
    };

    const handleImageClick = (e) => {
        const bounds = e.target.getBoundingClientRect();
        const xCoord = e.clientX - bounds.left;
        const yCoord = e.clientY - bounds.top;
        setX(xCoord);
        setY(yCoord);
    };

    return (
        <>
            <TitleCard2 topMargin="mt-2">
                <div className="flex justify-between gap-3 items-center">
                    <p className="text-2xl text-[#1D24A1] font-bold">Manage Device</p>
                    <label htmlFor="" className="grid">
                        Select Building
                        <select name="" id="" className="border rounded-md px-2 py-1 w-[300px]">
                            <option value="">Building A</option>
                            <option value="">Building B</option>
                        </select>
                    </label>

                    <label htmlFor="" className="grid">
                        Select Floor
                        <select name="" id="" className="border rounded-md px-2 py-1 w-[300px]">
                            <option value="">Floor 1st</option>
                            <option value="">Floor 2nd</option>
                        </select>
                    </label>

                    <label htmlFor="" className="grid">
                        Select Device
                        <select name="" id="" className="border rounded-md px-2 py-1 w-[300px]">
                            <option value="">Fan Filter Unit</option>
                        </select>
                    </label>

                    <div className="flex gap-3 mt-auto">
                        <button className="bg-[#1D24A1] text-base-300 px-2 py-1 rounded-md" onClick={handleAddDevice}>
                            + Add Device
                        </button>
                        <button className={`${selectedDevices.length > 1 ? 'bg-[#1D24A1] text-base-300' : 'bg-base-300'}  px-2 py-1 rounded-md`} disabled={selectedDevices.length < 1} onClick={handleGroupDevice}>Group Device</button>
                    </div>
                </div>

                <div className="flex gap-4 mt-6 p-2">
                    <button className={`text-md font-semibold ${activeBtn === "Single" ? "border-b-[3px] border-b-[#1D24A1] text-[#1D24A1]" : ""}`} onClick={() => setActiveBtn("Single")}>
                        Single Device
                    </button>
                    <button className={`text-md font-semibold ${activeBtn === "Group" ? "border-b-[3px] border-b-[#1D24A1] text-[#1D24A1]" : ""}`} onClick={() => setActiveBtn("Group")}>
                        Group Device
                    </button>
                </div>

                <div className="my-1">
                    {activeBtn === "Single" ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>No</th>
                                    <th>Image</th>
                                    <th>Device Name</th>
                                    <th>Device ID</th>
                                    <th>Installation Location</th>
                                    <th>Floor</th>
                                    <th>Install Device</th>
                                    <th>Latest Usage</th>
                                    <th>Device On/Off Time</th>
                                    <th>Device Mode</th>
                                    <th>Time Used</th>
                                    <th>Working Status</th>
                                    <th>Menu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devices.map((device, index) => (
                                    <tr key={device.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                onChange={() => handleCheckboxChange(device.id)}
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img src={device.img} className="w-10 h-10" />
                                        </td>
                                        <td>{device.name}</td>
                                        <td>{device.DeviceID}</td>
                                        <td>{device.whereInstall}</td>
                                        <td>{device.floor}</td>
                                        <td>{device.InstallAt}</td>
                                        <td>{device.LatestUsage}</td>
                                        <td>{device.DeviceOnOff}</td>
                                        <td>
                                            <div className="grid">
                                                <p className="flex gap-1 items-center">
                                                    <img src="../icon/computer-fan-svgrepo-com.svg" className="w-4 h-4" alt="" /> {device.speed} speed
                                                </p>
                                                <p className="flex gap-1 items-center">
                                                    <img src="../icon/pressure-alt-svgrepo-com.svg" className="w-4 h-4" alt="" /> {device.pressureDrop}%
                                                </p>
                                            </div>
                                        </td>
                                        <td>{device.TimeUse}</td>
                                        <td>
                                            {device.status === 'active' ?
                                                <div className="bg-[#166B19] text-base-100 py-1 px-2 w-fit text-center rounded-md">
                                                    Online
                                                </div> :
                                                <div className="bg-[#BA2525] text-base-100 py-1 px-2 w-fit text-center rounded-md">
                                                    Offline
                                                </div>
                                            }
                                        </td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button className="bg-[#166B19E3] p-2 rounded-md flex justify-center items-center hover:bg-green-900">
                                                    <img src="../icon/switch1.svg" alt="" className="w-4 h-4" />
                                                </button>
                                                <div className="relative">
                                                    <button onClick={() => toggleSubMenu(device.id)} className="p-2 rounded-md flex justify-center items-center hover:bg-gray-400">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        </svg>
                                                    </button>
                                                    {expandedMenuId === device.id && (
                                                        <div className="absolute z-10 bg-white border shadow-md top-[-5rem] left-[-6rem] rounded-md w-30">
                                                            <ul>
                                                                <li className="p-2 hover:bg-gray-100 cursor-pointer">Set up device</li>
                                                                <li className="p-2 hover:bg-gray-100 cursor-pointer text-red-600">Deletion device</li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>No</th>
                                    <th>Group name</th>
                                    <th>Installation location</th>
                                    <th>Floor</th>
                                    <th>Latest use</th>
                                    <th>Device on/off time</th>
                                    <th>Device mode</th>
                                    <th>Time used</th>
                                    <th>Number connected devices</th>
                                    <th>Working status</th>
                                    <th>Menu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupsDevice.map((device, index) => (
                                    <React.Fragment key={device.id}>
                                        <tr >
                                            <td onClick={() => handleRowClick(device.id)} className="hover:bg-gray-100 cursor-pointer">
                                                <svg
                                                    className={`w-6 h-6 transform ${expandedRows.includes(device.id) ? 'rotate-180' : ''}`}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="black"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{device.GroupName}</td>
                                            <td>{device.whereInstall}</td>
                                            <td>{device.floor}</td>
                                            <td>{device.LatestUsage}</td>
                                            <td>{device.DeviceOnOff}</td>
                                            <td>{device.DeviceMod}</td>
                                            <td>{device.TimeUse}</td>
                                            <td>{device.connectLength}</td>
                                            <td>
                                                {device.status === 'active' ?
                                                    <div className="bg-[#166B19] text-base-100 py-1 px-2 w-fit text-center rounded-md">
                                                        Online
                                                    </div> :
                                                    <div className="bg-[#BA2525] text-base-100 py-1 px-2 w-fit text-center rounded-md">
                                                        Offline
                                                    </div>
                                                }
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button className="bg-[#166B19E3] p-2 rounded-md flex justify-center items-center hover:bg-green-900">
                                                        <img src="../icon/switch1.svg" alt="" className="w-4 h-4" />
                                                    </button>
                                                    <div className="relative">
                                                        <button onClick={() => toggleSubMenu(device.id)} className="p-2 rounded-md flex justify-center items-center hover:bg-gray-400">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                            </svg>
                                                        </button>
                                                        {expandedMenuId === device.id && (
                                                            <div className="absolute z-10 bg-white border shadow-md top-[-5rem] left-[-6rem] rounded-md w-30">
                                                                <ul>
                                                                    <li className="p-2 hover:bg-gray-100 cursor-pointer">Add device</li>
                                                                    <li className="p-2 hover:bg-gray-100 cursor-pointer">Set up device</li>
                                                                    <li className="p-2 hover:bg-gray-100 cursor-pointer text-red-600">Delete group</li>
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        {expandedRows.includes(device.id) && (
                                            <tr>
                                                <td colSpan="11">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Image</th>
                                                                <th>Device Name</th>
                                                                <th>Device ID</th>
                                                                <th>Installation Location</th>
                                                                <th>Floor</th>
                                                                <th>Install Device</th>
                                                                <th>Latest Usage</th>
                                                                <th>Device On/Off Time</th>
                                                                <th>Device Mode</th>
                                                                <th>Time Used</th>
                                                                <th>Working Status</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {devices.map((device, index) => (
                                                                <tr key={device.id}>
                                                                    <td>
                                                                        <img src={device.img} className="w-10 h-10" />
                                                                    </td>
                                                                    <td>{device.name}</td>
                                                                    <td>{device.DeviceID}</td>
                                                                    <td>{device.whereInstall}</td>
                                                                    <td>{device.floor}</td>
                                                                    <td>{device.InstallAt}</td>
                                                                    <td>{device.LatestUsage}</td>
                                                                    <td>{device.DeviceOnOff}</td>
                                                                    <td>
                                                                        <div className="grid">
                                                                            <p className="flex gap-1 items-center">
                                                                                <img src="../icon/computer-fan-svgrepo-com.svg" className="w-4 h-4" alt="" /> {device.speed} speed
                                                                            </p>
                                                                            <p className="flex gap-1 items-center">
                                                                                <img src="../icon/pressure-alt-svgrepo-com.svg" className="w-4 h-4" alt="" /> {device.pressureDrop}%
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                    <td>{device.TimeUse}</td>
                                                                    <td className="text-center">
                                                                        {device.status === 'active' ?
                                                                            <div className="bg-[#166B19] text-base-100 py-1 px-2 w-fit text-center rounded-md">
                                                                                Online
                                                                            </div> :
                                                                            <div className="bg-[#BA2525] text-base-100 py-1 px-2 w-fit text-center rounded-md">
                                                                                Offline
                                                                            </div>
                                                                        }
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <button className="bg-[#BA2525] text-base-100 py-1 px-2 w-fit text-center rounded-md"> Remove </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>

                    )}
                </div>
            </TitleCard2>

            {showModal && (
                <div className="fixed z-[99999] inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg w-2/3 gap-1">
                        <div className="flex justify-between">
                            <h3 className="text-xl font-semibold">Add Device</h3>
                        </div>
                        <div className="divider mt-2"></div>
                        <div className="flex gap-2">
                            <div className="w-1/2">
                                <div className="mt-4 h-full">
                                    <label className="block">Upload Image</label>
                                    <div className="flex justify-center items-center h-full bg-gray-100 border-dashed p-6 mt-1">
                                        <p className="text-sm">Upload images with PNG files.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">

                                <div className="mt-4">
                                    <label className="block">Select Building</label>
                                    <select className="border rounded-md px-2 py-1 w-full mt-1">
                                        <option>Building A</option>
                                        <option>Building B</option>
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <label className="block">Select Floor</label>
                                    <select className="border rounded-md px-2 py-1 w-full mt-1">
                                        <option>Floor 1st</option>
                                        <option>Floor 2nd</option>
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <label className="block">Device Name</label>
                                    <input type="text" className="border rounded-md px-2 py-1 w-full mt-1" />
                                </div>
                                <div className="mt-4">
                                    <label className="block">Device ID</label>
                                    <input type="text" className="border rounded-md px-2 py-1 w-full mt-1" />
                                </div>
                                <div className="mt-4">
                                    <label className="block">Category</label>
                                    <select name="" placeholder="- Choose a category -" id="" className="border rounded-md px-2 py-1 w-full mt-1" >
                                        <option value="">1</option>
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <label className="block">Positon</label>
                                    <div className="grid grid-cols-2">
                                        <input type="text" name="" readOnly value={x} placeholder="x" id="" className="border rounded-md px-2 py-1 w-full mt-1" />
                                        <input type="text" name="" readOnly value={y} placeholder="y" id="" className="border rounded-md px-2 py-1 w-full mt-1" />
                                    </div>
                                </div>

                            </div>
                            <div className="flex justify-center items-cemter w-full bg-gray-100">
                                <img src="../image/2dMock.png" alt="" className="w-[100%] m-auto" onClick={handleImageClick} />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={closeModal}>Cancel</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={closeModal}>Add Device</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Group Device */}
            {showModal2 && (
                <div className="fixed z-[99999] inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg w-1/2 gap-1">
                        <div className="flex">
                            <h3 className="text-xl font-semibold">Group Device</h3>
                        </div>
                        <div className="divider mt-2"></div>

                        <div className="mt-4">
                            <p>Group name :</p>
                            <input type="text" placeholder="Group 1" className="border rounded-md w-full px-2 py-1 mt-1" />
                        </div>

                        <div className="mt-4">
                            <p>Devices selected :</p>
                            <div className="grid grid-cols-3 border-collapse h-[25vh] overflow-auto p-1">
                                {selectedDevices.map((deviceId) => {
                                    const device = devices.find((d) => d.id === deviceId);
                                    return (

                                        <div key={device.id} className="flex gap-2 justify-center items-center h-[10vh] border p-2">
                                            <img src={device.img} alt={device.name} className="w-10 h-10" />
                                            <div className="">
                                                <p>{device.name}</p>
                                                <p className="text-sm">{device.DeviceID}</p>
                                            </div>
                                        </div>

                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex w-full">
                            <div className="mt-4 w-full">
                                <p>Time Setting :</p>
                                <div className="divider my-1"></div>
                                <div className="flex w-full">
                                    <div className="grid gap-2 w-full">
                                        <div className="flex gap-2 justify-center my-2">
                                            <button className={`bg-gray-300 p-2 rounded-md hover:bg-gray-500`}>MON</button>
                                            <button className={`bg-gray-300 p-2 rounded-md hover:bg-gray-500`}>TUE</button>
                                            <button className={`bg-gray-300 p-2 rounded-md hover:bg-gray-500`}>WED</button>
                                            <button className={`bg-gray-300 p-2 rounded-md hover:bg-gray-500`}>THU</button>
                                            <button className={`bg-gray-300 p-2 rounded-md hover:bg-gray-500`}>FRI</button>
                                            <button className={`bg-gray-300 p-2 rounded-md hover:bg-gray-500`}>SAT</button>
                                            <button className={`bg-gray-300 p-2 rounded-md hover:bg-gray-500`}>SUN</button>
                                        </div>
                                        <div className="flex gap-2 justify-center">
                                            <div className="flex gap-2 justify-center items-center">
                                                Open :
                                                <input type="number" className="border rounded-md px-2 py-1 w-[150px]" />
                                                :
                                                <input type="number" className="border rounded-md px-2 py-1 w-[150px]" />

                                            </div>
                                            <div className="flex gap-2 justify-center">
                                                Close :
                                                <input type="number" className="border rounded-md px-2 py-1 w-[150px]" />
                                                :
                                                <input type="number" className="border rounded-md px-2 py-1 w-[150px]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={closeModal}>Cancel</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md">Create Device Group</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Transactions;
