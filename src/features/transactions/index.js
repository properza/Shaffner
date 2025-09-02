import moment from "moment";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import TitleCard2 from "../../components/Cards/TitileCard2";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleDevice, fetchGroups, fetchDeviceData, createGroup, addGroupMember, removeGroupMember } from "../common/groupSlice";
import { format } from "date-fns";

const devices = {
    ac: [
        { id: 1, img: '../image/airMock.png', name: "Daikin CX01", DeviceID: "AC01", whereInstall: "Building A", speed: "25", pressureDrop: "125", mode: 'fan', status: "active", floor: "1", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
        { id: 2, img: '../image/airMock.png', name: "Daikin CX02", DeviceID: "AC02", whereInstall: "Building A", speed: "25", pressureDrop: "186", mode: 'fan', status: "active", floor: "1", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
        { id: 3, img: '../image/airMock.png', name: "Daikin CX03", DeviceID: "AC03", whereInstall: "Building A", speed: "25", pressureDrop: "155", mode: 'fan', status: "active", floor: "2", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
        { id: 4, img: '../image/airMock.png', name: "Daikin CX04", DeviceID: "AC04", whereInstall: "Building A", speed: "25", pressureDrop: "450", mode: 'fan', status: "active", floor: "2", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
    ],
    ffu: [
        { id: 1, img: "../image/FFU.png", name: "Fan Filter Unit 01", DeviceID: "FFU01", whereInstall: "Building A", speed: "50", pressureDrop: "125", status: "active", floor: "1", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
        { id: 2, img: "../image/FFU.png", name: "Fan Filter Unit 02", DeviceID: "FFU02", whereInstall: "Building A", speed: "50", pressureDrop: "186", status: "active", floor: "1", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
        { id: 3, img: "../image/FFU.png", name: "Fan Filter Unit 02", DeviceID: "FFU03", whereInstall: "Building A", speed: "50", pressureDrop: "186", status: "active", floor: "1", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
        { id: 4, img: "../image/FFU.png", name: "Fan Filter Unit 03", DeviceID: "FFU04", whereInstall: "Building A", speed: "50", pressureDrop: "155", status: "active", floor: "2", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
        { id: 5, img: "../image/FFU.png", name: "Fan Filter Unit 03", DeviceID: "FFU05", whereInstall: "Building A", speed: "50", pressureDrop: "155", status: "active", floor: "2", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
        { id: 6, img: "../image/FFU.png", name: "Fan Filter Unit 04", DeviceID: "FFU06", whereInstall: "Building A", speed: "50", pressureDrop: "450", status: "active", floor: "2", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
        { id: 7, img: "../image/FFU.png", name: "Fan Filter Unit 04", DeviceID: "FFU07", whereInstall: "Building A", speed: "50", pressureDrop: "450", status: "active", floor: "2", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
        { id: 8, img: "../image/FFU.png", name: "Fan Filter Unit 04", DeviceID: "FFU08", whereInstall: "Building A", speed: "50", pressureDrop: "450", status: "active", floor: "2", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
        { id: 9, img: "../image/FFU.png", name: "Fan Filter Unit 04", DeviceID: "FFU09", whereInstall: "Building A", speed: "50", pressureDrop: "450", status: "active", floor: "2", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
    ],
};

const devicesUnuse = {
    ffu: [
        { id: 1, img: "../image/FFU.png", name: "Fan Filter Unit 05", DeviceID: "FFN01", whereInstall: "Building A", speed: "50", pressureDrop: "125", status: "active", floor: "1", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
        { id: 2, img: "../image/FFU.png", name: "Fan Filter Unit 06", DeviceID: "FFN02", whereInstall: "Building A", speed: "50", pressureDrop: "186", status: "active", floor: "1", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
    ],
    ac: [
        { id: 1, img: '../image/airMock.png', name: "Daikin CX05", DeviceID: "SCFN1", whereInstall: "Building A", speed: "25", pressureDrop: "125", mode: 'fan', status: "active", floor: "1", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
        { id: 2, img: '../image/airMock.png', name: "Daikin CX06", DeviceID: "SCFN2", whereInstall: "Building A", speed: "25", pressureDrop: "186", mode: 'fan', status: "active", floor: "1", InstallAt: "25/07/2568", LatestUsage: "25/07/2568", DeviceOnOff: "08:00 - 18:00", TimeUse: "11:30:20" },
    ]
};

const groupsDevice = {
    ffu: [
        { id: 1, name: "Fan Unit 1", GroupName: 'Fan Unit 1', whereInstall: 'Building A', floor: "1", LatestUsage: "25/07/2568", speed: "50", pressureDrop: "450", DeviceOnOff: "08:00 - 18:00", DeviceMod: 'Fan', TimeUse: "11:30:20", connectLength: '4', status: 'active' },
    ],
    ac: [
        { id: 1, name: "Air 1", GroupName: 'Air Unit 1', whereInstall: 'Building A', floor: "1", LatestUsage: "25/07/2568", speed: "25", pressureDrop: "450", DeviceOnOff: "08:00 - 18:00", DeviceMod: 'Fan', mode: 'fan', TimeUse: "11:30:20", connectLength: '4', status: 'active' },
    ]
};

function Transactions() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [expandedRows, setExpandedRows] = useState([]);
    const [selectedDevices, setSelectedDevices] = useState([]);
    const [expandedMenuId, setExpandedMenuId] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [showDeviceModal, setShowDeviceModal] = useState(false);
    const [showDeviceModal2, setShowDeviceModal2] = useState(false);
    const [showDeviceGropAdd, setShowDeviceGropAdd] = useState(false);
    const [showModalAddgroup, setShowModalAddgroup] = useState(false);
    const [groupMembersFilter, setGroupMembersFilter] = useState([]);


    const [activeBtn, setActiveBtn] = useState("Single");
    const [selectedDeviceCheck, setSelectedDeviceCheck] = useState('ac');

    const { groups, single, deviceDatas, loading, error } = useSelector((state) => state.groups);

    const icon = selectedDeviceCheck === 'ffu' ? '../image/FFU.png' : '../image/airMock.png';

    useEffect(() => {
        dispatch(fetchGroups())
        dispatch(fetchDeviceData())
        dispatch(fetchSingleDevice(selectedDeviceCheck))
    }, [dispatch, selectedDeviceCheck])

    const handleDeviceSetupClick = (device) => {
        setSelectedDevice(device);
        setShowDeviceModal(true);
        setExpandedMenuId(null);
    };

    const handleDeviceSetupClick2 = (device) => {
        setSelectedDevice(device);
        setShowDeviceModal2(true);
        setExpandedMenuId(null);
    };

    const handleAddDeviceToGroup = (device) => {
        setShowDeviceGropAdd(device)
        setShowModalAddgroup(true);
        setExpandedMenuId(null);
    };

    const handleDeletionDevice = (device) => {
        setExpandedMenuId(null);
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${device.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'bg-red-500 text-white hover:bg-red-600 px-2 py-1 rounded-md mr-3',
                cancelButton: 'bg-gray-500 text-white hover:bg-gray-600 px-2 py-1 rounded-md',
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(`Device ${device.name} has been deleted.`);
                Swal.fire({
                    title: 'Deleted!',
                    text: `${device.name} has been deleted.`,
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        });
    };

    const handleDeletionDevice2 = (deviceId, groupName, groupId) => {
        setExpandedMenuId(null);

        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to remove ${deviceId} from group ${groupName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'bg-red-500 text-white hover:bg-red-600 px-2 py-1 rounded-md mr-3',
                cancelButton: 'bg-gray-500 text-white hover:bg-gray-600 px-2 py-1 rounded-md',
            },
            buttonsStyling: false,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const formData = new FormData();
                    formData.append("members[]", deviceId);
                    await dispatch(removeGroupMember({ groupId, formData })).unwrap();

                    Swal.fire({
                        title: 'Removed!',
                        text: `${deviceId} has been removed from group ${groupName}.`,
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });

                    dispatch(fetchGroups())
                    dispatch(fetchDeviceData())
                    dispatch(fetchSingleDevice(selectedDeviceCheck))

                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to remove device from group.',
                        icon: 'error',
                    });
                }
            }
        });
    };


    const [x, setX] = useState("");
    const [y, setY] = useState("");

    const toggleSubMenu = (id) => {
        if (expandedMenuId === id) {
            setExpandedMenuId(null);
        } else {
            setExpandedMenuId(id);
        }
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

    const closeDeviceModal = () => {
        setShowDeviceModal(false);
        setShowDeviceModal2(false);
        setShowModalAddgroup(false);
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

        const group = groups.find((g) => g.id === deviceId);
        if (group && group.members) {
            setGroupMembersFilter(group.members);
        } else {
            setGroupMembersFilter([]);
        }
    };

    const handleImageClick = (e) => {
        const bounds = e.target.getBoundingClientRect();
        const xCoord = e.clientX - bounds.left - 8;
        const yCoord = e.clientY - bounds.top - 8;

        setX(xCoord);
        setY(yCoord);

    };


    return (
        <>
            <TitleCard2 topMargin="mt-0">
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
                        <select
                            name=""
                            id=""
                            className="border rounded-md px-2 py-1 w-[300px]"
                            value={selectedDeviceCheck} // ใช้ value เพื่อให้ค่าใน select ตรงกับ state
                            onChange={(e) => setSelectedDeviceCheck(e.target.value)} // อัปเดต state เมื่อมีการเปลี่ยนแปลง
                        >
                            <option value="ac">Air conditioner</option>
                            <option value="ffu">Fan Filter Unit</option>
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
                    <button className={`text-md font-semibold ${activeBtn === "Single" ? "border-b-[3px] border-b-[#1D24A1] text-[#1D24A1]" : ""}`} onClick={() => { setActiveBtn("Single"); setExpandedMenuId(null) }}>
                        Single Device
                    </button>
                    <button className={`text-md font-semibold ${activeBtn === "Group" ? "border-b-[3px] border-b-[#1D24A1] text-[#1D24A1]" : ""}`} onClick={() => { setActiveBtn("Group"); setExpandedMenuId(null) }}>
                        Group Device
                    </button>
                </div>

                <div className="my-1">
                    {activeBtn === "Single" ? (
                        <div className=" overflow-auto">
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
                                        <th className="!w-[200px]">Menu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(devices[selectedDeviceCheck] || [])

                                        .map((device, index) => (
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
                                                {selectedDeviceCheck === 'ac' ?
                                                    <td>
                                                        <div className="flex gap-1">
                                                            <svg fill="#000000" className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.48154C7.29535 3.48154 3.48148 7.29541 3.48148 12.0001C3.48148 16.7047 7.29535 20.5186 12 20.5186C16.7046 20.5186 20.5185 16.7047 20.5185 12.0001C20.5185 7.29541 16.7046 3.48154 12 3.48154ZM2 12.0001C2 6.47721 6.47715 2.00006 12 2.00006C17.5228 2.00006 22 6.47721 22 12.0001C22 17.5229 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.5229 2 12.0001Z"></path> <path d="M12 11.3C11.8616 11.3 11.7262 11.3411 11.6111 11.418C11.496 11.4949 11.4063 11.6042 11.3533 11.7321C11.3003 11.86 11.2864 12.0008 11.3134 12.1366C11.3405 12.2724 11.4071 12.3971 11.505 12.495C11.6029 12.5929 11.7277 12.6596 11.8634 12.6866C11.9992 12.7136 12.14 12.6997 12.2679 12.6467C12.3958 12.5937 12.5051 12.504 12.582 12.3889C12.6589 12.2738 12.7 12.1385 12.7 12C12.7 11.8144 12.6262 11.6363 12.495 11.505C12.3637 11.3738 12.1857 11.3 12 11.3ZM12.35 5.00002C15.5 5.00002 15.57 7.49902 13.911 8.32502C13.6028 8.50778 13.3403 8.75856 13.1438 9.05822C12.9473 9.35787 12.8218 9.69847 12.777 10.054C13.1117 10.1929 13.4073 10.4116 13.638 10.691C16.2 9.29102 19 9.84401 19 12.35C19 15.5 16.494 15.57 15.675 13.911C15.4869 13.6029 15.232 13.341 14.9291 13.1448C14.6262 12.9485 14.283 12.8228 13.925 12.777C13.7844 13.1108 13.566 13.406 13.288 13.638C14.688 16.221 14.128 19 11.622 19C8.5 19 8.423 16.494 10.082 15.668C10.3852 15.4828 10.644 15.2332 10.84 14.9368C11.036 14.6404 11.1644 14.3046 11.216 13.953C10.8729 13.8188 10.5711 13.5967 10.341 13.309C7.758 14.695 5 14.149 5 11.65C5 8.50002 7.478 8.42302 8.304 10.082C8.48945 10.3888 8.74199 10.6496 9.04265 10.8448C9.34332 11.0399 9.68431 11.1645 10.04 11.209C10.1748 10.8721 10.3971 10.5772 10.684 10.355C9.291 7.80001 9.844 5.00002 12.336 5.00002H12.35Z"></path> </g></svg>
                                                            <p>Mode: {device.mode}</p>
                                                        </div>
                                                    </td>
                                                    :
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
                                                }
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
                                                    <div className="flex w-[100px] gap-2">
                                                        <button className="bg-[#166B19E3] p-2 rounded-md flex justify-center items-center hover:bg-green-900">
                                                            <img src="../icon/switch1.svg" alt="" className="w-5 h-5" />
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
                                                                        <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleDeviceSetupClick(device)}>Set up device</li>
                                                                        <li className="p-2 hover:bg-gray-100 cursor-pointer text-red-600" onClick={() => handleDeletionDevice(device)}>Deletion device</li>
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
                        </div>
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
                                    {selectedDeviceCheck === 'ac' ? <th>Device mode</th> : <th>Fan speed</th>}
                                    <th>Time used</th>
                                    <th>Number connected devices</th>
                                    <th>Working status</th>
                                    <th>Menu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groups
                                    .filter((device) => selectedDeviceCheck.includes(device.type))
                                    .map((device, index) => {
                                        const singleData = single?.[device.members[0]] || {};
                                        const singleDevice = deviceDatas.find(
                                            (d) => d.device_id === device.members[0]
                                        );
                                        return (
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
                                                    <td>{device.name}</td>
                                                    <td>Building A</td>
                                                    <td>2</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>{singleData.DeviceMod || singleData.fan_speed}</td>
                                                    <td>-</td>
                                                    <td>{device.members.length}</td>
                                                    <td>
                                                        {singleData.power === 'on' ?
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
                                                                            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAddDeviceToGroup(device)}>Add device</li>
                                                                            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleDeviceSetupClick2(device)}>Set up device</li>
                                                                            <li className="p-2 hover:bg-gray-100 cursor-pointer text-red-600" onClick={() => handleDeletionDevice(device)}>Delete group</li>
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
                                                                        {/* <th>Time Used</th> */}
                                                                        <th>Working Status</th>
                                                                        {/* <th></th> */}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {/* groupMembersFilter */}
                                                                    {deviceDatas
                                                                        .filter((inner) => groupMembersFilter.includes(inner.device_id))
                                                                        .map((inner, index) => {
                                                                            const singleData = single?.[inner.device_id] || {};

                                                                            return (
                                                                                <tr key={inner.id}>
                                                                                    <td>
                                                                                        <img src={icon} className="w-10 h-10" />
                                                                                    </td>
                                                                                    <td>{inner.device_name}</td>
                                                                                    <td>{inner.device_id}</td>
                                                                                    <td>{format(inner?.created_at, "dd/MM/yyyy")}</td>
                                                                                    <td>{inner.floor}</td>
                                                                                    <td>{inner.location}</td>

                                                                                    {/* ค่าที่ได้จาก Single */}
                                                                                    <td>{singleData.ts ? format(new Date(Number(singleData.ts) * 1000), "HH:mm:ss") : "N/A"}</td>
                                                                                    <td>-</td>

                                                                                    {selectedDeviceCheck === "ac" ? (
                                                                                        <td>
                                                                                            <div className="flex gap-1">
                                                                                                <svg
                                                                                                    fill="#000000"
                                                                                                    className="w-5 h-5"
                                                                                                    viewBox="0 0 24 24"
                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                >
                                                                                                    {/* ...svg code */}
                                                                                                </svg>
                                                                                                <p>Mode: {singleData.mode || "N/A"}</p>
                                                                                            </div>
                                                                                        </td>
                                                                                    ) : (
                                                                                        <td>
                                                                                            <div className="grid">
                                                                                                <p className="flex gap-1 items-center">
                                                                                                    <img
                                                                                                        src="../icon/computer-fan-svgrepo-com.svg"
                                                                                                        className="w-4 h-4"
                                                                                                        alt=""
                                                                                                    />{" "}
                                                                                                    {singleData.fan_speed} speed
                                                                                                </p>
                                                                                                {/* <p className="flex gap-1 items-center">
                                                                                                    <img
                                                                                                        src="../icon/pressure-alt-svgrepo-com.svg"
                                                                                                        className="w-4 h-4"
                                                                                                        alt=""
                                                                                                    />{" "}
                                                                                                    {device.pressureDrop}%
                                                                                                </p> */}
                                                                                            </div>
                                                                                        </td>
                                                                                    )}

                                                                                    {/* <td>{device.TimeUse}</td> */}

                                                                                    <td className="text-center flex justify-center">
                                                                                        {singleData.power === "on" ? (
                                                                                            <div className="bg-[#166B19] text-base-100 py-1 px-2 w-fit text-center rounded-md">
                                                                                                Online
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="bg-[#BA2525] text-base-100 py-1 px-2 w-fit text-center rounded-md">
                                                                                                Offline
                                                                                            </div>
                                                                                        )}
                                                                                    </td>

                                                                                    <td className="text-center">
                                                                                        <button
                                                                                            className="bg-[#BA2525] text-base-100 py-1 px-2 w-fit text-center rounded-md"
                                                                                            onClick={() =>
                                                                                                handleDeletionDevice2(inner.device_id, device.name, device.id)
                                                                                            }
                                                                                        >
                                                                                            Remove
                                                                                        </button>
                                                                                    </td>
                                                                                </tr>
                                                                            );
                                                                        })}

                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
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
                            <div className="w-[60%]">
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
                            <div className="flex justify-center items-cemter border rounded-md bg-base-100 w-full ">
                                <div className="relative my-auto w-[100%]">
                                    <img
                                        src="../image/2dMock.png"
                                        alt=""
                                        className="w-[100%] m-auto"
                                        onClick={handleImageClick}
                                    />
                                    {x && y && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                left: `${x}px`,
                                                top: `${y}px`,
                                                width: "14px",
                                                height: "14px",
                                                backgroundColor: "black",
                                                borderRadius: "50%",
                                            }}
                                            className="border-[2px] border-[#24BC29]"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={closeModal}>Cancel</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={closeModal}>Add Device</button>
                        </div>
                    </div>
                </div>
            )}

            {showDeviceModal && selectedDevice && (
                <div className="fixed z-[99999] inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg w-1/2 gap-1">
                        <div className="flex justify-between">
                            <h3 className="text-xl font-semibold">Setting Device: {selectedDevice.name}</h3>
                        </div>
                        <div className="divider mt-2"></div>
                        <div className="grid gap-3">
                            <div className="flex justify-between">
                                <div className="flex gap-3 items-center p-2">
                                    <img src={selectedDevice.img} alt={selectedDevice.name} className="w-15 h-15" />
                                    <div className="">
                                        <p>{selectedDevice.name}</p>
                                        <div className="grid">
                                            <p className="flex gap-1 items-center">
                                                <img src="../icon/computer-fan-svgrepo-com.svg" className="w-4 h-4" alt="" /> {selectedDevice.speed} speed
                                            </p>
                                            <p className="flex gap-1 items-center">
                                                <img src="../icon/pressure-alt-svgrepo-com.svg" className="w-4 h-4" alt="" /> {selectedDevice.pressureDrop}%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 h-10 items-center my-auto">

                                    {selectedDeviceCheck === 'ac' ?
                                        <div className="flex">
                                            <button className={`bg-base-300 p-2 rounded-l-lg flex justify-center w-[50px] items-center hover:bg-gray-400 ${selectedDevice.mode === 'fan' ? 'border-[2px] border-[#4472C4] bg-[#b2ccfa]' : ''}`} >
                                                <svg fill={`${selectedDevice.mode === 'fan' ? '#4472C4' : ''}`} className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.48154C7.29535 3.48154 3.48148 7.29541 3.48148 12.0001C3.48148 16.7047 7.29535 20.5186 12 20.5186C16.7046 20.5186 20.5185 16.7047 20.5185 12.0001C20.5185 7.29541 16.7046 3.48154 12 3.48154ZM2 12.0001C2 6.47721 6.47715 2.00006 12 2.00006C17.5228 2.00006 22 6.47721 22 12.0001C22 17.5229 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.5229 2 12.0001Z"></path> <path d="M12 11.3C11.8616 11.3 11.7262 11.3411 11.6111 11.418C11.496 11.4949 11.4063 11.6042 11.3533 11.7321C11.3003 11.86 11.2864 12.0008 11.3134 12.1366C11.3405 12.2724 11.4071 12.3971 11.505 12.495C11.6029 12.5929 11.7277 12.6596 11.8634 12.6866C11.9992 12.7136 12.14 12.6997 12.2679 12.6467C12.3958 12.5937 12.5051 12.504 12.582 12.3889C12.6589 12.2738 12.7 12.1385 12.7 12C12.7 11.8144 12.6262 11.6363 12.495 11.505C12.3637 11.3738 12.1857 11.3 12 11.3ZM12.35 5.00002C15.5 5.00002 15.57 7.49902 13.911 8.32502C13.6028 8.50778 13.3403 8.75856 13.1438 9.05822C12.9473 9.35787 12.8218 9.69847 12.777 10.054C13.1117 10.1929 13.4073 10.4116 13.638 10.691C16.2 9.29102 19 9.84401 19 12.35C19 15.5 16.494 15.57 15.675 13.911C15.4869 13.6029 15.232 13.341 14.9291 13.1448C14.6262 12.9485 14.283 12.8228 13.925 12.777C13.7844 13.1108 13.566 13.406 13.288 13.638C14.688 16.221 14.128 19 11.622 19C8.5 19 8.423 16.494 10.082 15.668C10.3852 15.4828 10.644 15.2332 10.84 14.9368C11.036 14.6404 11.1644 14.3046 11.216 13.953C10.8729 13.8188 10.5711 13.5967 10.341 13.309C7.758 14.695 5 14.149 5 11.65C5 8.50002 7.478 8.42302 8.304 10.082C8.48945 10.3888 8.74199 10.6496 9.04265 10.8448C9.34332 11.0399 9.68431 11.1645 10.04 11.209C10.1748 10.8721 10.3971 10.5772 10.684 10.355C9.291 7.80001 9.844 5.00002 12.336 5.00002H12.35Z"></path> </g></svg>
                                            </button>
                                            <button className={`bg-base-300 p-2 rounded-r-lg flex justify-center w-[50px] items-center hover:bg-gray-400 ${selectedDevice.mode === 'cool' ? 'border-[2px] border-[#4472C4] bg-[#b2ccfa]' : ''}`} >
                                                <svg viewBox="0 0 45 45" className="w-6 h-6" fill={`${selectedDevice.mode === 'cool' ? '#4472C4' : ''}`} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M23.0261 7.548V11.578L27.0521 9.253L28.0521 10.986L23.0261 13.887V20.815L29.0261 17.351V11.548H31.0261V16.196L34.5171 14.182L35.5171 15.914L32.0261 17.929L36.0521 20.253L35.0521 21.986L30.0261 19.083L24.0261 22.547L30.0271 26.012L35.0521 23.11L36.0521 24.842L32.0261 27.166L35.5171 29.182L34.5171 30.914L31.0261 28.899V33.548H29.0261V27.744L23.0261 24.279V31.208L28.0521 34.11L27.0521 35.842L23.0261 33.517V37.548H21.0261V33.517L17.0001 35.842L16.0001 34.11L21.0261 31.208V24.279L15.0261 27.743V33.548H13.0261V28.898L9.53606 30.914L8.53606 29.182L12.0251 27.166L8.00006 24.842L9.00006 23.11L14.0251 26.011L20.0251 22.547L14.0261 19.083L9.00006 21.986L8.00006 20.253L12.0261 17.929L8.53606 15.914L9.53606 14.182L13.0261 16.196V11.548H15.0261V17.351L21.0261 20.815V13.887L16.0001 10.986L17.0001 9.253L21.0261 11.578V7.548H23.0261Z" fill={`${selectedDevice.mode === 'cool' ? '#4472C4' : ''}`}></path> </g></svg>
                                            </button>
                                        </div>
                                        :
                                        <>
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
                                        </>
                                    }
                                </div>

                            </div>
                            <div className="grid pl-3 gap-3">
                                {selectedDeviceCheck === 'ac' ?
                                    <div className="grid pl-3 gap-3">

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
                                    </div>
                                    :
                                    <>
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
                                    </>
                                }

                            </div>
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
                        <div className="flex justify-end gap-2 mt-4">
                            <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={closeDeviceModal}>Cancel</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={closeDeviceModal}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {showDeviceModal2 && selectedDevice && (
                <div className="fixed z-[99999] inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg w-1/2 gap-1">
                        <div className="flex justify-between">
                            <h3 className="text-xl font-semibold">Setting Device : {selectedDevice.GroupName}</h3>
                        </div>
                        <div className="divider mt-2"></div>
                        <div className="grid gap-3">
                            <div className="flex flex-col justify-between">
                                <div className="grid grid-cols-3 my-3">
                                    {(devices[selectedDeviceCheck] || []).map((device) => {
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
                                {selectedDeviceCheck === 'ac' ?
                                    <div className="grid pl-3 gap-3">

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
                                        <div className="flex mx-auto my-2">
                                            <button className={`bg-base-300 p-2 rounded-l-lg flex justify-center w-[50px] items-center hover:bg-gray-400 ${selectedDevice.mode === 'fan' ? 'border-[2px] border-[#4472C4] bg-[#b2ccfa]' : ''}`} >
                                                <svg fill={`${selectedDevice.mode === 'fan' ? '#4472C4' : ''}`} className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.48154C7.29535 3.48154 3.48148 7.29541 3.48148 12.0001C3.48148 16.7047 7.29535 20.5186 12 20.5186C16.7046 20.5186 20.5185 16.7047 20.5185 12.0001C20.5185 7.29541 16.7046 3.48154 12 3.48154ZM2 12.0001C2 6.47721 6.47715 2.00006 12 2.00006C17.5228 2.00006 22 6.47721 22 12.0001C22 17.5229 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.5229 2 12.0001Z"></path> <path d="M12 11.3C11.8616 11.3 11.7262 11.3411 11.6111 11.418C11.496 11.4949 11.4063 11.6042 11.3533 11.7321C11.3003 11.86 11.2864 12.0008 11.3134 12.1366C11.3405 12.2724 11.4071 12.3971 11.505 12.495C11.6029 12.5929 11.7277 12.6596 11.8634 12.6866C11.9992 12.7136 12.14 12.6997 12.2679 12.6467C12.3958 12.5937 12.5051 12.504 12.582 12.3889C12.6589 12.2738 12.7 12.1385 12.7 12C12.7 11.8144 12.6262 11.6363 12.495 11.505C12.3637 11.3738 12.1857 11.3 12 11.3ZM12.35 5.00002C15.5 5.00002 15.57 7.49902 13.911 8.32502C13.6028 8.50778 13.3403 8.75856 13.1438 9.05822C12.9473 9.35787 12.8218 9.69847 12.777 10.054C13.1117 10.1929 13.4073 10.4116 13.638 10.691C16.2 9.29102 19 9.84401 19 12.35C19 15.5 16.494 15.57 15.675 13.911C15.4869 13.6029 15.232 13.341 14.9291 13.1448C14.6262 12.9485 14.283 12.8228 13.925 12.777C13.7844 13.1108 13.566 13.406 13.288 13.638C14.688 16.221 14.128 19 11.622 19C8.5 19 8.423 16.494 10.082 15.668C10.3852 15.4828 10.644 15.2332 10.84 14.9368C11.036 14.6404 11.1644 14.3046 11.216 13.953C10.8729 13.8188 10.5711 13.5967 10.341 13.309C7.758 14.695 5 14.149 5 11.65C5 8.50002 7.478 8.42302 8.304 10.082C8.48945 10.3888 8.74199 10.6496 9.04265 10.8448C9.34332 11.0399 9.68431 11.1645 10.04 11.209C10.1748 10.8721 10.3971 10.5772 10.684 10.355C9.291 7.80001 9.844 5.00002 12.336 5.00002H12.35Z"></path> </g></svg>
                                            </button>
                                            <button className={`bg-base-300 p-2 rounded-r-lg flex justify-center w-[50px] items-center hover:bg-gray-400 ${selectedDevice.mode === 'cool' ? 'border-[2px] border-[#4472C4] bg-[#b2ccfa]' : ''}`} >
                                                <svg viewBox="0 0 45 45" className="w-6 h-6" fill={`${selectedDevice.mode === 'cool' ? '#4472C4' : ''}`} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M23.0261 7.548V11.578L27.0521 9.253L28.0521 10.986L23.0261 13.887V20.815L29.0261 17.351V11.548H31.0261V16.196L34.5171 14.182L35.5171 15.914L32.0261 17.929L36.0521 20.253L35.0521 21.986L30.0261 19.083L24.0261 22.547L30.0271 26.012L35.0521 23.11L36.0521 24.842L32.0261 27.166L35.5171 29.182L34.5171 30.914L31.0261 28.899V33.548H29.0261V27.744L23.0261 24.279V31.208L28.0521 34.11L27.0521 35.842L23.0261 33.517V37.548H21.0261V33.517L17.0001 35.842L16.0001 34.11L21.0261 31.208V24.279L15.0261 27.743V33.548H13.0261V28.898L9.53606 30.914L8.53606 29.182L12.0251 27.166L8.00006 24.842L9.00006 23.11L14.0251 26.011L20.0251 22.547L14.0261 19.083L9.00006 21.986L8.00006 20.253L12.0261 17.929L8.53606 15.914L9.53606 14.182L13.0261 16.196V11.548H15.0261V17.351L21.0261 20.815V13.887L16.0001 10.986L17.0001 9.253L21.0261 11.578V7.548H23.0261Z" fill={`${selectedDevice.mode === 'cool' ? '#4472C4' : ''}`}></path> </g></svg>
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <div className="flex gap-2 h-10 items-center mx-auto">
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

                            {selectedDeviceCheck !== 'ac' &&
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
                                </div>
                            }

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
                        <div className="flex justify-end gap-2 mt-4">
                            <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={closeDeviceModal}>Cancel</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={closeDeviceModal}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {showModalAddgroup && (
                <div className="fixed z-[99999] inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg w-1/2 gap-1">
                        <div className="flex justify-between">
                            <h3 className="text-xl font-semibold">Add Device</h3>
                        </div>
                        <div className="divider mt-2"></div>
                        <div className="flex gap-2">
                            <label htmlFor="" className="grid w-full">
                                Group Name :
                                <input type="text" value={showDeviceGropAdd.GroupName} className="border rounded-md px-2 py-1 w-full" />
                            </label>
                        </div>
                        <div className="grid gap-2 my-3">
                            List of equipment within Group : {showDeviceGropAdd.GroupName} ({devices[selectedDeviceCheck].length})
                            <div className="grid grid-cols-3 my-3">
                                {(devices[selectedDeviceCheck] || []).map((device) => {
                                    // const device = devices.find((d) => d.id === deviceId);
                                    return (

                                        <div key={device.id} className="flex gap-2 justify-center items-center h-[7vh] border p-2">
                                            <img src={device.img} alt={device.name} className="w-15 h-15" />
                                            <div className="">
                                                <p>{device.name}</p>
                                                {selectedDeviceCheck === 'ac' ?
                                                    <div className="grid text-sm">
                                                        <p className="flex gap-1 items-center">
                                                            <img src="../icon/computer-fan-svgrepo-com.svg" className="w-4 h-4" alt="" /> {device.DeviceID}
                                                        </p>
                                                    </div>
                                                    :
                                                    <div className="grid text-sm">
                                                        <p className="flex gap-1 items-center">
                                                            <img src="../icon/computer-fan-svgrepo-com.svg" className="w-4 h-4" alt="" /> {device.speed} speed
                                                        </p>
                                                        <p className="flex gap-1 items-center">
                                                            <img src="../icon/pressure-alt-svgrepo-com.svg" className="w-4 h-4" alt="" /> {device.pressureDrop}%
                                                        </p>
                                                    </div>
                                                }
                                            </div>
                                        </div>

                                    );
                                })}
                            </div>
                            Equipment list not included in group ({devicesUnuse[selectedDeviceCheck].length})
                            <div className="grid grid-cols-1 my-3">
                                {(devicesUnuse[selectedDeviceCheck] || []).map((device) => {
                                    return (
                                        <div className="flex justify-between h-[7vh] border p-2">
                                            <div key={device.id} className="flex gap-2 justify-start items-center ">
                                                <img src={device.img} alt={device.name} className="w-15 h-15" />
                                                <div className="">
                                                    <p>{device.name}</p>
                                                    {selectedDeviceCheck === 'ac' ?
                                                        <div className="grid text-sm">
                                                            <p className="flex gap-1 items-center">
                                                                <img src="../icon/computer-fan-svgrepo-com.svg" className="w-4 h-4" alt="" /> {device.DeviceID}
                                                            </p>
                                                        </div>
                                                        :
                                                        <div className="grid text-sm">
                                                            <p className="flex gap-1 items-center">
                                                                <img src="../icon/computer-fan-svgrepo-com.svg" className="w-4 h-4" alt="" /> {device.speed} speed
                                                            </p>
                                                            <p className="flex gap-1 items-center">
                                                                <img src="../icon/pressure-alt-svgrepo-com.svg" className="w-4 h-4" alt="" /> {device.pressureDrop}%
                                                            </p>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex justify-center items-center pr-2">
                                                <input type="checkbox" />
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={closeDeviceModal}>Cancel</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={closeDeviceModal}>Add device</button>
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
                                    const device = (devices[selectedDeviceCheck] || []).find((d) => d.id === deviceId);
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
