import React from 'react'
import { VscThreeBars } from "react-icons/vsc";
import { BsFilterCircle } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import Image from 'next/image';
import Truck1 from "../assets/truckk.png";
import TruckIcon from "../assets/truck1.png";
import { MdOutlineMyLocation } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { IoCallOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import Map from '../component/Map';
const page = () => {
    return (
        <div className='p-4 border-2 w-full h-full flex flex-row'>


            <div className='p-2 flex flex-col w-full border-2 h-screen overflow-auto'>
                <div className='flex flex-row gap-4 items-center min-w-[300px]'>

                    <VscThreeBars size={30} className='cursor-pointer' />
                    <BsFilterCircle size={30} className='cursor-pointer' />
                    <div className='flex flex-row gap-2 items-center justify-center p-2 border rounded-2xl'>
                        <CiLocationOn size={30} className='cursor-pointer' fill='purple' stroke='purple' />
                        <p>New York , US</p>
                    </div>
                </div>

                <div className='mt-5 flex flex-col gap-4'>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className='flex flex-col gap-4 max-w-[300px] rounded-2xl shadow-2xl  2xl:max-w-[600px]  p-4'>

                            <div className='flex flex-row items-center gap-2 justify-between'>
                                <div className='flex flex-row items-center gap-2'>
                                    <Image src={Truck1} alt='trucks' className='w-[30px] h-[30px]' />
                                    <p className='font-bold'>MH-12-AB-3456</p>
                                </div>
                                <div>
                                    <p className='font-semibold px-1 bg-amber-100 rounded-2xl text-amber-400'>On Progress</p>
                                </div>


                            </div>
                            <div className='flex flex-row items-center gap-2 justify-between'>

                                <div>
                                    <MdOutlineMyLocation size={30} className='cursor-pointer' />
                                    <p>California  US</p>
                                    <p className='text-sm text-gray-500'>10:00 AM</p>


                                </div>
                                <div className='border-2 border-dotted w-full'>

                                </div>

                                <div>
                                    <GoLocation size={30} className='cursor-pointer' />
                                    <p>California  US</p>
                                    <p className='text-sm text-gray-500'>10:00 AM</p>


                                </div>


                            </div>

                            <div className=' p-4 m-auto w-full border-2 border-black flex flex-row items-center justify-between
                             rounded-2xl'>
                                <div className='flex flex-row'>
                                    <div>
                                        <Image src={TruckIcon} alt='' className='w-[50px] h-[50px]' />
                                    </div>
                                    <div>
                                        <p className='font-bold'>Driver Name</p>
                                        <p className='text-sm text-gray-500'>Driver Number</p>

                                    </div>

                                </div>
                                <div className='flex flex-row gap-2'>


                                    <IoCallOutline size={30} className='cursor-pointer' />
                                    <FiMessageSquare size={30} className='cursor-pointer' />
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>

               
               {/* <div className='p-2 flex flex-col w-full h-screen'>
                 <Map/>
               </div> */}
        </div>
    )
}

export default page
