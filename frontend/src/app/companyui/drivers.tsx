"use client";
import React from 'react'
import { IoFilterSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import Avatar from "@/app/assets/avatar.png"
import { DriverProfile } from '@/app/component/DriverProfile';
import DriverRegistrationForm from '@/app/component/DriverForm';
import { useUserStore } from '@/app/component/zustand';
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";

import Image from 'next/image';
import axios from 'axios';
import { CompanyTabs } from './tabs/CompanyTab';
import PreviewModal from '../component/modals/PreviewModal';
export interface DriverResponse {
  id: string;
  name: string;
  phoneNumber: string;
  licenseNumber: string;
  type: string;
  dateOfJoining: string; // ISO date string
  companyId: string;
  aadharNumber: string;
  panNumber: string;
  status: string;

}

const Drivers = () => {

  const [showForm, setShowForm] = React.useState(false);
  const registrationRef = React.useRef<HTMLDivElement>(null);
  const [drivers, setDrivers] = React.useState<DriverResponse[]>([]);
  const [activeDriver, setActiveDriver] = React.useState(0);
  const [companyName, setCompanyName] = React.useState('');
  const token = useUserStore((state) => state.token);
  const [viewMore, setviewMore] = React.useState(false);
  const [showPreview , setShowPreview] = React.useState(false);
        const setActiveCompanyPage = useUserStore((state) => state.setActiveCompanyPage);
        const active = useUserStore((state) => state.active_company_page);
        const tabs = CompanyTabs(active);



  const handleActivity = (key: string, route: string) => {
    setActiveCompanyPage(key);
    if (route) {
      window.location.href = route;
    }
  };


  React.useEffect(() => {

    async function getDrivers(token: string) {
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:8080/driver/myDrivers", {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        });

        console.log(response.data);
        setCompanyName(response.data[0].companyName);
        setDrivers(response.data);

      } catch (error) {
        console.log(error);

      }

    };

    getDrivers(token.toString());



  }, [token]);




  // const driver = drivers.filter((driver) => {
  //     return driver.id == activeDriver;
  // });


  return (


    <div className='flex flex-row w-full relative'>

      {/* Sidebar */}
      <div className="p-4 w-full max-w-[300px] hidden md:inline-block lg:max-w-[400px] border-r border-gray-300 bg-white shadow-sm">
        <h1 className="text-3xl font-handwriting font-extrabold text-blue-700 cursor-pointer" onClick={() => handleActivity("drivers", "/")}>FleetOps</h1>

        <div className="mt-6">

          <div className="flex flex-col gap-3">
            {tabs.map((tab, index) => (
              <div
                key={index}
              onClick={() => handleActivity(tab.key, `/company/${tab.key}`)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 cursor-pointer ${tab.key == "drivers" ? "bg-blue-100" : "hover:bg-gray-100"}`}
              >
                {tab.icon}
                <p className={`font-semibold ${tab.key == "drivers" ? "text-blue-600" : "text-gray-600"}`}>
                  {tab.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className='w-full'>

        {/* Top Bar */}
        <div className='p-4 flex justify-between items-center w-full border-b border-gray-200 bg-white shadow-sm'>
          <input
            type="text"
            placeholder='Search...'
            className='px-4 py-2 w-52 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />

          <div className='flex items-center gap-4'>
            <IoFilterSharp size={24} className='cursor-pointer text-gray-600 hover:text-blue-500' />

            <button
              className='flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'
              onClick={() => setShowForm(true)}
            >
              <FaPlus size={20} />
              <span className="text-sm font-medium cursor-pointer" >Add Driver</span>
            </button>

            <Image src={Avatar.src} alt="avatar" width={40} height={40} className='rounded-full cursor-pointer' />
          </div>
        </div>

        {/* Drivers Section */}
        <div className='flex flex-col md:flex-row w-full'>
          <div className='w-full'>

            {drivers.length > 0 ? (
              <div className='p-4'>
                <div className='flex flex-col gap-4 max-w-[600px]'>

                  <div className='flex justify-between'>
                    <p className='font-medium text-gray-700'>{companyName ?? "Unknown"}</p>
                    <p className='font-medium text-gray-700'>Status</p>
                  </div>

                  <div
                    className='bg-gray-100 hover:bg-gray-200 p-3 rounded-lg cursor-pointer text-center transition'
                    onClick={() => setviewMore(!viewMore)}
                  >
                    {viewMore ? (
                      <div className='flex items-center justify-center gap-1 font-semibold text-blue-600'>
                        <IoIosArrowDropup size={20} />
                        View Less
                      </div>
                    ) : (
                      <div className='flex items-center justify-center gap-1 font-semibold text-blue-600'>
                        <IoIosArrowDropdown size={20} />
                        View More
                      </div>
                    )}
                  </div>

                  {/* Driver List */}
                  <div className='overflow-y-auto max-h-[300px] md:max-h-[600px] pr-2'>
                    {drivers.map((item, index) => (
                      <div
                        key={index}
                        className='bg-green-100 hover:bg-green-200 p-3 mb-2 rounded-lg cursor-pointer transition'
                        onClick={() => setActiveDriver(index)}
                      >
                        <div className='flex justify-between'>
                          <p className='font-medium'>{item.name}</p>
                          <p className='text-sm font-medium text-gray-600'>{item.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className='p-4 text-gray-500'>No drivers found</p>
            )}
          </div>

          {/* Driver Profile */}
          {drivers.length > 0 && (
            <div className='w-full'>
              <DriverProfile driver={drivers[activeDriver]} setShowPreview={setShowPreview} />
            </div>
          )}
        </div>

        {/* Registration Form Modal */}
        {showForm && (
          <div className='absolute top-32 left-5 md:left-1/2 transform md:-translate-x-1/2 z-50 bg-white border border-gray-300 p-6 rounded-lg shadow-xl' ref={registrationRef}>
            <DriverRegistrationForm />
          </div>
        )}

      </div>
     {
  showPreview && (
    <div className='fixed inset-0 flex items-center justify-center bg-black/30'>
      <PreviewModal />
    </div>
  )
}
    </div>






  );
};

export default Drivers;
