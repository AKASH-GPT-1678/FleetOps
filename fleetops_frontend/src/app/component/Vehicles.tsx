"use client";
import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import MyVehicle from './MyVehicle';
import Truck1 from "../assets/truck1.png";
import { useUserStore } from './zustand';
import axios from 'axios';
import { Vehicle } from './MyVehicle';
import { get } from 'http';
export const VehiclesSpecs = () => {
    const comapanyId = useUserStore((state) => state.activeCompany);
    const token = useUserStore((state) => state.token);
    const [getData, setGetData] = React.useState(false);
    const [vehicles, setVehicles] = React.useState<Vehicle[]>([])
    const getMyVehicles = async () => {
        try {
            console.log("Company ID:", comapanyId);
            console.log("Token:", token);

            const response = await axios.get(`http://localhost:8080/vehicle/vehicles?companyId=${comapanyId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                withCredentials: true
            });

            console.log("Vehicles fetched successfully:", response.data);
            setVehicles(response.data);
            // You can update state here if needed
        } catch (error) {
            console.error("Error while fetching vehicles:", error);
            // You can show a toast or alert here if needed
        }
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {


        }, 3000); // 3 seconds

        // Optional: cleanup
        return () => clearTimeout(timer);


    }, [getData]);












    return (

        <div className='p-4 bg-gray-100 w-full h-full'>
            <div className='p-3'>
                <button className='py-3 px-10 bg-teal-900 cursor-pointer text-white' onClick={() => getMyVehicles()} >Add New</button>
            </div>

            <div className='flex flex-row'>
                <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-auto h-screen'>
                    {
                        vehicles.map((item, index) => (
                            <div key={index}>
                                <div className='min-w-[200px] md:min-w-[250px] p-2 shadow-2xl'>
                                    <Image src={Truck1.src} width={100} height={100} alt={item.vehicleNumber} className='w-full h-[40%]' />
                                    <p>{item.model}</p>
                                    <p>{item.capacityInKg}</p>
                                    <p>{item.status}</p>
                                </div>



                            </div>

                        ))

                    }
                </div>


                <div>

                    {
                        vehicles.length == 0 ? <p>No Vehicles</p> : <MyVehicle vehicle={vehicles[0]} />
                    }

                </div>
            </div>

        </div>




    )
}
