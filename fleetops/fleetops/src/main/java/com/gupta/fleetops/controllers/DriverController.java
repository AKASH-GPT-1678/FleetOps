package com.gupta.fleetops.controllers;


import com.gupta.fleetops.entity.Driver;
import com.gupta.fleetops.io.DriverKycRequestDTO;
import com.gupta.fleetops.io.DriverRequestDTO;
import com.gupta.fleetops.io.DriverResponse;
import com.gupta.fleetops.service.DriverService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    @PostMapping("/driverkyc")
    public ResponseEntity<String> driverKYC(@RequestBody DriverKycRequestDTO driverKycRequestDTO){


        String driverKycRequestDTO1 = driverService.driverKYC(driverKycRequestDTO);
        return ResponseEntity.ok(driverKycRequestDTO1);


    }

}
