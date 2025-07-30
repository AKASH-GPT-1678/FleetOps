"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import useTokenStore from "./zustand";

// Zod schema for validation
const schema = z.object({
    name: z.string().min(1, "Company name is required"),
    address: z.string().min(1, "Address is required"),
    type: z.string().min(1, "Type is required"),
    adminEmail: z.string().email("Invalid email address"),
    adminPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function CompanyRegistrationForm() {
    const [submitError, setSubmitError] = useState(false);
    const setToken = useTokenStore((state) => state.setToken);
    const token = useTokenStore((state) => state.token);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BACKEND_URL;

    const onSubmit = async (data: FormData) => {
        console.log("Company data submitted:", data);
        try {
            const response = await axios.post(`${endpoint}/company/create`, data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            console.log("Response:", response.data);
        } catch (err) {
            console.error(err);
            setSubmitError(true);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Register Company</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Company Name */}
                <div>
                    <label className="block mb-1 font-medium">Company Name</label>
                    <input
                        {...register("name")}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter company name"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Address */}
                <div>
                    <label className="block mb-1 font-medium">Address</label>
                    <input
                        {...register("address")}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter address"
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>

                {/* Type */}
                <div>
                    <label className="block mb-1 font-medium">Type</label>
                    <input
                        {...register("type")}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter company type (e.g., Private, Public)"
                    />
                    {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                </div>

                {/* Admin Email */}
                <div>
                    <label className="block mb-1 font-medium">Admin Email</label>
                    <input
                        type="email"
                        {...register("adminEmail")}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter admin email"
                    />
                    {errors.adminEmail && <p className="text-red-500 text-sm">{errors.adminEmail.message}</p>}
                </div>

                {/* Admin Password */}
                <div>
                    <label className="block mb-1 font-medium">Admin Password</label>
                    <input
                        type="password"
                        {...register("adminPassword")}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter admin password"
                    />
                    {errors.adminPassword && <p className="text-red-500 text-sm">{errors.adminPassword.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                    Register
                </button>

                {submitError && (
                    <p className="text-red-600 text-center">Something went wrong. Please try again.</p>
                )}
            </form>
        </div>
    );
}
