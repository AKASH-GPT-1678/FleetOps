"use client";
import React from 'react';
import Image from 'next/image';
import Icon from "../assets/cube.png";
import { useRouter } from 'next/navigation';
import { useUserStore } from './zustand';
export const Header = () => {
    const router = useRouter();
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);

    return (
        <div className="bg-gray-800">
            <div className="max-w-screen mx-auto flex flex-row justify-between items-center">
               
                <div className="flex flex-row gap-10 text-sm md:text-lg p-6">
                    <div>
                        <p className="text-white font-bold cursor-pointer">Solutions</p>
                    </div>
                    <div>
                        <p className="text-white font-bold cursor-pointer">Products</p>
                    </div>
                    <div>
                        <p className="text-white font-bold cursor-pointer">About</p>
                    </div>
                    <div>
                        <p
                            className="text-white font-bold cursor-pointer"
                            onClick={() => router.push("/companydashboard")}
                        >
                            Dashboard
                        </p>
                    </div>
                                        <div>
                        <p
                            className="text-white font-bold cursor-pointer"
                            onClick={() => router.push("/companydashboard")}
                        >
                          Login
                        </p>
                    </div>


                </div>

                <div className="flex flex-row gap-4 p-6">
                    <Image
                        src={Icon}
                        alt="logo"
                        className="bg-gray-800 h-[40px] w-[40px] cursor-pointer hidden md:inline"
                    />
                    <strong className="text-white text-lg mt-1 hidden md:inline">
                        FleetOps
                    </strong>
                </div>

             
                <div className="hidden md:flex flex-row gap-4 p-6">
                    {isAuthenticated ? (
                        <div className="flex flex-row gap-3">
                            <p
                                className="text-white border-2 border-white px-6 py-2 cursor-pointer"
                                onClick={() => (window.location.href = "/profile")}
                            >
                                Profile
                            </p>
                            <p
                                className="text-white border-2 border-white px-6 py-2 cursor-pointer"
                                onClick={() => (window.location.href = "/login")}
                            >
                                Logout
                            </p>
                        </div>
                    ) : (
                        <p
                            className="text-white border-2 border-white px-6 py-2 cursor-pointer"
                            onClick={() => (window.location.href = "/login")}
                        >
                            Login
                        </p>
                    )}
                </div>
            </div>
        </div>

    );
};