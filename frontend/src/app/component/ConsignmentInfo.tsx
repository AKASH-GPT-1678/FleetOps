import { BsTruck } from "react-icons/bs";
import Image from "next/image";
import Driver from "../assets/driver.png"
import { FaPhone } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

export function ConsignMentInfo() {
    return (
        <div className="border-2 w-[350px] h-[230px] rounded-xl p-2 hover:border-purple-800 hover:cursor-pointer shadow-2xs">
            <div className="flex flex-row justify-between">

                <div className="flex flex-row gap-2">

                    <BsTruck size={30} fill="purple" />
                    <p className="font-bold color-black">MH-12-AB-3456</p>

                </div>

                <div>
                    <p className="font-bold color-black">Pending</p>
                </div>
            </div>
            <div className="p-3 flex flex-row justify-between items-center">

                <div className="flex flex-col ">
                    <FaLocationCrosshairs size={30} fill="purple" />

                    <div className="flex flex-col text-sm font-bold">
                        <p>Thane</p>
                        <p>400612</p>

                    </div>

                </div>

                <div className="w-full h-[2px] bg-gray-400 border-dotted"></div>
                <div className="flex flex-col ">
                    <FaLocationDot size={30} fill="purple" />

                    <div className="flex flex-col text-sm font-bold">
                        <p>Karjat</p>
                        <p>400612</p>

                    </div>

                </div>

            </div>
            <div className="p-2 border-1 rounded-2xl flex flex-row gap-2 mt-2 items-center justify-between ">



                <div className="flex flex-row gap-2">
                    <div >
                        <Image src={Driver} width={50} height={50} alt="logo" className='object-cover h-[40px] w-[40px] rounded-full' />

                    </div>
                    <div className="flex flex-col">
                        <p className="font-bold color-black">John Doe</p>
                        <p className=" color-black">Driver /courier</p>

                    </div>

                </div>

                <div className="flex flex-row gap-4">
                    <div className="border-1 rounded-xl p-2">
                        <FaPhone size={24} className="cursor-pointer" />
                    </div>
                    <div className="border-1 rounded-xl p-2">
                        <FiMessageSquare size={24} className="cursor-pointer" />
                    </div>
                </div>


            </div>



        </div>
    )
}