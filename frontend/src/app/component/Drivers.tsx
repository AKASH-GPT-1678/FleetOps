"use client";
import React from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { DriverResponse } from '../companyui/drivers';

interface DriversInfoProps {
  driver: DriverResponse[];
}

export const DriversInfo : React.FC<DriversInfoProps> = ({ driver}) => {
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
          {driver.map((item, index) => (
            <div key={index} className='p-3 hover:bg-gray-100 cursor-pointer'>
              <div className='flex flex-row justify-between'>
                <p>{item.name}</p>
                <p>......</p>
                <p>{item.phoneNumber}</p>
                <p>{item.licenseNumber}</p>

              </div>

            </div>
          ))}

        </div>
      </div>





    </div>
  )
}
