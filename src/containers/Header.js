import { themeChange } from 'theme-change'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BellIcon from '@heroicons/react/24/outline/BellIcon'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'
import { openRightDrawer } from '../features/common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../utils/globalConstantUtil'
import { setSelectedBuilding, setSelectedFloor } from '../app/slices/dataSlice'
import { NavLink, Routes, Link, useLocation } from 'react-router-dom'


function Header() {

    const dispatch = useDispatch()
    const { noOfNotifications, pageTitle } = useSelector(state => state.header)
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"))

    const { selectedBuilding, selectedFloor } = useSelector((state) => state.data);

    const handleBuildingChange = (e) => {
        const building = e.target.value;
        dispatch(setSelectedBuilding(building));
    };

    const handleFloorChange = (e) => {
        const floor = e.target.value;
        dispatch(setSelectedFloor(floor));
    };

    useEffect(() => {
        themeChange(false)
        if (currentTheme === null) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setCurrentTheme("dark")
            } else {
                setCurrentTheme("light")
            }
        }
    }, [])

    const openNotification = () => {
        dispatch(openRightDrawer({ header: "Notifications", bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION }))
    }

    function logoutUser() {
        localStorage.clear();
        window.location.href = '/'
    }

    const name = "บุญศรี ใจดี"
    const email = "admin@mail.co"

    return (
        <>
            <div className="navbar sticky top-0 bg-base-100 z-10 shadow-md gap-4">
                {pageTitle === 'Leads' &&

                    <div className="flex-1 gap-2 border-r pr-4">
                        <select
                            name="building"
                            id="building"
                            className='border py-1 px-2 rounded-md'
                            onChange={handleBuildingChange}
                        >
                            <option value="Zone A">Building A</option>
                            <option value="Zone B">Building B</option>
                        </select>
                        <select
                            name="floor"
                            id="floor"
                            className='border py-1 px-2 rounded-md'
                            onChange={handleFloorChange}
                        >
                            {selectedBuilding === "Zone A" ? (
                                <>
                                    <option value="1">Floor 1</option>
                                    <option value="2">Floor 2</option>
                                    <option value="3">Floor 3</option>
                                </>
                            ) : (
                                <>
                                    <option value="1">Floor 1</option>
                                    <option value="2">Floor 2</option>
                                </>
                            )}
                        </select>
                    </div>

                }
                {/* <div className="flex"> */}
                <input type="text" placeholder='Search Sensore' className='border rounded-lg p-2 w-full' />
                {/* </div> */}



                <div className="flex">

                    {/* Light and dark theme selection toogle **/}
                    <label className="swap ">
                        <input type="checkbox" />
                        <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 " + (currentTheme === "dark" ? "swap-on" : "swap-off")} />
                        <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 " + (currentTheme === "light" ? "swap-on" : "swap-off")} />
                    </label>


                    {/* Notification icon */}
                    {/* <button className="btn btn-ghost ml-4  btn-circle" onClick={() => openNotification()}>
                    <div className="indicator">
                        <BellIcon className="h-6 w-6"/>
                        {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null }
                    </div>
                </button> */}


                    {/* Profile icon, opening menu on click */}
                    <div className="dropdown dropdown-end ml-4">
                        <div className="flex justify-center items-center gap-1">
                            <label tabIndex={0} className="avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://placehold.co/600x400" alt="profile" />
                                </div>
                            </label>
                            <div className="text-sm">
                                <p>{name}</p>
                                <p>{email}</p>
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="justify-between">
                                <Link to={'/app/profile'}>
                                    Edit Profile
                                </Link>
                            </li>
                            <div className="divider mt-0 mb-0"></div>
                            <li><a onClick={logoutUser}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Header