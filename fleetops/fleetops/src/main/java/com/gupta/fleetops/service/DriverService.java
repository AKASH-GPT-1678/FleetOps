package com.gupta.fleetops.service;


import com.gupta.fleetops.io.*;
import com.gupta.fleetops.io.response.NewDriverProfileResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface DriverService {

    DriverResponse createDriver(DriverRequestDTO driverRequestDTO);

    List<DriverResponse> getMyDrivers();

    String driverKYC(DriverKycRequestDTO driver);
    NewDriverProfileResponse uploadDriverImage(UUID driverId, MultipartFile file);
}
