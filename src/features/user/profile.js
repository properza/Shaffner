import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Profile() {

    const name = "บุญศรี ใจดี"
    const email = "admin@mail.co"
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className='bg-base-100 rounded-md min-h-screen p-2'>
            <p className='text-2xl font-bold text-[#1D24A1]'>Profile</p>
            <div className="">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <label tabIndex={0} className="avatar">
                        <div className="w-20 rounded-full">
                            <img src="https://placehold.co/600x400" alt="profile" />
                        </div>
                    </label>
                    <div className="text-lg">
                        <p>{name}</p>
                        <p>{email}</p>
                    </div>
                </div>
                <div className="grid gap-3 w-1/2 mx-auto">
                    <div className="flex gap-3 w-full">
                        <label htmlFor="" className='grid w-full'>
                            First Name
                            <input type="text" name="First_Name" id="" className='border border-gray-400 px-3 py-1 rounded-md w-full' />
                        </label>
                        <label htmlFor="" className='grid w-full'>
                            Last name
                            <input type="text" name="Last_name" id="" className='border border-gray-400 px-3 py-1 rounded-md w-full' />
                        </label>
                    </div>
                    <label htmlFor="" className='grid'>
                        Company
                        <input type="text" name="Company" id="" className='border border-gray-400 px-3 py-1 rounded-md w-full' />
                    </label>
                    <label htmlFor="" className='grid'>
                        Contact number
                        <input type="tel" name="Contact number" id="" className='border border-gray-400 px-3 py-1 rounded-md w-full' />
                    </label>
                    <label htmlFor="" className='grid'>
                        Email
                        <input type="email" name="Email" id="" className='border border-gray-400 px-3 py-1 rounded-md w-full' />
                    </label>

                    {/* Password */}
                    <label htmlFor="" className='grid'>
                        Password
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="Password"
                                id=""
                                className='border border-gray-400 px-3 py-1 rounded-md w-full'
                            />
                            {/* Icon for show/hide password */}
                            <span
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            >
                                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                            </span>
                        </div>
                    </label>

                    {/* Confirm password */}
                    <label htmlFor="" className='grid'>
                        Confirm password
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="Confirm password"
                                id=""
                                className='border border-gray-400 px-3 py-1 rounded-md w-full'
                            />
                            {/* Icon for show/hide password */}
                            <span
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            >
                                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                            </span>
                        </div>
                    </label>
                    <Link to={'/app/dashboard'}><div className='bg-[#4472C4] p-2 text-center hover:bg-blue-300 rounded-md text-base-100 mt-3'>แก้ไขข้อมูล</div></Link>
                </div>
            </div>
        </div>
    )
}
