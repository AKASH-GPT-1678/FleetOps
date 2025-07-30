'use client';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// Zod validation schema
const schema = z.object({
    companyId: z.string().uuid("Invalid company ID"),
    vehicleNumber: z.string().min(1, "Vehicle number is required"),
    type: z.string().min(1, "Type is required"),
    model: z.string().min(1, "Model is required"),
    manufacturer: z.string().min(1, "Manufacturer is required"),
    adminPassword: z.string().min(1, "Admin Password is required"),
    capacityInKg: z.number().min(100, "Capacity must be at least 100 kg"),
    fuelType: z.string().min(1, "Fuel type is required"),
    status: z.string().min(1, "Status is required"),
    registrationDate: z.string().min(1, "Registration date is required"),
});

type FormData = z.infer<typeof schema>;

export default function VehicleRegistrationForm() {
    const [submitError, setSubmitError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BACKEND_URL;

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post(`${endpoint}/vehicles/register`, {
                ...data,
                capacityInKg: Number(data.capacityInKg), // Just in case it's typed from text input
            }, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Vehicle Registered:", response.data);
        } catch (error) {
            console.error("Registration Error:", error);
            setSubmitError(true);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Register Vehicle</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Company ID */}
                <div>
                    <label className="block mb-1 font-medium">Company ID (UUID)</label>
                    <input
                        {...register("companyId")}
                        className="w-full border p-2 rounded"
                        placeholder="Enter company UUID"
                    />
                    {errors.companyId && <p className="text-red-500 text-sm">{errors.companyId.message}</p>}
                </div>

                {/* Vehicle Number */}
                <div>
                    <label className="block mb-1 font-medium">Vehicle Number</label>
                    <input
                        {...register("vehicleNumber")}
                        className="w-full border p-2 rounded"
                        placeholder="Enter vehicle number"
                    />
                    {errors.vehicleNumber && <p className="text-red-500 text-sm">{errors.vehicleNumber.message}</p>}
                </div>

                {/* Type */}
                <div>
                    <label className="block mb-1 font-medium">Type</label>
                    <input
                        {...register("type")}
                        className="w-full border p-2 rounded"
                        placeholder="e.g. Truck, Van"
                    />
                    {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                </div>

                {/* Model */}
                <div>
                    <label className="block mb-1 font-medium">Model</label>
                    <input
                        {...register("model")}
                        className="w-full border p-2 rounded"
                        placeholder="Enter model name"
                    />
                    {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}
                </div>

                {/* Manufacturer */}
                <div>
                    <label className="block mb-1 font-medium">Manufacturer</label>
                    <input
                        {...register("manufacturer")}
                        className="w-full border p-2 rounded"
                        placeholder="Enter manufacturer name"
                    />
                    {errors.manufacturer && <p className="text-red-500 text-sm">{errors.manufacturer.message}</p>}
                </div>

                {/* Admin Password */}
                <div>
                    <label className="block mb-1 font-medium">Admin Password</label>
                    <input
                        type="password"
                        {...register("adminPassword")}
                        className="w-full border p-2 rounded"
                        placeholder="Enter admin password"
                    />
                    {errors.adminPassword && <p className="text-red-500 text-sm">{errors.adminPassword.message}</p>}
                </div>

                {/* Capacity in Kg */}
                <div>
                    <label className="block mb-1 font-medium">Capacity (in Kg)</label>
                    <input
                        type="number"
                        {...register("capacityInKg", { valueAsNumber: true })}
                        className="w-full border p-2 rounded"
                        placeholder="Minimum 100kg"
                    />
                    {errors.capacityInKg && <p className="text-red-500 text-sm">{errors.capacityInKg.message}</p>}
                </div>

                {/* Fuel Type */}
                <div>
                    <label className="block mb-1 font-medium">Fuel Type</label>
                    <input
                        {...register("fuelType")}
                        className="w-full border p-2 rounded"
                        placeholder="e.g. Diesel, Electric"
                    />
                    {errors.fuelType && <p className="text-red-500 text-sm">{errors.fuelType.message}</p>}
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-1 font-medium">Status</label>
                    <select
                        {...register("status")}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
                </div>

                {/* Registration Date */}
                <div>
                    <label className="block mb-1 font-medium">Registration Date</label>
                    <input
                        type="date"
                        {...register("registrationDate")}
                        className="w-full border p-2 rounded"
                    />
                    {errors.registrationDate && <p className="text-red-500 text-sm">{errors.registrationDate.message}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                    Register Vehicle
                </button>

                {submitError && (
                    <p className="text-red-600 text-center mt-2">Something went wrong. Please try again.</p>
                )}
            </form>
        </div>
    );
}
