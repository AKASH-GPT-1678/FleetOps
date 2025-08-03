"use client";
import React from 'react'
import Image from 'next/image'
import Icon from "../assets/cube.png";
import { useRouter } from 'next/navigation';
export const Header = () => {
    const router = useRouter();
    return (
        <div className='flex flex-row justify-between bg-gray-800 align-middle'>
            {/* <div className='flex flex-row gap-4 p-6 '>
                <Image src={Icon} alt="logo" className='bg-gray-800 h-[50px] w-[50px] cursor-pointer' />
                <strong className='text-white text-3xl mt-1'>fleetOps</strong>
            </div> */}
            <div className='flex flex-row gap-10 text-xl p-6 '>

                <div>
                    <p className='text-white font-bold text-lg'>Solutions</p>
                </div>

                <div>
                    <p className='text-white font-bold text-lg'>Product</p>
                </div>

                <div>
                    <p className='text-white font-bold text-lg'>About</p>
                </div>
                <div>
                    <p className='text-white font-bold text-lg cursor-pointer' onClick={()=> router.push("/companydashboard")}>Dashboard</p>
                </div>


            </div>
            <div className='flex flex-row gap-4 p-6 '>
                <Image src={Icon} alt="logo" className='bg-gray-800 h-[40px] w-[40px] cursor-pointer' />
                <strong className='text-white text-lg mt-1'>FleetOps</strong>
            </div>
            <div className='flex flex-row gap-4 p-6 '>


                <button className='cursor-pointer'>
                    <p className="text-white border-2 border-white px-6 py-2" onClick={() => window.location.href = "/login"}>Login</p>

                </button>
                <button className='cursor-pointer'>
                    <p className="text-white border-2 border-white px-6 py-2" onClick={() => router.push("/registercompany")}>New Company</p>

                </button>

            </div>
        </div>
    )
}
