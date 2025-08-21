"use client";
import Image from "next/image";
import Map from "./component/Map";
import React from "react";
import { Header } from "./component/Header";

import axios from "axios";
import { useUserStore } from "./component/zustand";
import { s } from "framer-motion/client";
import FleetLandingPage from "./component/FleetlandingPage";
import { set } from "zod/v4-mini";


export default function Home() {
  const setToken = useUserStore((state) => state.setToken);
  const token = useUserStore((state) => state.token);
  const activeCompany = useUserStore((state) => state.activeCompany);
  const setActiveCompany = useUserStore((state) => state.setActiveCompany);
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);




  React.useEffect(() => {
    async function checkToken(token: string) {
      console.log("Token:", token);
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:8080/auth/checkToken", {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        });
        console.log(response.data);
        setIsAuthenticated(response.data.status);
      } catch (error) {
        console.error("Error while checking token:", error);
        setIsAuthenticated(false);

      }

    };
    async function getCompanies(token: string) {
      console.log("iam company", token);

      try {



        const companies = await axios.get("http://localhost:8080/company/companies", {
          headers: {

            "Authorization": `Bearer ${token}`,
            // "Content-Type": "application/json"

          },
          withCredentials: true


        });
        console.log(companies.data);
        console.log(companies.data);


        setActiveCompany(companies.data.companyId)

      } catch (error) {
        console.log(error);
        setActiveCompany("");
        return null;

      }
    };

    getCompanies(token.toString());
    checkToken(token.toString());


  }, [token]);



  return (

    <div>


      <Header />

      <FleetLandingPage />








    </div>
  );
}   