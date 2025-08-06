"use client";
import React from 'react';
import { IoIosHome } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";
import { MdOutlineForwardToInbox } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLocalShipping } from 'react-icons/md';

const SettingsDashBoard = () => {
    const [active, setActive] = React.useState("settings");

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
        const handleActivity = (key: string, route: string) => {
        setActive(key);
        if (route) {
            window.location.href = route;
        }

    }


    return (
        <div>
            <div className='p-4 w-full max-w-[400px]'>
                  <h1 className="text-3xl font-handwriting font-extrabold text-blue-700">FleetOps</h1>


                <div className='mt-4 p-2'>
                    <h1>Menu</h1>

                    <div className="flex flex-col gap-4">
                        {tabs.map((tab) => (
                            <div
                                key={tab.key}
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


        </div>
    )
}

export default SettingsDashBoard;
