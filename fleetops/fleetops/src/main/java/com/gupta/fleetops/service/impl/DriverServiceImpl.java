package com.gupta.fleetops.service.impl;


import com.gupta.fleetops.entity.Company;
import com.gupta.fleetops.entity.Driver;
import com.gupta.fleetops.io.CompanyRequest;
import com.gupta.fleetops.io.CompanyResponse;
import com.gupta.fleetops.io.DriverRequestDTO;
import com.gupta.fleetops.io.DriverResponse;
import com.gupta.fleetops.repository.CompanyRepository;
import com.gupta.fleetops.repository.DriverRepository;
import com.gupta.fleetops.repository.UserRepository;
import com.gupta.fleetops.service.DriverService;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class DriverServiceImpl implements DriverService {

    private final CompanyRepository companyRepository;
    private final DriverRepository driverRepository;


    public DriverServiceImpl( CompanyRepository companyRepository, DriverRepository driverRepository){

        this.companyRepository = companyRepository;
        this.driverRepository = driverRepository;
    }

    @Override
    public DriverResponse createDriver(DriverRequestDTO driverRequestDTO) {

        Company company = companyRepository.findById(driverRequestDTO.getCompanyId())
                .orElseThrow(() -> new NoSuchElementException("Company not found with ID: " + driverRequestDTO.getCompanyId()));

        Driver driver = new Driver();
        driver.setName(driverRequestDTO.getName());
        driver.setPhoneNumber(driverRequestDTO.getPhoneNumber());
        driver.setLicenseNumber(driverRequestDTO.getLicenseNumber());
        driver.setType(driverRequestDTO.getType());
        driver.setDateOfJoining(driverRequestDTO.getDateOfJoining());
        driver.setCompany(company);

        Driver savedDriver = driverRepository.save(driver);

        return new DriverResponse(
                savedDriver.getId(),
                savedDriver.getName(),
                savedDriver.getPhoneNumber(),
                savedDriver.getLicenseNumber(),
                savedDriver.getType(),
                savedDriver.getDateOfJoining(),
                savedDriver.getCompany().getId()
        );
    }

}
