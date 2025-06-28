import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import Driver2 from "../assets/driver2.png";
export const Drivers = () => {
  return (
    <div>
                      <div className='p-3 w-[300px] rounded-xl bg-white shadow-xl flex flex-col'>
                <div
                className='flex flex-row justify-between'
                
                >
                    <h1 className='font-extrabold text-2xl'>Shafique</h1>
                    <FaRegHeart size={30} className='cursor-pointer' />
                </div>

                <p className='text-lg font-bold text-gray-400'>Category</p>

                <div>
                  <Image  src={Driver2} alt='trucks' className='p-2'/>
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
