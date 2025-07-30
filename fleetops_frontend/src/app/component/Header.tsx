"use client";
import React from 'react'
import Image from 'next/image'
import Icon from "../assets/cube.png";
import { useRouter } from 'next/navigation';
export const Header = () => {
    const router = useRouter();
    return (
        <div className='flex flex-row justify-between bg-gray-800 align-middle'>
            <div className='flex flex-row gap-4 p-6 '>
                <Image src={Icon} alt="logo" className='bg-gray-800 h-[50px] w-[50px] cursor-pointer' />
                <strong className='text-white text-3xl mt-1'>fleetOps</strong>
            </div>
            <div className='flex flex-row gap-10 text-3xl p-6 '>

                <h1 className='text-xl text-white  cursor-pointer'>Home</h1>
                <h1 className='text-xl text-white  cursor-pointer'>Services</h1>
                <h1 className='text-xl text-white  cursor-pointer'>Features</h1>
                <h1 className='text-xl text-white  cursor-pointer'>About</h1>

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
