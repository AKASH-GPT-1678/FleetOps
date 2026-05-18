"use client";
import React from 'react';

import { useUserStore } from '@/app/component/zustand';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CompanyTabs } from './tabs/CompanyTab';

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
  
    const [deliveries, setDeliveries] = React.useState<DeliverySummary[]>([]);
    const companyId = useUserStore((state) => state.activeCompany);
    const token = useUserStore((state) => state.token);

    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BACKEND_URL;
    const [error, setError] = React.useState<string>("");
      const setActiveCompanyPage = useUserStore((state) => state.setActiveCompanyPage);
      const active = useUserStore((state) => state.active_company_page);
    const router = useRouter();
    const tabs = CompanyTabs(active);


    const handleActivity = (key: string, route: string) => {
        setActiveCompanyPage(key);
         
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

        <div className='flex flex-col md:flex-row min-h-screen'>


            <div className="p-4 w-full max-w-[300px] hidden md:inline-block lg:max-w-[400px] border-r border-gray-300 bg-white shadow-sm">
                <h1 className="text-3xl font-handwriting font-extrabold text-blue-700 cursor-pointer" onClick={() => handleActivity("drivers", "/")}>FleetOps</h1>

                <div className="mt-6">
              

                    <div className="flex flex-col gap-3">
                        {tabs.map((tab, index) => (
                            <div
                                key={index}
                                onClick={() => handleActivity(tab.key, `/company/${tab.key}`)}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 cursor-pointer ${ tab.key == "delivery" ? "bg-blue-100" : "hover:bg-gray-100"}`}
                            >
                                {tab.icon}
                                <p className={`font-semibold ${tab.key == "delivery" ? "text-blue-600" : "text-gray-600"}`}>
                                    {tab.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='p-6 w-full bg-gray-50'>


                <div className="mb-6">
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                        onClick={() => window.location.href = '/newdelivery'}
                    >
                        New Delivery
                    </button>
                </div>


                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">My Deliveries</h2>

                    {deliveries.length === 0 ? (
                        <p className="text-gray-500">No deliveries found.</p>
                    ) : (
                        <ul className="space-y-4">
                            {deliveries.map((delivery, index) => (
                                <li
                                    key={index}
                                    className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 max-w-[900px] border bg-white p-5 shadow-md rounded-xl"
                                >
                                    <div className="text-gray-800 space-y-1">
                                        <p><strong>Driver:</strong> {delivery.driverName} ({delivery.driverId})</p>
                                        <p><strong>Vehicle:</strong> {delivery.vehicleNumber} ({delivery.vehicleId})</p>
                                        <p><strong>Origin:</strong> {delivery.origin}</p>
                                        <p><strong>Destination:</strong> {delivery.destination}</p>
                                        <p><strong>Delivery ID:</strong> {delivery.deliveryId}</p>
                                    </div>

                                    <div className="mt-2 lg:mt-0">
                                        <button
                                            className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
                                            onClick={() => router.push(`/companydashboard/tracking?deliveryId=${delivery.deliveryId}`)}
                                        >
                                            Track
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

        </div>

    )
}

export default DeliveryDashBoard;
