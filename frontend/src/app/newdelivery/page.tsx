"use client";
import React from 'react';
import axios from 'axios';
import { useUserStore } from '../component/zustand';
import { DriverResponse } from '../companyui/drivers';
import { Vehicle } from '../component/MyVehicle';
import Card from '../component/Cards';
import { Button } from '@/components/ui/button';
const YourComponent = () => {
    const [drivers, setDrivers] = React.useState<DriverResponse[]>([]);
    const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
    const [driverId, setDriverId] = React.useState('');
    const [vehicleId, setVehicleId] = React.useState('');
    const token = useUserStore((state) => state.token); // Replace with your token state selector or upda
    const companyId = useUserStore((state) => state.activeCompany);


    React.useEffect(() => {
        if (!token || !companyId) return;

        const fetchData = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                    withCredentials: true
                };

                const [driversRes, vehiclesRes] = await Promise.all([
                    axios.get(`http://localhost:8080/driver/myDrivers`, { headers }),
                    axios.get(`http://localhost:8080/vehicle/vehicles?companyId=${companyId}`, { headers }),
                ]);

                console.log("Drivers:", driversRes.data);
                console.log("Vehicles:", vehiclesRes.data);

                setDrivers(driversRes.data);
                setVehicles(vehiclesRes.data);
            } catch (error) {
                console.error("Error while fetching data:", error);
            }
        };

        fetchData();
    }, [token, companyId]);


    const handleProceed = () => {
        console.log("Driver ID:", driverId);
        console.log("Vehicle ID:", vehicleId);

        if (driverId.length > 5 && vehicleId.length > 5) {
            window.location.href = `/deliveryform?driverId=${driverId}&vehicleId=${vehicleId}`
        }
    }

    return (
        <div className='relative'>

            <div className='absolute top-5 right-5'>
                <Button className='px-6 py-3' onClick={handleProceed}>Proceed</Button>

            </div>
            <div>
                {drivers.map((driver, index) => (
                    <div onClick={() => setDriverId(driver.id)} key={index}>
                        <Card
                            key={index}
                            title={driver.name}
                            subtitle={driver.phoneNumber}
                            details={[
                                `Phone: ${driver.phoneNumber}`,
                                `Joined: ${driver.dateOfJoining}`,
                                `Type: ${driver.type}`
                            ]}
                        />
                    </div>
                ))}
            </div>
            <div>
                <div className='flex flex-row gap-4'>
                    {vehicles.map((vehicle) => (

                        <div onClick={() => setVehicleId(vehicle.id)}>
                            <Card
                                key={vehicle.id}
                                title={vehicle.vehicleNumber}
                                subtitle={vehicle.model}
                                details={[
                                    `Type: ${vehicle.type}`,
                                    `Fuel: ${vehicle.fuelType}`,
                                    `Capacity: ${vehicle.capacityInKg} kg`,
                                    `Status: ${vehicle.status}`
                                ]}
                            />
                        </div>
                    ))}
                </div>

            </div>
            


        </div>
    );
};

export default YourComponent;
