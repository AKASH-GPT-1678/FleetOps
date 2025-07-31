'use client';
import axios from 'axios';
import React from 'react';
import { useUserStore } from '../component/zustand';

const VerifyTracking = () => {
  const [origin, setOrigin] = React.useState('');
  const [vehicleId, setVehicleId] = React.useState('');
  const comapanyId = useUserStore((state) => state.activeCompany);
  const token = useUserStore((state) => state.token);



  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BACKEND_URL;
  const addOrigin = async (origin: string, vehicleId: string) => {
    try {
      const response = await axios.post(`${endpoint}/origin/add`, { origin: origin.trim(), vehicleId: vehicleId.trim() }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });
      console.log(response.data);

    } catch (error) {

    }

  }

  const verificationVehiclehytbg = async (origin: string, vehicleId: string) => {
    if (!origin || !vehicleId) return;
    try {
      const response = await axios.post(`${origin.trim()}api/verifyvehicle`, { vehicleId: vehicleId.trim() });
      console.log(response.status);
      if (response.status == 200) {
        await addOrigin(origin, vehicleId);
      }

    } catch (error) {
      console.log(error);

    }


  }
  return (
    <div className='flex flex-col gap-4'>
      <input type='text' placeholder='Add your origin' className='p-2 border-1' onChange={(e) => setOrigin(e.target.value)} />
      <input type="text" placeholder='Add your vehicle Id' className='p-2 border-1' onChange={(e) => setVehicleId(e.target.value)} />
      <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer' onClick={() => verificationVehiclehytbg(origin, vehicleId)}>Verify</button>
    </div>
  )
}

export default VerifyTracking;
