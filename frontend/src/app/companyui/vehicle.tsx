"use client";
import React from "react";

import { VehiclesSpecs } from "@/app/component/Vehicles";
import VehicleRegistrationForm from "@/app/component/VehicleForm";
import { useRegistration } from "@/app/component/VehicleContext";
import { useRouter } from "next/navigation";
import { useUserStore } from "../component/zustand";
import { CompanyTabs } from "./tabs/CompanyTab";

const VehicleDashBoard = () => {
  const { setShowRegistrationForm, showRegistrationForm } = useRegistration();
  const divRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const setActiveCompanyPage = useUserStore(
    (state) => state.setActiveCompanyPage,
  );
  const active = useUserStore((state) => state.active_company_page);
  const tabs = CompanyTabs(active);
  const handleActivity = (key: string, route: string) => {
    setActiveCompanyPage(key);
    if (route) {
      router.push(route);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setShowRegistrationForm(false); // hide the form when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="flex flex-row gap-4 w-full">
      <div className="p-4 w-full max-w-[300px] hidden md:inline-block lg:max-w-[400px] border-r border-gray-300 bg-white shadow-sm">
        <h1
          className="text-3xl font-handwriting font-extrabold text-blue-700 cursor-pointer"
          onClick={() => handleActivity("drivers", "/")}
        >
          FleetOps
        </h1>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Menu</h2>

          <div className="flex flex-col gap-3">
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => handleActivity(tab.key, `/company/${tab.key}`)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 cursor-pointer ${tab.key == "vehicle" ? "bg-blue-100" : "hover:bg-gray-100"}`}
              >
                {tab.icon}
                <p
                  className={`font-semibold ${tab.key == "vehicle" ? "text-blue-600" : "text-gray-600"}`}
                >
                  {tab.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <VehiclesSpecs />
      </div>
      {showRegistrationForm && (
        <div
          className="absolute top-6  left-1/2 transform -translate-x-1/2 w-full"
          ref={divRef}
        >
          <VehicleRegistrationForm />
        </div>
      )}
    </div>
  );
};

export default VehicleDashBoard;
