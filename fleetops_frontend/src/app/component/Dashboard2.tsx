import React from 'react'
import { motion } from 'framer-motion'
export const Dashboard2 = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}


        >
            <div>

                <div className=' h-[400px] w-[400px]  shadow-2xl rounded-2xl p-4 ml-10'>




                    <div className='flex flex-col gap-4 p-2'>
                        <div className='flex flex-col w-full h-[140px]  bg-gray-100  items-center justify-center '>
                            <p className='text-4xl font-bold'>Available Balance</p>
                            <p className='text-4xl font-bold'>Rs. 1000</p>
                        </div>
                        <div>
                            <p className='text-2xl font-bold'>Transactions</p>
                        </div>
                        <div className='flex flex-row w-full h-[140px] bg-gray-100 rounded-2xl border- items-center justify-around'>
                            <div>
                                <p className='text-4xl font-bold'>Debit</p>
                                <p className='text-2xl font-bold'>Rs. 1000</p>
                            </div>
                            <div>
                                <p className='text-4xl font-bold'>Credit</p>
                                <p className='text-2xl font-bold'>Rs. 1000</p>
                            </div>

                        </div>

                    </div>

                </div>


            </div>
        </motion.div>
    )
}
