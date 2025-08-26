"use client";
import React from "react";
import { Header } from "./component/Header";
import axios from "axios";
import { useUserStore } from "./component/zustand";
import FleetLandingPage from "./component/FleetlandingPage";


export default function Home() {

  const token = useUserStore((state) => state.token);
  const setActiveCompany = useUserStore((state) => state.setActiveCompany);
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BACKEND_URL;




  React.useEffect(() => {
    async function checkToken(token: string) {
      console.log("Token:", token);
      if (!token) return;

      try {
        const response = await axios.get(`${endpoint}/auth/checkToken`, {
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



        const companies = await axios.get(`${endpoint}/company/companies`, {
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