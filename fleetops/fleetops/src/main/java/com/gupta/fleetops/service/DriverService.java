package com.gupta.fleetops.service;


import com.gupta.fleetops.io.CompanyRequest;
import com.gupta.fleetops.io.CompanyResponse;
import com.gupta.fleetops.io.DriverRequestDTO;
import com.gupta.fleetops.io.DriverResponse;

public interface DriverService {

    DriverResponse createDriver(DriverRequestDTO driverRequestDTO);
}
