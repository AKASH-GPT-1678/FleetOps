import React from 'react'
import Image from 'next/image'
import { Login } from '../component/Login'

const Loginn = () => {
  return (
     <div className='h-screen flex items-center justify-center'>
        <div className='xl:h-[800px] xl:w-[800px] lg:w-[650px] lg:h-[650px] w-[400px] h-fit mb-20  flex flex-row p-2 rounded-2xl shadow-2xl shadow-teal-900 ----'>
          <div className='w-1/2 flex-col p-4  bg-cover hidden lg:block'>
          <Image src={"https://res.cloudinary.com/dffepahvl/image/upload/v1751009225/r0lxzjpiemrkrwrcakbq.png"} width={400} height={400} alt="logo" className='object-cover h-full w-full' />
          
          </div>
          <div className='lg:w-1/2 w-full  flex-col p-4 mt-20  '>
          {/* <Regsiter/> */}
          <Login/>
          
          </div>
        </div>
   
    </div>
  )
}

export default Loginn


