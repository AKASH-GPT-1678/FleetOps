"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Map from "@/app/component/Map";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useUserStore } from "@/app/component/zustand";
import { CompanyTabs } from "../companyui/tabs/CompanyTab";
export interface DeliveryDetailDTO {
  deliveryId: string; // UUID as string
  origin: string;
  destination: string;
  expectedTime: string; // ISO timestamp (or Date if parsed)
  driverName: string;
  vehicleNumber: string;
  companyName: string;
}

const TrackingDashBoardContent = () => {
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const searchParam = useSearchParams();
  const deliverId = searchParam.get("deliveryId");
  const token = useUserStore((state) => state.token);

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

  async function getDeliveryById(deliveryId: string, token: string) {
    try {
      const response = await axios.get<DeliveryDetailDTO>(
        `http://localhost:8080/delivery/${deliveryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      console.log("Delivery Details:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching delivery by ID:", error);
      throw error;
    }
  }

  React.useEffect(() => {
    if (deliverId) {
      getDeliveryById(deliverId, token).then((data) => {
        setOrigin(data.origin);
        setDestination(data.destination);
      });
    }
  }, [deliverId, token]);

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
          <div className="flex flex-col gap-3">
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => handleActivity(tab.key, `/company/${tab.key}`)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 cursor-pointer ${active === tab.key ? "bg-blue-100" : "hover:bg-gray-100"}`}
              >
                {tab.icon}
                <p
                  className={`font-semibold ${active === tab.key ? "text-blue-600" : "text-gray-600"}`}
                >
                  {tab.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[80%] ml-auto p-4 pb-12">
        <p className="text-2xl font-bold text-green-500 pb-2">
          Live Vehicle tracking{" "}
        </p>

        {deliverId && origin && destination && (
          <div>
            <Map
              first={origin.toString()}
              second={destination.toString()}
              deliveryId={deliverId as string}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingDashBoardContent;
