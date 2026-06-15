import React from 'react'
import Image from 'next/image'
import { Login } from '../component/Login'

const Loginn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="
          w-full
          max-w-6xl
          min-h-[600px]
          bg-white
          rounded-2xl
          shadow-2xl
          overflow-hidden
          flex
          flex-col
          lg:flex-row
        "
      >
        {/* Left Side Image */}
        <div className="hidden lg:flex lg:w-1/2">
          <Image
            src="https://res.cloudinary.com/dffepahvl/image/upload/v1751009225/r0lxzjpiemrkrwrcakbq.png"
            width={500}
            height={500}
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginn;


