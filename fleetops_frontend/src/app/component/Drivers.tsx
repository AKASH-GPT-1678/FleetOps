"use client";
import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import Driver2 from "../assets/driver2.png";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
export const DriversInfo = () => {
  const [viewMore, setviewMore] = React.useState(false);
  return (
    <div>
      <div className='flex flex-col gap-2 max-w-[400px] xl:max-w-[600px]'>

     
        <div className='flex flex-row justify-between xl:max-w-[600px] max-w-[400px] mt-3'>
          <p className=''>Company/Name</p>
          <p className=''>Status</p>

        </div>
        <div className='bg-gray-200 h-[50px] p-2 max-w-[400px] xl:max-w-[600px]' onClick={() => setviewMore(!viewMore)}>



          {viewMore ? (
            <div className='flex flex-row items-center justify-center gap-2.5'>
              <IoIosArrowDropup size={24} className='' />
              <p className='font-black cursor-pointer'>View Less</p>
            </div>
          ) : (
            <div className='flex flex-row items-center justify-center gap-2.5'>
              <IoIosArrowDropdown size={24} />
              <p className='font-black cursor-pointer'>View More</p>
            </div>
          )}
        </div>

        <div className='border-2 border-black '>
          {Array.from({length : 10}).map((_ , index) => (
            <div key={index} className='p-3 hover:bg-gray-100 cursor-pointer'>
              <div className='flex flex-row justify-between'>
                <p>Rajesh Maurya</p>
                <p>......</p>
                <p>Occupied</p>

              </div>

            </div>
          ))}

        </div>
        </div>


 


    </div>
  )
}
