"use client";
import Image from "next/image";
import Map from "./component/Map";
import React from "react";
import { Header } from "./component/Header";

import axios from "axios";
import { useUserStore } from "./component/zustand";
import { s } from "framer-motion/client";

export default function Home() {
  const setToken = useUserStore((state) => state.setToken);
  const token = useUserStore((state) => state.token);
  const activeCompany = useUserStore((state) => state.activeCompany);
  const setActiveCompany = useUserStore((state) => state.setActiveCompany);

  async function getCompanies() {

    try {
  


      const companies = await axios.get("http://localhost:8080/company/companies", {
        headers: {

          "Authorization": `Bearer ${token}`,
          
        },
        withCredentials: true


      });
      console.log(companies.data);
      console.log(companies.data)
      console.log(companies.data[0].companyId);
      setActiveCompany(companies.data[0].companyId)

    } catch (error) {
      console.log(error);

    }
  };

  React.useEffect(() => {
   
  }, []);
  return (

    <div>
      <p>{token}</p>
      <Header />
      <p>{activeCompany}</p>
      <button onClick={getCompanies}>Get Companies</button>






    </div>
  );
}
