"use client";
import React from 'react'
import CompanyRegistrationForm from '../component/CompanyForm'
import CheckoutButton from '../component/CheckoutButton'
import axios from 'axios'
import { useUserStore } from '../component/zustand'
const RegisterCompany = () => {
    const token = useUserStore((state) => state.token);
    const data = {
        "deliveryId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "lat": "28.6155",
        "lng": "77.2101",
        "timestamp": "2025-08-01 00:12:33.777",
        "shouldSave": false
    }
    async function sendKafkaMessage(data: any, token?: string) {
        try {
            const response = await axios.post("http://localhost:8080/kafka/send", data, {
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            });

            console.log("✅ Kafka message sent:", response.data);
            return response.data;
        } catch (error) {
            console.error("❌ Error sending Kafka message:", error);
            throw error;
        }
    };


    // React.useEffect(() => {
    //     sendKafkaMessage(data, token);
    // }, [token]);



    return (
        <div className='w-full'>
            <CompanyRegistrationForm />
            <CheckoutButton amount={10} />
            <button onClick={() => sendKafkaMessage(data, token)}>Send Kafka Message</button>

        </div>
    )
}

export default RegisterCompany
