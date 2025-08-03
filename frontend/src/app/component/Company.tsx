import React from 'react'
import { motion } from 'framer-motion'
export const Company = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}

            className=' w-[300px] h-fit xl:w-[350px] rounded-xl p-5 bg-white shadow-xl flex flex-col '


        >
            <h1 className='font-extrabold text-2xl '>Durgesh Enterprises</h1>

            <ul className='text-xl p-3 font-bold text-gray-400'>
                <li className='p-2 hover:border-l-8 hover:border-purple-500 cursor-pointer'>Vehicles Owned: 4</li>
                <li className='p-2 hover:border-l-8 hover:border-purple-500 cursor-pointer'>Drivers Owned: 2</li>
                <li className='p-2 hover:border-l-8 hover:border-purple-500 cursor-pointer'>Total Deliveries: 10</li>
                <li className='p-2 hover:border-l-8 hover:border-purple-500 cursor-pointer'>Unique Clients: 3</li>
                <li className='p-2 hover:border-l-8 hover:border-purple-500 cursor-pointer'>Pending Deliveries: 2</li>
                <li className='p-2 hover:border-l-8 hover:border-purple-500 cursor-pointer'>Average Delivery Time: 42 mins</li>
                <li className='p-2 hover:border-l-8 hover:border-purple-500 cursor-pointer'>Customer Satisfaction: 94%</li>


            </ul>

        </motion.div>

    )
}
