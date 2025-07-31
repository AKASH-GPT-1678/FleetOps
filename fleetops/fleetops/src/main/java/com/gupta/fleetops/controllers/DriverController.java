package com.gupta.fleetops.controllers;


import com.gupta.fleetops.entity.Driver;
import com.gupta.fleetops.io.DriverRequestDTO;
import com.gupta.fleetops.io.DriverResponse;
import com.gupta.fleetops.service.CompanyService;
import com.gupta.fleetops.service.DriverService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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

}
