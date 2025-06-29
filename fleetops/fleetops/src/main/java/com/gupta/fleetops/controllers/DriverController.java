package com.gupta.fleetops.controllers;


import com.gupta.fleetops.entity.Driver;
import com.gupta.fleetops.io.DriverRequestDTO;
import com.gupta.fleetops.io.DriverResponse;
import com.gupta.fleetops.service.CompanyService;
import com.gupta.fleetops.service.DriverService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class DriverController {


    private final DriverService driverService;


    public DriverController(DriverService driverService){
        this.driverService = driverService;
    }


    @PostMapping("/driver")
    public ResponseEntity<DriverResponse> createDriver(@Valid @RequestBody DriverRequestDTO driverRequestDTO) {
        DriverResponse createdDriver = driverService.createDriver(driverRequestDTO);
        return ResponseEntity.ok(createdDriver);

    }
}
