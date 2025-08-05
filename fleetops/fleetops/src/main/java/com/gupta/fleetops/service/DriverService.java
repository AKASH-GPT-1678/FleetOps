package com.gupta.fleetops.service;


import com.gupta.fleetops.io.*;

import java.util.List;
import java.util.UUID;

public interface DriverService {

    DriverResponse createDriver(DriverRequestDTO driverRequestDTO);

    List<DriverResponse> getMyDrivers();

    String driverKYC(DriverKycRequestDTO driver);
}
