"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useUserStore } from "../component/zustand";
import { useSearchParams } from "next/navigation";
// Schema Definition
const tripSchema = z.object({
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  expectedTime: z.string().min(1, "Expected time is required"),
  fuel: z.coerce.number().min(1, "Fuel amount is required"),
  costPerLitre: z.coerce.number().min(1, "Cost per litre is required"),
  originCords: z.array(z.coerce.number()).min(2, "At least 2 coordinates are required"),
  destinationCords: z.array(z.coerce.number()).min(2, "At least 2 coordinates are required"),
});

// Infer the TypeScript type from schema
type TripData = z.infer<typeof tripSchema>;

export default function TripRegistrationForm() {
  const companyId = useUserStore((state) => state.activeCompany);
  const token = useUserStore((state) => state.token);
  const searchParams = useSearchParams();

  const driverId = searchParams.get("driverId");
  const vehicleId = searchParams.get("vehicleId");


  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripData>({
    resolver: zodResolver(tripSchema),
  });

  const onSubmit: SubmitHandler<TripData> = async (data) => {
    try {
      const payload = {
        ...data,
        companyId,
        driverId,
        vehicleId

      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_BACKEND_URL}/delivery/createDelivery`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Trip created:", response.data);
      if(response.data.success == true){
        window.location.href = '/companydashboard/delivery';
      }
      setSubmitError(false);
    } catch (err) {
      console.error("❌ Trip creation failed:", err);
      setSubmitError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Trip</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Origin */}
        <div>
          <label className="block mb-1 font-medium">Origin</label>
          <input {...register("origin")} className="w-full border p-2 rounded" />
          {errors.origin && <p className="text-red-500 text-sm">{errors.origin.message}</p>}
        </div>

        {/* Destination */}
        <div>
          <label className="block mb-1 font-medium">Destination</label>
          <input {...register("destination")} className="w-full border p-2 rounded" />
          {errors.destination && <p className="text-red-500 text-sm">{errors.destination.message}</p>}
        </div>

        {/* Expected Time */}
        <div>
          <label className="block mb-1 font-medium">Expected Time</label>
          <input type="datetime-local" {...register("expectedTime")} className="w-full border p-2 rounded" />
          {errors.expectedTime && <p className="text-red-500 text-sm">{errors.expectedTime.message}</p>}
        </div>

        {/* Fuel */}
        <div>
          <label className="block mb-1 font-medium">Fuel (litres)</label>
          <input type="number" {...register("fuel", { valueAsNumber: true })} className="w-full border p-2 rounded" />
          {errors.fuel && <p className="text-red-500 text-sm">{errors.fuel.message}</p>}
        </div>

        {/* Cost per litre */}
        <div>
          <label className="block mb-1 font-medium">Cost per Litre (₹)</label>
          <input type="number" {...register("costPerLitre", { valueAsNumber: true })} className="w-full border p-2 rounded" />
          {errors.costPerLitre && <p className="text-red-500 text-sm">{errors.costPerLitre.message}</p>}
        </div>

        {/* Origin Coordinates */}
        <div>
          <label className="block mb-1 font-medium">Origin Coordinates (comma separated)</label>
          <input
            {...register("originCords", {
              setValueAs: (val: string) => val.split(",").map((v: string) => parseFloat(v.trim())),
            })}
            className="w-full border p-2 rounded"
            placeholder="e.g. 72.88, 19.07"
          />
          {errors.originCords && <p className="text-red-500 text-sm">{errors.originCords.message}</p>}
        </div>

        {/* Destination Coordinates */}
        <div>
          <label className="block mb-1 font-medium">Destination Coordinates (comma separated)</label>
          <input
            {...register("destinationCords", {
              setValueAs: (val: string) => val.split(",").map((v: string) => parseFloat(v.trim())),
            })}
            className="w-full border p-2 rounded"
            placeholder="e.g. 73.00, 19.10"
          />
          {errors.destinationCords && <p className="text-red-500 text-sm">{errors.destinationCords.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Create Trip
        </button>

        {submitError && <p className="text-red-600 text-center mt-2">Something went wrong. Please try again.</p>}
      </form>
    </div>
  );
}
