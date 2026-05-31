package com.gupta.fleetops.controllers;



import com.gupta.fleetops.io.DriverKycRequestDTO;
import com.gupta.fleetops.io.DriverRequestDTO;
import com.gupta.fleetops.io.DriverResponse;
import com.gupta.fleetops.io.response.NewDriverProfileResponse;
import com.gupta.fleetops.service.DriverService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/driver")
public class DriverController {


    private final DriverService driverService;


    public DriverController(DriverService driverService){
        this.driverService = driverService;
    }


    @PostMapping("/register")
    public ResponseEntity<DriverResponse> createDriver(@Valid @RequestBody DriverRequestDTO driverRequestDTO) {
        System.out.println(driverRequestDTO);
        DriverResponse createdDriver = driverService.createDriver(driverRequestDTO);
        return ResponseEntity.ok(createdDriver);

    }

    @GetMapping("myDrivers")
    public ResponseEntity<List<DriverResponse>> getMyDrivers(){

        List<DriverResponse> drivers = driverService.getMyDrivers();
        return ResponseEntity.ok(drivers);


    }

    @PostMapping("/driver/{driverId}/aadhar-kyc")
    public NewDriverProfileResponse driverAadharKYC(
            @PathVariable UUID driverId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("panNumber") String panNumber
    ) {
        return driverService.driverAadharKYC(driverId, file, panNumber);
    }
    @PostMapping("/driver/{driverId}/pan-kyc")
    public NewDriverProfileResponse driverPanKYC(
            @PathVariable UUID driverId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("panNumber") String panNumber
    ) {
        return driverService.driverPanKYC(driverId, file, panNumber);
    }

    @PostMapping(
            value = "/{driverId}/upload-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<NewDriverProfileResponse> uploadDriverImage(
            @PathVariable UUID driverId,
            @RequestParam("file") MultipartFile file
    ) {

        NewDriverProfileResponse response =
                driverService.uploadDriverImage(driverId, file);

        return ResponseEntity.ok(response);
    }

}
