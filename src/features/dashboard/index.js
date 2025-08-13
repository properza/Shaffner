import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import FaceSmileIcon from '@heroicons/react/24/outline/FaceSmileIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import { showNotification } from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import { useState, useEffect } from 'react'
import axios from 'axios'
import TitleCard from '../../components/Cards/TitleCard'
import TitleCard2 from '../../components/Cards/TitileCard2'

const devices = [
    { id: 1, img: '../image/airMock.png', name: 'Daikin CX01', location: 'Building A - F1', status: 'Online' },
    { id: 2, img: '../image/airMock.png', name: 'Samsung AC-02', location: 'Building B - F2', status: 'Online' },
    { id: 3, img: '../image/airMock.png', name: 'Mitsubishi MX', location: 'Building A - F1', status: 'Online' },
    { id: 4, img: '../image/airMock.png', name: 'Panasonic XZ', location: 'Building A - F3', status: 'Online' },
    { id: 5, img: '../image/airMock.png', name: 'LG L05', location: 'Building B - F1', status: 'Online' },
];

const AirQualityProgressBar = ({ value }) => {
    const radius = 50;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    const airQualityData = [
        { range: '0-50', description: 'Air quality is good.', color: '#01E400' },
        { range: '51-100', description: 'Air quality is acceptable.', color: '#FFFF00' },
        { range: '101-150', description: 'Sensitive groups may be affected by health effects.', color: '#FF7E00' },
        { range: '151-200', description: 'Some people may have their health affected.', color: '#FE0000' },
        { range: '201-300', description: 'Health warnings about health risks and impacts.', color: '#98004B' },
        { range: '301-500', description: 'Health Alert Emergency.', color: '#7E0123' }
    ];

    const getColorForValue = (value) => {
        for (const item of airQualityData) {
            const [min, max] = item.range.split('-').map(Number);
            if (value >= min && value <= max) {
                return item.color;
            }
        }
        return '#ccc';
    };

    const color = getColorForValue(value);

    const d = `
      M 10,60 
      A 50,50 0 1,1 110,60
    `;

    return (
        <div className="flex justify-center items-center relative">
            <svg width="250" height="80" viewBox="0 0 120 60" className="rotate-0">
                <path
                    d={d}
                    stroke="#ccc"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                <path
                    d={d}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform="rotate(-90 60 60)"
                />
            </svg>
            <div className="absolute text-white text-sm bottom-0 grid">
                <p className='flex items-center gap-1'><p className='text-xl'>{value}</p> ug/m³</p>
                <div className={`flex gap-1 justify-center`} style={{ color: getColorForValue(value) }}><div className="w-5 h-5"><FaceSmileIcon /></div>LOW</div>
            </div>
        </div>
    );
};

function Dashboard() {

    const dispatch = useDispatch()
    const [activeBtn, setActiveBtn] = useState('all') // all , Ba , Bb
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDevices = devices.filter(device =>
        device.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggle = () => setIsOpen(!isOpen);
    const toggle2 = () => setIsOpen2(!isOpen2);

    const apiKey = '1083dbf85e504f04b8191154251208';
    const city = 'Bangkok';

    useEffect(() => {
        axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
            .then(response => {
                setWeatherData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching weather data', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!weatherData) {
        return <div>Error loading weather data</div>;
    }

    const dayOfWeek = new Date().toLocaleString('en-US', { weekday: 'long' });
    const Mounth = new Date().toLocaleString('en-US', { month: 'long' });
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0'); // Pad day with leading zero if needed
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const temperature = weatherData.current.temp_c;
    const icon = weatherData?.current?.condition?.icon;

    const updateDashboardPeriod = (newRange) => {
        dispatch(showNotification({ message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status: 1 }))
    }

    const airQualityData = [
        { range: '0-50', description: 'Air quality is good.', color: '#01E400' },
        { range: '51-100', description: 'Air quality is acceptable.', color: '#FFFF00' },
        { range: '101-150', description: 'Sensitive groups may be affected by health effects.', color: '#FF7E00' },
        { range: '151-200', description: 'Some people may have their health affected.', color: '#FE0000' },
        { range: '201-300', description: 'Health warnings about health risks and impacts.', color: '#98004B' },
        { range: '301-500', description: 'Health Alert Emergency.', color: '#7E0123' }
    ];

    const iconHu = <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0045 2.17072C11.2323 1.90491 12.7555 1.9182 14.8283 2.43512C15.1855 2.52419 15.4026 2.88527 15.3133 3.24161C15.2241 3.59794 14.8621 3.8146 14.5049 3.72553C12.5778 3.24495 11.2677 3.25831 10.2873 3.47058C9.30375 3.68349 8.59675 4.10578 7.84775 4.56242L7.79168 4.59663C7.06968 5.0371 6.27018 5.52486 5.2139 5.70046C4.11831 5.88259 2.82409 5.72157 1.08597 5.02791C0.744128 4.89149 0.577864 4.50445 0.714614 4.16342C0.851361 3.82239 1.23934 3.65653 1.58118 3.79295C3.17631 4.42953 4.21538 4.51799 4.99475 4.38843C5.786 4.2569 6.38923 3.89277 7.15248 3.42746C7.90341 2.96963 8.77968 2.43587 10.0045 2.17072Z" fill="white" />
        <path d="M14.8283 5.09539C12.7555 4.57848 11.2323 4.56519 10.0045 4.83099C8.77968 5.09615 7.90341 5.62991 7.15248 6.08773C6.38923 6.55305 5.786 6.91718 4.99475 7.04871C4.21538 7.17825 3.17631 7.08978 1.58118 6.45323C1.23934 6.31681 0.851361 6.48267 0.714614 6.82371C0.577864 7.16472 0.744128 7.55178 1.08597 7.68818C2.82409 8.38185 4.11831 8.54285 5.2139 8.36071C6.27018 8.18512 7.06968 7.69738 7.79168 7.25691L7.84775 7.22271C8.59675 6.76605 9.30375 6.34377 10.2873 6.13085C11.2677 5.91859 12.5778 5.90523 14.5049 6.3858C14.8621 6.47487 15.2241 6.25822 15.3133 5.90188C15.4026 5.54555 15.1855 5.18447 14.8283 5.09539Z" fill="white" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6666 6.68445C12.4351 6.68445 12.2423 6.80398 12.1077 6.98485C12.0604 7.04871 11.9511 7.19818 11.806 7.40738C11.6129 7.68558 11.3545 8.07218 11.095 8.50371C10.8367 8.93311 10.5703 9.41871 10.3664 9.89318C10.1712 10.3476 9.99934 10.841 10 11.3412C10.0005 11.4816 10.0173 11.6226 10.0403 11.7608C10.0789 11.9915 10.1571 12.3091 10.3203 12.6348C10.4849 12.9631 10.7421 13.3116 11.1405 13.5766C11.5431 13.8443 12.0499 14 12.6666 14C13.2833 14 13.7901 13.8443 14.1926 13.5766C14.591 13.3116 14.8483 12.9631 15.0129 12.6348C15.1761 12.3091 15.2544 11.9915 15.2929 11.7609C15.3161 11.6225 15.3331 11.481 15.3333 11.3405C15.3335 10.8403 15.1621 10.3476 14.9668 9.89318C14.763 9.41871 14.4965 8.93311 14.2383 8.50371C13.9787 8.07218 13.7203 7.68558 13.5272 7.40738C13.3821 7.19818 13.2727 7.04871 13.2255 6.98485C13.0909 6.80398 12.898 6.68445 12.6666 6.68445ZM13.7413 10.4172C13.5702 10.0188 13.3367 9.58991 13.0949 9.18805C12.9479 8.94365 12.8005 8.71351 12.6666 8.51165C12.5327 8.71351 12.3853 8.94365 12.2383 9.18805C11.9966 9.58991 11.7631 10.0188 11.5919 10.4172L11.5822 10.4397C11.4644 10.7136 11.3252 11.0375 11.3335 11.3401C11.3415 11.5794 11.4059 11.8265 11.5129 12.04C11.5983 12.2105 11.7161 12.3608 11.8801 12.4699C12.0401 12.5762 12.2833 12.6699 12.6666 12.6699C13.0499 12.6699 13.2931 12.5762 13.4531 12.4699C13.6171 12.3608 13.7349 12.2104 13.8203 12.04C13.9273 11.8265 13.9918 11.5794 13.9998 11.34C14.0081 11.0376 13.8689 10.7137 13.7511 10.4398L13.7413 10.4172Z" fill="white" />
        <path d="M9.41981 7.68718C9.92667 7.52312 10.3153 8.05065 10.0769 8.52612C9.96807 8.74338 9.84561 8.92825 9.60214 9.01425C8.95074 9.24439 8.41114 9.56845 7.84774 9.91192L7.79167 9.94612C7.06967 10.3866 6.27018 10.8743 5.2139 11.0499C4.11831 11.2321 2.8241 11.0711 1.08597 10.3774C0.744127 10.241 0.577865 9.85392 0.714613 9.51292C0.851367 9.17185 1.23934 9.00598 1.58119 9.14245C3.17631 9.77898 4.21539 9.86745 4.99475 9.73792C5.786 9.60638 6.38923 9.24225 7.15247 8.77692C7.87781 8.33472 8.62427 7.94472 9.41981 7.68718Z" fill="white" />
    </svg>;

    const wildprogressBar = "45"

    return (
        <>
            <div className="flex justify-between items-center mb-5">
                <div className='flex'>
                    <div className="pr-6 border-r-[2px] border-gray-400">
                        <p className='text-blue-500 font-bold text-2xl'>DashBoard</p>
                    </div>
                    <div className="pl-6 flex gap-3">
                        <button className={`rounded-md p-2 text-white ${activeBtn === 'all' ? 'bg-[#6791FF]' : 'bg-[#BCBCBC]'}`} onClick={() => setActiveBtn('all')}>All Building</button>
                        <button className={`rounded-md p-2 text-white ${activeBtn === 'Ba' ? 'bg-[#6791FF]' : 'bg-[#BCBCBC]'}`} onClick={() => setActiveBtn('Ba')}>Building A</button>
                        <button className={`rounded-md p-2 text-white ${activeBtn === 'Bb' ? 'bg-[#6791FF]' : 'bg-[#BCBCBC]'}`} onClick={() => setActiveBtn('Bb')}>Building B</button>

                    </div>
                </div>
                <p className='bg-base-100 shadow-xl p-2 rounded-lg'>{formattedDate}</p>
            </div>

            <div className="flex gap-1">
                {/* LEFT */}
                <div className="flex flex-col gap-2">
                    <div className="bg-[#191958] rounded-md p-2">
                        <div className="flex justify-center gap- pl-2 items-center">
                            <div className='mr-4'>
                                <p className="text-white font-bold text-xl">{dayOfWeek}</p>
                                <p className="text-white">{`Time: ${time}`}</p>
                                <p className='text-white font-bold text-4xl mt-2'>{`${temperature}°C`}</p>
                                <p className='text-white '>temperature</p>
                            </div>
                            <div className="flex items-center justify-center">
                                <img src={`${icon}`} className="w-36 h-36 mx-auto" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#191958] rounded-md p-2">
                        <div className="flex-col items-center">
                            <div className="flex items-center gap-1">
                                {iconHu}
                                <p className="text-white text-xl">Humidity: {wildprogressBar}%</p>
                            </div>
                            <div className="w-full bg-gray-300 rounded-full h-2 my-3">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${wildprogressBar}%` }}></div>
                            </div>
                            <div className="flex justify-between text-white items-center text-center">
                                <p>0%</p>
                                <p>25%</p>
                                <p>50%</p>
                                <p>75%</p>
                                <p>100%</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#191958] rounded-md p-2">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-1">
                                {/* Icon for Humidity */}
                                {iconHu}<p className="text-white text-xl">Air Quality</p>
                            </div>
                            <div className="text-white">
                                PM2.5 (ug/m3)
                            </div>
                        </div>

                        <div className="my-4">
                            <AirQualityProgressBar value={wildprogressBar} color={'red'} />
                        </div>
                    </div>

                    <div className="bg-[#191958] rounded-md p-2 grid">
                        <table className='table '>
                            <tbody>
                                {airQualityData.map((item, index) => (
                                    <tr key={index}>
                                        <td className={`text-white font-bold`}>
                                            {item.range} {item.description}
                                        </td>
                                        <td className='border-l'>
                                            <div style={{ backgroundColor: item.color }} className='rounded-full w-3 h-3'></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* MIDDLE */}
                <div className="flex-col gap-2 w-3/4 mx-2">
                    <TitleCard2 topMargin={'my-0'} title={'Overall'} title2={'The system will display a list of all equipment along with information on electricity costs incurred in Building A and Building B.'}>
                        <div className="my-3 flex justify-between gap-3">
                            <div className="bg-[#E1E9FF] rounded-lg grid gap-2 justify-center w-full items-center text-center p-2">
                                <div className="bg-[#6791FF] rounded-full w-12 h-12 flex justify-center items-center mb-2 mx-auto"><img src="../icon/device-wifi-share-svgrepo-com.svg" alt="" className='h-8 w-8' /></div>

                                <p className='text-xl font-bold'>44</p>
                                <p className='font-semibold'>All Device</p>
                                <p className='text-[#4472C4] text-sm'>Includes All Device</p>
                            </div>
                            <div className="bg-[#E9F2E3] rounded-lg grid gap-2 justify-center w-full items-center text-center p-2">
                                <div className="bg-[#91BF6B] rounded-full w-12 h-12 flex justify-center items-center mb-2 mx-auto"><img src="../icon/smart-home-svgrepo-com.svg" alt="" className='h-6 w-6' /></div>

                                <p className='text-xl font-bold'>26</p>
                                <p className='font-semibold'>All Device</p>
                                <p className='text-[#4472C4] text-sm'>Includes All Device</p>
                            </div>
                            <div className="bg-[#FCE3D5] rounded-lg grid gap-2 justify-center w-full items-center text-center p-2">
                                <div className="bg-[#FA702A] rounded-full w-12 h-12 flex justify-center items-center mb-2 mx-auto"><img src="../icon/iot-platform-svgrepo-com.svg" alt="" className='h-6 w-6' /></div>

                                <p className='text-xl font-bold'>18</p>
                                <p className='font-semibold'>All Device</p>
                                <p className='text-[#4472C4] text-sm'>Includes All Device</p>
                            </div>
                            <div className="bg-[#FBEFC3] rounded-lg grid gap-2 justify-center w-full items-center text-center p-2">
                                <div className="bg-[#FFDF6D] rounded-full w-12 h-12 flex justify-center items-center mb-2 mx-auto"><img src="../icon/energy-svgrepo-com.svg" alt="" className='h-8 w-8' /></div>

                                <p className='text-xl font-bold'>16,796.8 ฿</p>
                                <p className='font-normal text-sm'>Electricity bill for</p>
                                <p className='font-normal text-sm'>The month: {Mounth}</p>
                            </div>
                        </div>

                    </TitleCard2>
                    <BarChart />
                </div>
                {/* RIGHT */}
                <div className="flex-col gap-2 w-2/4">
                    <TitleCard2 title={'Total Energy Consumption'} topMargin={'m-0'}>
                        <div className="">
                            <div className="flex justify-between text-sm">
                                <p>Building A</p>
                                <div className="flex gap-1">
                                    <p className='font-semibold'>Month: </p>
                                    <p className='text-[#4472C4]'>{Mounth}</p>
                                </div>
                            </div>

                            {/* Toggle Button */}
                            <div className="flex justify-between items-center mt-2">
                                <button
                                    onClick={toggle}
                                    className="text-sm text-[#4472C4] font-semibold flex items-center gap-2 justify-between w-full">
                                    <span className='text-[#F08D01] flex text-2xl'><img src="../icon/icon.svg" alt="" className='h-8 w-8' /> 3,500.5 kwh</span>
                                    <svg
                                        className={`w-6 h-6 transform ${isOpen ? 'rotate-180' : ''}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="#F08D01">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Toggle Content */}
                            {isOpen && (
                                <div className="mt-4 text-sm text-gray-700 grid gap-1">
                                    <div className="flex bg-[#F08D0129] border border-[#F08D01] rounded-md justify-between p-1">
                                        <p>Floor 1</p>
                                        <p>875.13 Kw</p>
                                    </div>
                                    <div className="flex bg-[#F08D0129] border border-[#F08D01] rounded-md justify-between p-1">
                                        <p>Floor 2</p>
                                        <p>1,050.15 Kw</p>
                                    </div>
                                    <div className="flex bg-[#F08D0129] border border-[#F08D01] rounded-md justify-between p-1">
                                        <p>Floor 3</p>
                                        <p>1,575.23 Kw</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="divider my-3"></div>

                        <div className="">
                            <div className="flex justify-between text-sm">
                                <p>Building A</p>
                                <div className="flex gap-1">
                                    <p className='font-semibold'>Month: </p>
                                    <p className='text-[#4472C4]'>{Mounth}</p>
                                </div>
                            </div>

                            {/* Toggle Button */}
                            <div className="flex justify-between items-center mt-2">
                                <button
                                    onClick={toggle2}
                                    className="text-sm text-[#4472C4] font-semibold flex items-center gap-2 justify-between w-full">
                                    <span className='text-[#F08D01] flex text-2xl'><img src="../icon/icon.svg" alt="" className='h-8 w-8' /> 384.5 kwh</span>
                                    <svg
                                        className={`w-6 h-6 transform ${isOpen ? 'rotate-180' : ''}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="#F08D01">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Toggle Content */}
                            {isOpen2 && (
                                <div className="mt-4 text-sm text-gray-700 grid gap-1">
                                    <div className="flex bg-[#F08D0129] border border-[#F08D01] rounded-md justify-between p-1">
                                        <p>Floor 1</p>
                                        <p>875.13 Kw</p>
                                    </div>
                                    <div className="flex bg-[#F08D0129] border border-[#F08D01] rounded-md justify-between p-1">
                                        <p>Floor 2</p>
                                        <p>1,050.15 Kw</p>
                                    </div>
                                    <div className="flex bg-[#F08D0129] border border-[#F08D01] rounded-md justify-between p-1">
                                        <p>Floor 3</p>
                                        <p>1,575.23 Kw</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="divider my-3"></div>
                        <div className="">
                            <div className="grid gap-1">
                                <div className="flex justify-between">
                                    <p className='text-xl font-semibold'>List og Building Device</p>
                                    <p className='py-1 px-2 text-white bg-[#166B19] rounded-md font-semibold'>Online {devices.length}</p>
                                </div>
                                <input
                                    type="text"
                                    placeholder='Search Device'
                                    value={searchTerm}
                                    className='border p-1 rounded-md'
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className=" overflow-auto h-[30rem]">
                                {filteredDevices.map((device) => (
                                    <div key={device.id} className='my-1'>
                                        <div className="flex gap-2 items-center w-full">
                                            <img src={device.img} alt="Device" className="w-8 h-8" />
                                            <div className='flex justify-between w-full '>
                                                <div className="flex gap-2">
                                                    <p className="font-semibold">{device.name}</p>
                                                    <p className="text-sm">{device.location}</p>
                                                </div>
                                                <div className="">
                                                    {device.status === 'Online' ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#166B19" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                        </svg> :
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                        </svg>

                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TitleCard2>
                </div>
            </div>
        </>
    )
}

export default Dashboard