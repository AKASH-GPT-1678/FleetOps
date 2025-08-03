package com.gupta.fleetops.service.impl;


import com.gupta.fleetops.entity.Company;
import com.gupta.fleetops.entity.Driver;
import com.gupta.fleetops.entity.User;
import com.gupta.fleetops.exceptions.AdminPasswordNotMatch;
import com.gupta.fleetops.io.CompanyRequest;
import com.gupta.fleetops.io.CompanyResponse;
import com.gupta.fleetops.io.DriverRequestDTO;
import com.gupta.fleetops.io.DriverResponse;
import com.gupta.fleetops.repository.CompanyRepository;
import com.gupta.fleetops.repository.DriverRepository;
import com.gupta.fleetops.repository.UserRepository;
import com.gupta.fleetops.service.DriverService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
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
                savedDriver.getCompany().getId()
        );
    }

    @Override
    public List<DriverResponse> getMyDrivers() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        Optional<User> user = userRepository.findByEmail(userEmail);

        Company company = user.get().getCompanies().get(0);

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
                        driver.getCompany() != null ? driver.getCompany().getId() : null
                ))
                .collect(Collectors.toList());



        return driverResponses;
    }

}
