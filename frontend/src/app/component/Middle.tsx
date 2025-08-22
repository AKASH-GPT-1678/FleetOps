import React from 'react'
import Image from 'next/image'
import Warehouse from "../assets/warehouse2.png"
export const Middle = () => {
    return (
        <div>
            <div className='flex flex-row justify-between items-center'>
                <section className='text-white text-5xl space-y-2 font-extrabold ml-16 p-10 xl:text-7xl'>

                    <h1>Unleashing the Efficiency</h1>
                    <h1>in Logistic Management</h1>
                    <h1>With India&apos;s Leading</h1>
                    <h1>Logistics Brand</h1>
            

                </section>

                <Image src={Warehouse} alt="logo" className='bg-gray-800 w-[500px] h-[500px] xl:h-[700px] xl:w-[700px] mt-[10%]' />

            </div>
        </div>
    )
}
