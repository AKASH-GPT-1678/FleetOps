package com.gupta.fleetops.controllers;


import com.gupta.fleetops.io.VehicleRequest;
import com.gupta.fleetops.io.VehicleResponseDTO;
import com.gupta.fleetops.service.CompanyService;
import com.gupta.fleetops.service.VehicleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService){
        this.vehicleService = vehicleService;
    }



    @PostMapping("/vehicle")
    public ResponseEntity<VehicleResponseDTO> addVehicle(@RequestBody VehicleRequest vehicleRequest){

        VehicleResponseDTO response = vehicleService.addVehicleToCompany(vehicleRequest);
        return ResponseEntity.ok().body(response);
    }


}
