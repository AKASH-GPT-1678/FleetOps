"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// Schema validation using zod
const schema = z.object({
    name: z.string().min(1, "Driver name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    licenseNumber: z.string().min(1, "License number is required"),
    type: z.enum(["Full-time", "Part-time"], {
        errorMap: () => ({ message: "Type is required" }),
    }),
    dateOfJoining: z.string().optional(), // date as ISO string
    companyId: z.string().uuid("Invalid UUID format for company ID"),
});

type FormData = z.infer<typeof schema>;

export default function DriverRegistrationForm() {
    const [submitError, setSubmitError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BACKEND_URL;

    const onSubmit = async (data: FormData) => {
        console.log("Driver Data:", data);
        try {
            const response = await axios.post(`${endpoint}/drivers/register`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
                },
            });
            console.log("Success:", response.data);
        } catch (error) {
            console.error("Error:", error);
            setSubmitError(true);
        }
    };

    return (
        <div className="max-w-[500px] mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Register Driver</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        {...register("name")}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Driver's full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block mb-1 font-medium">Phone Number</label>
                    <input
                        {...register("phoneNumber")}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Phone number"
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                </div>

                {/* License Number */}
                <div>
                    <label className="block mb-1 font-medium">License Number</label>
                    <input
                        {...register("licenseNumber")}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="License number"
                    />
                    {errors.licenseNumber && <p className="text-red-500 text-sm">{errors.licenseNumber.message}</p>}
                </div>

                {/* Type */}
                <div>
                    <label className="block mb-1 font-medium">Employment Type</label>
                    <select
                        {...register("type")}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                    </select>
                    {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                </div>

                {/* Date of Joining */}
                <div>
                    <label className="block mb-1 font-medium">Date of Joining</label>
                    <input
                        type="date"
                        {...register("dateOfJoining")}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Company ID */}
                <div>
                    <label className="block mb-1 font-medium">Company ID</label>
                    <input
                        {...register("companyId")}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="UUID of the company"
                    />
                    {errors.companyId && <p className="text-red-500 text-sm">{errors.companyId.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                    Register Driver
                </button>

                {submitError && (
                    <p className="text-red-600 text-center">Something went wrong. Please try again.</p>
                )}
            </form>
        </div>
    );
}
