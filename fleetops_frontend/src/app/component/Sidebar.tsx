import React from 'react'
import Icon from "../assets/cube.png"
import Image from 'next/image'
import { LiaBackwardSolid } from "react-icons/lia";
export const Sidebar = () => {
    return (
        <div className='w-[300px] h-screen border-2'>
            <div className='flex flex-row gap-4 p-3 items-center justify-between'>
                <div className='flex flex-row gap-2 p-3 items-center'>
                    <Image src={Icon} alt="logo" className='h-[50px] w-[50px] cursor-pointer' />
                    <p className='font-bold text-2xl'>fleetOps</p>
                </div>
                <div className='border p-1 rounded-xl'>
                    <LiaBackwardSolid size={24} className="cursor-pointer" />
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
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500'>Dashboard</p>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500'>Tracker</p>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500'>Inbox</p>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500'>Reports</p>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500'>Invoice</p>
                    </div>

                    <div className='mt-6 space-y-1 p-2'>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500'>Drivers</p>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500'>Vehicles</p>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500'>Support</p>

                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500'>Terms of Service</p>
                        <p className='p-2 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500'>Privacy Policy</p>
                    </div>

                    <div className='space-y-1 mt-30 p-2'>
                        <p className='p-2.5 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500 font-semibold'>Settings</p>
                        <p className='p-2.5 cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-purple-500 font-semibold'>Log Out</p>
                    </div>
                </div>





            </div>
        </div>

    )
}
