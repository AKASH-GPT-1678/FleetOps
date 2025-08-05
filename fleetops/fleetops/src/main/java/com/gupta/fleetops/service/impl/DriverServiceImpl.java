package com.gupta.fleetops.service.impl;


import com.gupta.fleetops.entity.Company;
import com.gupta.fleetops.entity.Driver;
import com.gupta.fleetops.entity.User;
import com.gupta.fleetops.exceptions.AdminPasswordNotMatch;
import com.gupta.fleetops.io.*;
import com.gupta.fleetops.repository.CompanyRepository;
import com.gupta.fleetops.repository.DriverRepository;
import com.gupta.fleetops.repository.UserRepository;
import com.gupta.fleetops.service.DriverService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service

public class DriverServiceImpl implements DriverService {

    private final CompanyRepository companyRepository;
    private final DriverRepository driverRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public DriverServiceImpl( CompanyRepository companyRepository, DriverRepository driverRepository, UserRepository userRepository, PasswordEncoder passwordEncoder){

        this.companyRepository = companyRepository;
        this.driverRepository = driverRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public DriverResponse createDriver(DriverRequestDTO driverRequestDTO) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        Optional<User> user = userRepository.findByEmail(userEmail);
        Company company = companyRepository.findById(driverRequestDTO.getCompanyId())
                .orElseThrow(()-> new NoSuchElementException("Such Company couldn't be found"))


                ;



        if (!passwordEncoder.matches(driverRequestDTO.getAdminPassword(), company.getAdminPassword())) {
            throw new AdminPasswordNotMatch("Admin password does not match.");
        }






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
                savedDriver.getCompany().getId(),
                true,
                savedDriver.getAadharNumber(),
                savedDriver.getPanNumber()


        );
    }

    @Override
    public List<DriverResponse> getMyDrivers() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        Optional<User> user = userRepository.findByEmail(userEmail);

        Company company = user.get().getCompany();

        if(company == null){
            throw new NoSuchElementException("No such Company found");
        }

        List<Driver> drivers = company.getDrivers();
        if(drivers.isEmpty()){
            ArrayList<DriverResponse> emptyList = new ArrayList<>();
            return emptyList;
        }
        List<DriverResponse> driverResponses = drivers.stream()
                .map(driver -> new DriverResponse(
                        driver.getId(),
                        driver.getName(),
                        driver.getPhoneNumber(),
                        driver.getLicenseNumber(),
                        driver.getType(),
                        driver.getDateOfJoining(),
                        driver.getCompany() != null ? driver.getCompany().getId() : null,
                        true,
                        driver.getAadharNumber(),
                        driver.getPanNumber()
                ))
                .collect(Collectors.toList());



        return driverResponses;
    }

    @Override
    public String driverKYC(DriverKycRequestDTO driverKycRequestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NoSuchElementException("User not found: " + authentication.getName()));

        Driver driver = driverRepository.findById(driverKycRequestDTO.getDriverId())
                .orElseThrow(() -> new NoSuchElementException("Driver not found: " +  driverKycRequestDTO.getDriverId() + " for user ID: " + user.getUsername()));



        Company company = user.getCompany();
        if (!company.getDrivers().contains(driver)) {
            throw new NoSuchElementException("Driver is not associated with this company");
        } else {
            // Optional: log or throw an exception
            driver.setAadharNumber(driverKycRequestDTO.getAadhaarNumber());
            driver.setPanNumber(driverKycRequestDTO.getPanNumber());

            driverRepository.save(driver);
        }


        return "KYC VERIFIED SUCCESSFULLY";
    }

}
