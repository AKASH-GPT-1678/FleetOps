import React from 'react'
import Image from 'next/image'
import Warehouse from "../assets/warehouse2.png"
import Icon from "../assets/cube.png"
import { Header } from '../component/Header'
import { Middle } from '../component/Middle'
import { ConsignMentInfo } from '../component/ConsignmentInfo'
import DriverRegistrationForm from '../component/DriverForm'
import CompanyRegistrationForm from '../component/CompanyForm'
import VehicleRegistrationForm from '../component/VehicleForm'

const page = () => {
 


  return (
    <div className='h-full w-full'>
        <VehicleRegistrationForm/>
   
    </div>
  )
}

export default page
