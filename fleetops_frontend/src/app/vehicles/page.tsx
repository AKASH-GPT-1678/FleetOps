import React from 'react'
import { VehiclesSpecs } from '../component/Vehicles'
import MyVehicle from '../component/MyVehicle'
import VehicleRegistrationForm from '../component/VehicleForm'

const Vehicles = () => {
  return (
    <div>
    <div className='flex flex-row'>
      <VehiclesSpecs />


   

      
    </div>

    <VehicleRegistrationForm/>
    </div>
  )
}

export default Vehicles
