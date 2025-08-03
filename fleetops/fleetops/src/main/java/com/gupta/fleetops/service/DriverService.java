package com.gupta.fleetops.service;


import com.gupta.fleetops.io.CompanyRequest;
import com.gupta.fleetops.io.CompanyResponse;
import com.gupta.fleetops.io.DriverRequestDTO;
import com.gupta.fleetops.io.DriverResponse;

import java.util.List;

public interface DriverService {

    DriverResponse createDriver(DriverRequestDTO driverRequestDTO);

    List<DriverResponse> getMyDrivers();
}
