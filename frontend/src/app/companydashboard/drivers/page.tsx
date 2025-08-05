"use client";
import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import Avatar from "../../assets/avatar.png"
import { DriversInfo } from '@/app/component/Drivers';
import { DriverProfile } from '@/app/component/DriverProfile';
import DriverRegistrationForm from '@/app/component/DriverForm';
import { IoIosHome } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";
import { MdOutlineForwardToInbox } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { useUserStore } from '@/app/component/zustand';
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { MdLocalShipping } from 'react-icons/md';
import Image from 'next/image';
import axios from 'axios';
import { set } from 'zod/v4-mini';
export interface DriverResponse {
    id: string;
    name: string;
    phoneNumber: string;
    licenseNumber: string;
    type: string;
    dateOfJoining: string; // ISO date string
    companyId: string;
    aadharNumber: string;
    panNumber: string;

}

const Drivers = () => {
    const [active, setActive] = React.useState("drivers");
    const [showForm, setShowForm] = React.useState(false);
    const registrationRef = React.useRef<HTMLDivElement>(null);
    const [drivers, setDrivers] = React.useState<DriverResponse[]>([]);
    const [activeDriver, setActiveDriver] = React.useState("");
    const token = useUserStore((state) => state.token);
    const [viewMore, setviewMore] = React.useState(false);

    const tabs = [
        {
            label: "Dashboard",
            key: "",
            icon: <IoIosHome size={30} fill={active === "" ? "#27BBF5" : "grey"} />,
        },
        {
            label: "Drivers",
            key: "drivers",
            icon: <FaUserTie size={30} color={active === "drivers" ? "#27BBF5" : "grey"} />,
        },
        {
            label: "Delivery",
            key: "delivery",
            icon: <MdLocalShipping size={30} color={active === "delivery" ? "#27BBF5" : "grey"} />,
        },


        {
            label: "Report",
            key: "report",
            icon: <MdOutlineReportProblem size={30} color={active === "report" ? "#27BBF5" : "grey"} />,
        },
        {
            label: "Tracking",
            key: "tracking",
            icon: <MdOutlineForwardToInbox size={30} color={active === "tracking" ? "#27BBF5" : "grey"} />, // Placeholder
        },
        {
            label: "Vehicle",
            key: "vehicle",
            icon: <FaTruck size={30} color={active === "vehicle" ? "#27BBF5" : "grey"} />, // 🚚 Vehicle icon
        },
        {
            label: "Report",
            key: "report",
            icon: <MdOutlineReportProblem size={30} color={active === "report" ? "#27BBF5" : "grey"} />,
        },
        {
            label: "Settings",
            key: "settings",
            icon: <IoSettingsSharp size={30} color={active === "settings" ? "#27BBF5" : "grey"} />,
        },
    ];

    const handleActivity = (key: string, route: string) => {
        setActive(key);
        if (route) {
            window.location.href = route;
        }
    };
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                registrationRef.current &&
                !registrationRef.current.contains(event.target as Node)
            ) {
                setShowForm(false); // hide the form when clicking outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });


    React.useEffect(() => {

        async function getDrivers(token: string) {
            if (!token) return;

            try {
                const response = await axios.get("http://localhost:8080/driver/myDrivers", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    withCredentials: true
                });

                console.log(response.data);
                setDrivers(response.data);

            } catch (error) {
                console.log(error);

            }

        };

        getDrivers(token.toString());



    }, [token]);



    const getMyDrivers = async () => {

    };
    const driver = drivers.filter((driver) => {
        return driver.id == activeDriver;
    });


    return (

        <div className='flex flex-row w-full'>

            <div className="p-4 w-full max-w-[400px] border-2">
                <h1 className="text-3xl font-handwriting font-extrabold">Meat Truck</h1>

                <div className="mt-4 p-2">
                    <h1>Menu</h1>

                    <div className="flex flex-col gap-4">
                        {tabs.map((tab, index) => (
                            <div
                                key={index}
                                onClick={() => handleActivity(tab.key, `/companydashboard/${tab.key}`)}
                                className={`flex flex-row gap-4 p-2 rounded-2xl max-w-[200px] items-center cursor-pointer ${active === tab.key ? "bg-blue-100" : "bg-white"
                                    }`}
                            >
                                {tab.icon}
                                <p className={`font-bold ${active === tab.key ? "text-blue-500" : "text-gray-500"}`}>
                                    {tab.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='w-full'>

                <div className='p-2 flex flex-row justify-between w-full border-2'>
                    <div className=''>
                        <input type="text" placeholder='     Search..' className='  px-6 py-3 focus:ring-blue-500 border-2' />

                    </div>
                    <div className='flex flex-row gap-4 items-center'>
                        <IoFilterSharp size={32} className='cursor-pointer' />

                        <button className='flex flex-row gap-2 p-2 cursor-pointer' onClick={() => setShowForm(true)}>
                            <FaPlus size={30} className='cursor-pointer' />
                            <p>Add Driver</p>
                        </button>

                        <Image src={Avatar.src} alt="avatar" width={50} height={50} className='w-[40px] h-[40px] cursor-pointer' />
                        <div>

                        </div>

                    </div>


                </div>

                <div className='flex flex-row w-full'>
                    <div className='w-full'>

                        {
                            drivers.length > 0 ? (
                                <div>
                                    <div className='flex flex-col gap-2 max-w-[400px] xl:max-w-[600px]'>


                                        <div className='flex flex-row justify-between xl:max-w-[600px] max-w-[400px] mt-3'>
                                            <p className=''>Company/Name</p>
                                            <p className=''>Status</p>

                                        </div>
                                        <div className='bg-gray-200 h-[50px] p-2 max-w-[400px] xl:max-w-[600px]' onClick={() => setviewMore(!viewMore)}>



                                            {viewMore ? (
                                                <div className='flex flex-row items-center justify-center gap-2.5'>
                                                    <IoIosArrowDropup size={24} className='' />
                                                    <p className='font-black cursor-pointer'>View Less</p>
                                                </div>
                                            ) : (
                                                <div className='flex flex-row items-center justify-center gap-2.5'>
                                                    <IoIosArrowDropdown size={24} />
                                                    <p className='font-black cursor-pointer'>View More</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className='p-3 '>
                                            {drivers.map((item, index) => (
                                                <div key={index} className='p-4 rounded-lg bg-green-100 hover:bg-gray-100 cursor-pointer ' onClick={() => setActiveDriver(item.id)}>
                                                    <div className='flex flex-row justify-between'>
                                                        <p>{item.name}</p>
                                                        <p>......</p>
                                                        <p>{item.phoneNumber}</p>
                                                        <p>{item.name}</p>

                                                    </div>

                                                </div>
                                            ))}

                                        </div>
                                    </div>





                                </div>
                            ) : (
                                <p>No drivers found</p>
                            )
                        }


                    </div>
                    {
                        drivers.length > 0 && (
                            <div className='w-full'>
                                <DriverProfile driver={drivers[0]} />

                            </div>

                        )
                    }

                </div>

                <div className='absolute top-32 left-1/4 z-50 bg-white border-2 p-4 rounded shadow-xl' ref={registrationRef}>
                    {showForm && <DriverRegistrationForm />}
                </div>


            </div>
        </div>





    );
};

export default Drivers;
