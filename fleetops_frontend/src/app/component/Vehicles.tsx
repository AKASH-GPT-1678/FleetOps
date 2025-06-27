import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import Truck1 from "../assets/truck1.png";
export const Vehicles = () => {
    return (

        <div className='p-4 bg-gray-100 w-full h-screen'>
            <div className='p-3'>
                <button className='py-3 px-10 bg-teal-900 cursor-pointer text-white'>Add New</button>
            </div>
              
              <div className='p-3 w-[300px] rounded-xl bg-white shadow-xl flex flex-col'>
                <div
                className='flex flex-row justify-between'
                
                >
                    <h1 className='font-extrabold text-2xl'>Raj Tempo</h1>
                    <FaRegHeart size={30} className='cursor-pointer' />
                </div>

                <p className='text-lg font-bold text-gray-400'>Category</p>

                <div>
                  <Image  src={Truck1} alt='trucks'/>
                </div>
                <div className='flex flex-row h-[40px] border-2 mt-2
                '>

                </div>
                <div className='flex flex-row justify-between mt-2 items-center'>
                    <p className='font-bold text-2xl'>1000</p>
                    <button className='p-2 border-2 px-10'>Book</button>

                </div>


              </div>
        </div>




    )
}
