import React from 'react'
import Image from 'next/image'
import Warehouse from "../assets/warehouse2.png"
import Icon from "../assets/cube.png"
import { Header } from '../component/Header'
import { Middle } from '../component/Middle'
const page = () => {
 


  return (
    <div className=' bg-gray-800 h-full'>
   
       <Header/>
       <Middle/>
    </div>
  )
}

export default page
