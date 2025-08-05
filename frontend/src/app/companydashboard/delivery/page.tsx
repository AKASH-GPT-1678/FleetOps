"use client";
import React from 'react';
import { IoIosHome } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";
import { MdOutlineForwardToInbox } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLocalShipping } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/app/component/zustand';
import axios from 'axios';
import { useRouter } from 'next/navigation';
type DeliverySummary = {
    deliveryId: string;
    driverId: string;
    driverName: string;
    vehicleId: string;
    vehicleNumber: string;
    companyId: string;
    origin: string;
    destination: string;
};
const DeliveryDashBoard = () => {
    const [active, setActive] = React.useState("dashboard");
    const [deliveries, setDeliveries] = React.useState<DeliverySummary[]>([]);
    const companyId = useUserStore((state) => state.activeCompany);
    const token = useUserStore((state) => state.token);
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BACKEND_URL;
    const [error, setError] = React.useState<string>("");
    const router = useRouter();
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
        const fetchDeliveries = async () => {
            if (!token || !companyId) return;

            try {
                const response = await axios.get(`${endpoint}/delivery/myDeliveries`, {
                    params: { companyId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setDeliveries(response.data);
            } catch (err) {
                console.error("❌ Failed to fetch deliveries:", err);
                setError("Failed to load deliveries.");
            } finally {

            }
        };

        fetchDeliveries();
    }, [companyId, token]);


    return (
        <div>
            <div className='p-4 w-full max-w-[400px]'>
                <h1 className="text-3xl font-handwriting font-extrabold ">Meat Truck</h1>


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
            <div>
                <Button onClick={() => window.location.href = '/newdelivery'}>New Delivery</Button>


            </div>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">My Deliveries</h2>

                {deliveries.length === 0 ? (
                    <p>No deliveries found.</p>
                ) : (
                    <ul className="space-y-4 ">
                        {deliveries.map((delivery, index) => (
                            <div className='flex flex-row justify-between max-w-[800px] border'>
                                <li key={index} className=" p-4 rounded  w-full">
                                    <p><strong>Driver:</strong> {delivery.driverName} ({delivery.driverId})</p>
                                    <p><strong>Vehicle:</strong> {delivery.vehicleNumber} ({delivery.vehicleId})</p>
                                    <p><strong>Origin:</strong> {delivery.origin}</p>
                                    <p><strong>Destination:</strong> {delivery.destination}</p>
                                </li>
                                <li className='p-4'>
                                    <Button className='cursor-pointer' onClick={() => router.push(`/companydashboard/tracking?deliveryId=${delivery.deliveryId}`)}>Track</Button>

                                </li>
                            </div>
                        ))}
                    </ul>
                )}
            </div>


        </div>
    )
}

export default DeliveryDashBoard;
