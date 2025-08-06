"use client";
import React from 'react';
import { IoIosHome } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";
import { MdOutlineForwardToInbox } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLocalShipping } from 'react-icons/md';
import Map from '@/app/component/Map';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useUserStore } from '@/app/component/zustand';
export interface DeliveryDetailDTO {
    deliveryId: string;          // UUID as string
    origin: string;
    destination: string;
    expectedTime: string;        // ISO timestamp (or Date if parsed)
    driverName: string;
    vehicleNumber: string;
    companyName: string;
}

const TrackingDashBoard = () => {
    const [active, setActive] = React.useState("tracking");
    const [origin, setOrigin] = React.useState('');
    const [destination, setDestination] = React.useState('');
    const searchParam = useSearchParams();
    const deliverId = searchParam.get("deliveryId");
    const token = useUserStore((state) => state.token);


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
            icon: <MdOutlineForwardToInbox size={30} color={active === "tracking" ? "#27BBF5" : "grey"} />,
        },
        {
            label: "Vehicle",
            key: "vehicle",
            icon: <FaTruck size={30} color={active === "vehicle" ? "#27BBF5" : "grey"} />,
        },
        {
            label: "Settings",
            key: "settings",
            icon: <IoSettingsSharp size={30} color={active === "settings" ? "#27BBF5" : "grey"} />,
        },
    ];


    async function getDeliveryById(deliveryId: string, token: string) {
        try {
            const response = await axios.get<DeliveryDetailDTO>(`http://localhost:8080/delivery/${deliveryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true
            });
            console.log('Delivery Details:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching delivery by ID:', error);
            throw error;
        }
    }
    const handleActivity = (key: string, route: string) => {
        setActive(key);
        if (route) {
            window.location.href = route;
        }

    };

    React.useEffect(() => {
        if (deliverId) {
            getDeliveryById(deliverId, token).then((data) => {
                setOrigin(data.origin);
                setDestination(data.destination);
            });
        }
    }, [deliverId, token]);


    return (
        <div className='flex flex-row gap-4 w-full'>
            <div className='p-4 w-full '>
                <h1 className="text-3xl font-handwriting font-extrabold text-blue-700">FleetOps</h1>


                <div className='mt-4 p-2'>
                    <h1>Menu</h1>

                    <div className="flex flex-col gap-4">
                        {tabs.map((tab, index) => (
                            <div
                                key={index}
                                onClick={() => handleActivity(tab.key, `/companydashboard/${tab.key}`)}
                                className={`flex flex-row gap-4 p-2 rounded-2xl max-w-[200px] items-center 
                                cursor-pointer
          ${active === tab.key ? 'bg-blue-100' : 'bg-white'}`}
                            >
                                {tab.icon}
                                <p className={`font-bold ${active === tab.key ? 'text-blue-500' : 'text-gray-500'}`}>
                                    {tab.label}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>

            </div>


            <div className='w-[80%] ml-auto p-4 pb-12'>
                <p className='text-2xl font-bold text-green-500 pb-2'>Live Vehicle tracking </p>


                {
                    deliverId && origin && destination && (
                        <div>
                            <Map first={origin.toString()} second={destination.toString()} deliveryId={deliverId as string} />
                        </div>

                    )
                }
            </div>



        </div>
    )
}

export default TrackingDashBoard;
