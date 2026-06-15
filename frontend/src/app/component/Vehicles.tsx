"use client";
import React from "react";
import Image from "next/image";
import MyVehicle from "./MyVehicle";
import Truck1 from "../assets/truck1.png";
import { useUserStore } from "./zustand";
import axios from "axios";
import { useRegistration } from "./VehicleContext";
import { Vehicle } from "./MyVehicle";

export const VehiclesSpecs = () => {
  const comapanyId = useUserStore((state) => state.activeCompany);
  const token = useUserStore((state) => state.token);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);

  React.useEffect(() => {
    const getMyVehicles = async (token: string) => {
      if (!token || !comapanyId) return;
      try {
        console.log("Company ID:", comapanyId);
        console.log("Token:", token);

        const response = await axios.get(
          `http://localhost:8080/vehicle/vehicles?companyId=${comapanyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        );

        console.log("Vehicles fetched successfully:", response.data);
        setVehicles(response.data);
        // You can update state here if needed
      } catch (error) {
        console.error("Error while fetching vehicles:", error);
        // You can show a toast or alert here if needed
      }
    };

    getMyVehicles(token);
  }, [token]);

  return (
<div className="flex flex-col xl:flex-row gap-6 my-5">
  
  {/* Vehicle List */}
  <div className="xl:w-[70%]">
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {vehicles.map((item, index) => (
        <div
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`
            cursor-pointer
            rounded-xl
            border
            bg-white
            shadow-md
            hover:shadow-xl
            transition-all
            overflow-hidden
            ${
              activeIndex === index
                ? "border-teal-900 ring-2 ring-teal-900"
                : "border-gray-200"
            }
          `}
        >
          <Image
            src={item.profileImg ?? Truck1.src}
            width={400}
            height={250}
            alt={item.vehicleNumber}
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">
                {item.vehicleNumber}
              </h3>

              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.status}
              </span>
            </div>

            <p className="text-gray-600 mt-2">
              {item.model}
            </p>

            <p className="mt-3 text-sm">
              <span className="text-gray-500">Capacity:</span>{" "}
              <span className="font-medium">
                {item.capacityInKg} kg
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Vehicle Details */}
  <div className="xl:w-[30%]">
    <div className="sticky top-4">
      {vehicles.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          No Vehicles
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-4">
          <MyVehicle vehicle={vehicles[activeIndex]} />
        </div>
      )}
    </div>
  </div>

</div>
  );
};
