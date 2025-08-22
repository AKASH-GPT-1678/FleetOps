'use client';

import React from "react";
import { useRouter } from "next/navigation";

export type Vehicle = {
  id: string;
  vehicleNumber: string;
  type: string;
  model: string;
  capacityInKg: number;
  fuelType: string;
  status: string;
  registrationDate: string;
  pricePerDay: number;
  description: string;
  features: string[];
  owner?: string;
  image?: string;
  location?: string;
};

type Props = {
  vehicle: Vehicle;
};

export default function MyVehiclePage({ vehicle }: Props) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden flex flex-col lg:flex-row">

        {/* Vehicle Image (Optional) */}
        {/* {vehicle.image && (
          <div className="lg:w-1/2 relative h-96">
            <Image
              src={vehicle.image.length > 0 ? vehicle.image : Truck1.src}
              alt={vehicle.vehicleNumber}
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover"
            />
          </div>
        )} */}

        <div className="lg:w-full p-6 space-y-4 ">
          {/* <h1 className="text-3xl font-bold">  {vehicle.model ?? "N/A"} ({vehicle.type ?? "N/A"})</h1> */}
          <p className="text-xl text-green-600 font-semibold w">₹{vehicle.pricePerDay}/day</p>
          <p className="text-gray-700 w-2/3">{vehicle.description}</p>

          {/* Features */}
          <div>
            <h2 className="text-lg font-semibold mt-4 mb-2">Features</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {vehicle.features?.map((feat, i) => (
                <li key={i}>{feat}</li>
              ))}
            </ul>
          </div>

          {/* Owner and Status */}
          <div className="border-t pt-4 text-sm">
            <p><strong>Owner:</strong> {vehicle.owner ?? "N/A"}</p>
            <p><strong>Vehicle Number:</strong> {vehicle.vehicleNumber}</p>
            <p><strong>Location:</strong> {vehicle.location ?? "Not Provided"}</p>
            <p><strong>Status:</strong> <span className="text-blue-600 font-medium">{vehicle.status}</span></p>
          </div>

          {/* Additional Details */}
          <div className="border-t pt-4 text-sm">
            <p><strong>Fuel Type:</strong> {vehicle.fuelType}</p>
            <p><strong>Capacity:</strong> {vehicle.capacityInKg} kg</p>
            <p><strong>Registration Date:</strong> {vehicle.registrationDate}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row gap-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">
              Edit Details
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">
              Book Now
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer" onClick={() => router.push("/verifytracking")}>
              Add Tracking
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

