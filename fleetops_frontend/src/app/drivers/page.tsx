import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import Avatar from "../assets/avatar.png"
import { DriversInfo } from '../component/Drivers';
const Drivers = () => {
    return (
        <div className='flex flex-col p-6 w-full'>
            <div className='flex flex-row w-full border-2 p-4 relative justify-between'>

                <div>



                    <IoIosSearch size={35} className="cursor-pointer absolute top-6 left-5" />
                    <input type="text" placeholder='     Search..' className='  px-6 py-3' />
                </div>

                <div className='flex flex-row gap-2 items-center'>
                    <IoFilterSharp size={32}className='cursor-pointer'/>

                    <button className='px-4 py-2.5  flex flex-row items-center ml-4 gap-2 cursor-pointer bg-orange-500 rounded-sm'>
                        <FaPlus fill='white'/>
                        <span className='font-semibold text-white'>Add Driver</span>



                    </button>
                    
                        <img src={Avatar.src} alt="" className='w-12 h-12' />

                </div>


            </div>
            <div>
                <DriversInfo/>
            </div>



        </div>
    )
}

export default Drivers
