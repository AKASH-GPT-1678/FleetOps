"use client";
import React from 'react'
import Icon from "../assets/cube.png"
import Image from 'next/image'
import { LiaBackwardSolid } from "react-icons/lia";
import { useRouter } from 'next/navigation';
export const Sidebar = () => {
    const router = useRouter();
    return (
        <div className='w-[250px] mr-6 h-full border-2 hidden md:inline'>
            <div className=' p-1  flex justify-end'>
                <LiaBackwardSolid size={24} className="cursor-pointer" />
            </div>
            <div className='flex flex-row gap-4 p-3 items-center justify-between'>
                <div className='flex flex-row gap-2 p-1 items-center'>
                    <Image src={Icon} alt="logo" className=' w-[30px] h-[30px]  lg:h-[50px] lg:w-[50px] cursor-pointer' />
                    <p className='font-bold text-lg md:text-2xl'>fleetOps</p>
                </div>

            </div>

            <hr />

            {/* Flex-grow layout here */}
            <div className='flex flex-col py-4 h-screen justify-between'>

                {/* Top/Main section */}
                <div>
                    <p className='font-semibold text-gray-500 mb-2'>Main</p>

                    <div></div>

                    <div className='space-y-1 p-3'>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500 font-bold text-xl'>Dashboard</p>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500 font-bold text-xl' onClick={() => router.push("/tracker")}>Tracker</p>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500 font-bold text-xl'>Inbox</p>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500 font-bold text-xl'>Reports</p>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500 font-bold text-xl'>Invoice</p>
                    </div>

                    <div className='mt-6 space-y-1 p-2'>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500 font-bold text-xl'>Drivers</p>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500 font-bold text-xl' onClick={() => router.push("/vehicles")}>Vehicles</p>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500 font-bold text-xl'>Support</p>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500 font-bold text-xl'>Terms of Service</p>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500 font-bold text-xl'>Privacy Policy</p>
                    </div>

                    <div className='space-y-1 mt-30 p-2'>
                        <p className='p-2.5 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500 font-bold text-xl'>Settings</p>
                        <p className='p-2.5 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500 font-bold text-xl'>Log Out</p>
                    </div>

                </div>





            </div>
        </div>

    )
}
