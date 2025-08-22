"use client";
import { useEffect } from "react";
import { Dashboard2 } from "./Dashboard2";
import { Company } from "./Company";
export function Dashboard() {

    useEffect(() => {
        console.log("Dashboard");
    })
    return (
        <div className="p-4 flex flex-row">




  

       
            
            <div className="w-full flex flex-row gap-6 p-4">
               
                   <Dashboard2/>
                   <Company/>

            </div>
        </div>
    );
}



            // <div data-header="Dashbord Header" className=" p-3 flex flex-row justify-between">
            //     <div>
            //         <input type="text" placeholder='Search' className='border bg-gray-100 px-6 py-2' />
            //     </div>
            //     <div className="flex flex-row gap-3 items-center">




            //         <FaRegBell size={30} className="cursor-pointer " />
            //         <FaRegClock size={30} className="cursor-pointer" />


            //         <div className="border-red-50 border-2 p-2 flex flex-row  space-x-3 rounded-2xl items-center">
            //             <Image src={Avatar} alt="avatar" className="rounded-full w-[35px] h-[35px]" />
            //             <p>Welcome</p>
            //             <p>Jane</p>

            //         </div>


            //     </div>

            // </div>