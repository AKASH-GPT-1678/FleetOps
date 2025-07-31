'use client';

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useUserStore } from "./zustand";

// ✅ Schema with correct types and validation
const schema = z.object({
  companyId: z.string().uuid("Invalid company ID").optional(),
  vehicleNumber: z.string().min(1, "Vehicle number is required"),
  type: z.string().min(1, "Type is required"),
  model: z.string().min(1, "Model is required"),
  description: z.string().min(1, "Description is required"),
  adminPassword: z.string().min(1, "Admin Password is required"),
  pricePerDay: z.coerce.number().min(101, "Price must be greater than 100"),
  features: z.array(
    z.string()
      .min(10, "Feature must be at least 10 characters")
      .max(30, "Feature must not exceed 30 characters")
  ).min(2, "At least 2 features are required"),
  capacityInKg: z.coerce.number().min(100, "Capacity must be at least 100 kg"),
  fuelType: z.string().min(1, "Fuel type is required"),
  status: z.string().min(1, "Status is required"),
  registrationDate: z.string().min(1, "Registration date is required"),
});

type FormData = z.infer<typeof schema>;

export default function VehicleRegistrationForm() {
  const comapanyId = useUserStore((state) => state.activeCompany);
  const token = useUserStore((state) => state.token);

  const [submitError, setSubmitError] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [featuresInput, setFeaturesInput] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      capacityInKg: 100,
      pricePerDay: 200,
      features: [],
    },
  });

  useEffect(() => {
    setValue("features", features, { shouldValidate: true });
  }, [features, setValue]);

  // 🔎 Debug: Log validation errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Validation Errors:", errors);
    }
  }, [errors]);

  const handleAddFeature = () => {
    const trimmed = featuresInput.trim();
    if (trimmed.length > 0) {
      setFeatures((prev) => [...prev, trimmed]);
      setFeaturesInput("");
    }
  };

  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BACKEND_URL;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("🟢 Form submitted with data:", data);

    try {
      const payload = {
        ...data,
        companyId: comapanyId,
        features: features,
      };

      const response = await axios.post(`${endpoint}/vehicle/register`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Vehicle Registered:", response.data);
      setSubmitError(false);
    } catch (error) {
      console.error("❌ Registration Error:", error);
      setSubmitError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Register Vehicle</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Vehicle Number */}
        <div>
          <label className="block mb-1 font-medium">Vehicle Number</label>
          <input {...register("vehicleNumber")} className="w-full border p-2 rounded" />
          {errors.vehicleNumber && <p className="text-red-500 text-sm">{errors.vehicleNumber.message}</p>}
        </div>

        {/* Type */}
        <div>
          <label className="block mb-1 font-medium">Type</label>
          <input {...register("type")} className="w-full border p-2 rounded" />
          {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
        </div>

        {/* Features */}
        <div>
          <label className="block mb-1 font-medium">Features</label>
          <div className="flex gap-2">
            <input
              value={featuresInput}
              onChange={(e) => setFeaturesInput(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter a feature (10-30 chars)"
            />
            <button type="button" onClick={handleAddFeature} className="px-4 bg-blue-600 text-white rounded">
              Add
            </button>
          </div>
          {errors.features && <p className="text-red-500 text-sm">{errors.features.message}</p>}
          <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
            {features.map((feat, index) => (
              <li key={index}>{feat}</li>
            ))}
          </ul>
        </div>

        {/* Model */}
        <div>
          <label className="block mb-1 font-medium">Model</label>
          <input {...register("model")} className="w-full border p-2 rounded" />
          {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <input {...register("description")} className="w-full border p-2 rounded" />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Admin Password */}
        <div>
          <label className="block mb-1 font-medium">Admin Password</label>
          <input type="password" {...register("adminPassword")} className="w-full border p-2 rounded" />
          {errors.adminPassword && <p className="text-red-500 text-sm">{errors.adminPassword.message}</p>}
        </div>

        {/* Price Per Day */}
        <div>
          <label className="block mb-1 font-medium">Price Per Day</label>
          <input type="number" {...register("pricePerDay", { valueAsNumber: true })} className="w-full border p-2 rounded" />
          {errors.pricePerDay && <p className="text-red-500 text-sm">{errors.pricePerDay.message}</p>}
        </div>

        {/* Capacity in Kg */}
        <div>
          <label className="block mb-1 font-medium">Capacity (in Kg)</label>
          <input type="number" {...register("capacityInKg", { valueAsNumber: true })} className="w-full border p-2 rounded" />
          {errors.capacityInKg && <p className="text-red-500 text-sm">{errors.capacityInKg.message}</p>}
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block mb-1 font-medium">Fuel Type</label>
          <input {...register("fuelType")} className="w-full border p-2 rounded" />
          {errors.fuelType && <p className="text-red-500 text-sm">{errors.fuelType.message}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select {...register("status")} className="w-full border p-2 rounded">
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>

        {/* Registration Date */}
        <div>
          <label className="block mb-1 font-medium">Registration Date</label>
          <input type="date" {...register("registrationDate")} className="w-full border p-2 rounded" />
          {errors.registrationDate && <p className="text-red-500 text-sm">{errors.registrationDate.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Register Vehicle
        </button>

        {submitError && <p className="text-red-600 text-center mt-2">Something went wrong. Please try again.</p>}
      </form>
    </div>
  );
}
