import React from 'react'
import Image from 'next/image'
import Avatar from "../assets/avatar.png"
import { IoMdAttach } from "react-icons/io";
import { SiNike } from "react-icons/si";
import { ImCross } from "react-icons/im";
import { DriverResponse } from '../companydashboard/drivers/page';
import axios from 'axios';
import { useUserStore } from './zustand';
interface DriverProps {
    driver: DriverResponse

}

export const DriverProfile: React.FC<DriverProps> = ({ driver }) => {
    const [showVerification, setShowVerification] = React.useState(false);
    const [aadhaar, setAadhar] = React.useState('');
    const [pan, setPanNumber] = React.useState('');
    const [message, setMessage] = React.useState("");
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BACKEND_URL;
    const token = useUserStore((state) => state.token);

    const handleSubmit = async (e: React.FormEvent, driverId: string, token: string) => {
        e.preventDefault();
        if(aadhaar.length !== 12 || pan.length !== 10) return;

        try {
            const response = await axios.post(`${endpoint}/driver/driverkyc`, {
                driverId: driverId,
                aadhaarNumber: aadhaar,
                panNumber: pan,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("KYC updated successfully:", response.data);


            setMessage("KYC updated successfully!");
        } catch (error) {
            console.error("KYC update failed:", error);
            setMessage("KYC update failed. Please try again.");
        }
    };


    return (


        <div className='p-4 w-full bprder-2 flex flex-col gap-4 '>
            <h1 className='font-bold text-2xl text-gray-400'>{driver.name ?? "Unknown Driver"}</h1>

            <div className='flex flex-row justify-between w-full mt-4 items-center'>

                <div className='flex flex-col'>
                    <strong className='font-bold text-3xl'>{driver.name ? driver.name : "Unknown Driver"}</strong>
                    <p className='font-semibold text-purple-500'>{driver.phoneNumber}</p>
                    <div className='mt-2'>
                        <p className=''>{driver.type}</p>
                        <p className=''>Bombay Mumbra</p>
                    </div>


                </div>
                <div className=' h-full'>
                    <Image src={Avatar} alt='profile' className='rounded-full w-[50%] h-[50%] border-2 ml-auto' />


                </div>

            </div>

            <div id='documents'>
                <p className='text-gray-500 text-2xl font-semibold'>Documents</p>
              <div className='flex flex-col w-full max-h-32 shadow-2xl rounded-2xl'>

  {/* Aadhaar Section */}
  <div className='h-1/2 p-3 flex flex-row justify-between'>
    <div className='flex flex-row gap-2'>
      <IoMdAttach size={30} className='cursor-pointer rotate-24' fill='purple' />
      <a href="https://res.cloudinary.com/dffepahvl/image/upload/v1750699257/iy0qsuyk4urwpnlxzket.jpg" className='text-purple-500 font-semibold'>
        Aadhar Card
      </a>
    </div>
    <div className='flex items-center'>
      <p className='flex flex-row gap-2 text-green-700'>
        {driver.aadharNumber ? "Verified" : "Unverified"}
        {driver.aadharNumber
          ? <SiNike size={24} fill='green' />
          : <ImCross size={20} fill='red' />}
      </p>
    </div>
  </div>

  {/* PAN Section */}
  <div className='h-1/2 p-3 flex flex-row justify-between'>
    <div className='flex flex-row gap-2'>
      <IoMdAttach size={30} className='cursor-pointer rotate-24' fill='purple' />
      <a href="https://res.cloudinary.com/dffepahvl/image/upload/v1750699257/iy0qsuyk4urwpnlxzket.jpg" className='text-purple-500 font-semibold'>
        Pan Card
      </a>
    </div>
    <div className='flex items-center'>
      <p className='flex flex-row gap-2 text-green-700'>
        {driver.panNumber ? "Verified" : "Unverified"}
        {driver.panNumber
          ? <SiNike size={24} fill='green' />
          : <ImCross size={20} fill='red' />}
      </p>
    </div>
  </div>
</div>



            </div>
            <button
                type="submit"
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-fit self-end cursor-pointer"
                onClick={() => setShowVerification(!showVerification)}
            >
                Verify
            </button>


            {
                showVerification &&
                <div className="flex flex-col gap-4 p-4 ">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* PAN Input */}
                        <div className="flex flex-col w-full">
                            <label htmlFor="pan" className="mb-1 text-sm font-medium text-gray-600">PAN Number</label>
                            <input
                                type="text"
                                id="pan"
                                name="pan"
                                maxLength={10}
                                minLength={10}
                                placeholder="ABCDE1234F"
                                className="border border-gray-300 p-2 rounded"
                                onChange={(e) => setPanNumber(e.target.value)}
                                required
                            />
                        </div>


                        <div className="flex flex-col w-full">
                            <label htmlFor="aadhaar" className="mb-1 text-sm font-medium text-gray-600">Aadhaar Number</label>
                            <input
                                type="text"
                                id="aadhaar"
                                name="aadhaar"
                                maxLength={12}
                                minLength={12}
                                pattern="\d{12}"
                                onChange={(e) => setAadhar(e.target.value)}
                                placeholder="123412341234"
                                className="border border-gray-300 p-2 rounded"
                                required
                            />
                        </div>
                    </div>


                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-fit"
                        onClick={(e) => handleSubmit(e, driver.id, token)}

                    >
                        Submit
                    </button>
                </div>
            }




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
