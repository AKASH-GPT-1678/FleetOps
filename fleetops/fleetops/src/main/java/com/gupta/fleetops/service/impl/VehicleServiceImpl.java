package com.gupta.fleetops.service.impl;

import com.gupta.fleetops.entity.Company;
import com.gupta.fleetops.entity.Vehicle;
import com.gupta.fleetops.io.VehicleRequest;
import com.gupta.fleetops.io.VehicleResponseDTO;
import com.gupta.fleetops.repository.CompanyRepository;
import com.gupta.fleetops.repository.UserRepository;
import com.gupta.fleetops.service.VehicleService;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class VehicleServiceImpl implements VehicleService {
    private final CompanyRepository companyRepository;

    public VehicleServiceImpl(UserRepository userRepository, CompanyRepository companyRepository){

        this.companyRepository = companyRepository;
    }
    @Override
    public VehicleResponseDTO addVehicleToCompany(VehicleRequest vehicleRequest) {
        Company company = companyRepository.findById(vehicleRequest.getCompanyId())
                .orElseThrow(()-> new NoSuchElementException("No Such Company found"))

                ;

        Vehicle newVehicle = new Vehicle();

        newVehicle.setVehicleNumber(vehicleRequest.getVehicleNumber());
        newVehicle.setModel(vehicleRequest.getModel());
        newVehicle.setManufacturer(vehicleRequest.getManufacturer());
        newVehicle.setFuelType(vehicleRequest.getFuelType());
        newVehicle.setCapacityInKg(vehicleRequest.getCapacityInKg());
        newVehicle.setStatus(vehicleRequest.getStatus());
        newVehicle.setRegistrationDate(vehicleRequest.getRegistrationDate());
        newVehicle.setCompany(company);

        VehicleResponseDTO responseDTO = new VehicleResponseDTO();
        responseDTO.setCompanyName(company.getName());
        responseDTO.setVehicleNumber(newVehicle.getVehicleNumber());
        responseDTO.setMessage("Company created Successfully");



        return responseDTO;
    }
}
