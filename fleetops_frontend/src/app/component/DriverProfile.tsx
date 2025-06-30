import React from 'react'
import Image from 'next/image'
import Avatar from "../assets/avatar.png"
import { IoMdAttach } from "react-icons/io";
import { SiNike } from "react-icons/si";
import { ImCross } from "react-icons/im";
export const DriverProfile = () => {
    return (


        <div className='p-4 w-full bprder-2 flex flex-col gap-4 '>
            <h1 className='font-bold text-2xl text-gray-400'>Namaste</h1>

            <div className='flex flex-row justify-between w-full mt-4 items-center'>

                <div className='flex flex-col'>
                    <strong className='font-bold text-3xl'>Harkirat Singh</strong>
                    <p className='font-semibold text-purple-500'>+91 7208563916</p>
                    <div className='mt-2'>
                        <p className=''>Gaondevi SaiKrupa</p>
                        <p className=''>Bombay Mumbra</p>
                    </div>


                </div>
                <div className=' h-full'>
                    <Image src={Avatar} alt='profile' className='rounded-full w-[50%] h-[50%] border-2 ml-auto' />


                </div>

            </div>

            <div id='documents'>
                <p className='text-gray-500 text-2xl font-semibold'>Documents</p>

                <div className='flex flex-col w-full max-h-32  shadow-2xl rounded-2xl'>
                    <div className='h-1/2  p-3 flex flex-row justify-between'>

                        <div className='flex flex-row gap-2'>
                            <IoMdAttach size={30} className='cursor-pointer rotate-24' fill='purple' />
                            <a href="https://res.cloudinary.com/dffepahvl/image/upload/v1750699257/iy0qsuyk4urwpnlxzket.jpg" className='text-purple-500 font-semibold'>Aadhar Card</a>
                        </div>

                        <div className='flex items-center'>
                            <p className='flex flex-row gap-2 text-green-700'>Verified  <SiNike size={24} fill='green' /></p>
                        </div>



                    </div>
                    <div className='h-1/2  p-3 flex flex-row justify-between'>

                        <div className='flex flex-row gap-2'>
                            <IoMdAttach size={30} className='cursor-pointer rotate-24' fill='purple' />
                            <a href="https://res.cloudinary.com/dffepahvl/image/upload/v1750699257/iy0qsuyk4urwpnlxzket.jpg" className='text-purple-500 font-semibold'>Pan Card</a>
                        </div>

                        <div className='flex items-center'>
                            <p className='flex flex-row gap-2 text-green-700'>Unverified  <ImCross size={20} fill='red' /></p>
                        </div>


                    </div>
                </div>



            </div>


            <div>
                <h2 className="text-lg font-bold mb-2">Vehicle Own</h2>

                <div className="flex space-x-4">
                    {/* Car 1 */}
                    <div className="max-w-[200px] max-h-[240px]">
                        <Image
                            src="https://res.cloudinary.com/dffepahvl/image/upload/v1751271131/hft795e7eqnpqhycvfzg.avif"
                            width={200}
                            height={200}
                            alt="Car 1"
                            className="w-full h-auto object-cover rounded shadow"
                        />
                        <p className="text-center mt-2 font-semibold">Car 1</p>
                    </div>

                    {/* Car 2 */}
                    <div className="max-w-[200px] max-h-[240px]">
                        <Image
                            src="https://res.cloudinary.com/dffepahvl/image/upload/v1751271203/naschzwmmyafk0jnt3i7.jpg"
                            width={200}
                            height={200}
                            alt="Car 2"
                            className="w-full h-auto object-cover rounded shadow"
                        />
                        <p className="text-center mt-2 font-semibold">Car 2</p>
                    </div>
                </div>

            </div>

            <div className='w-full mt-6'>
                <button className='p-2 w-full bg-green-300 cursor-pointer rounded-xl'>Namate</button>

            </div>


        </div>

    )
}
