package com.gupta.fleetops.controllers;


import com.gupta.fleetops.entity.DeliveryLocation;
import com.gupta.fleetops.io.VehicleRequest;
import com.gupta.fleetops.io.VehicleResponseDTO;
import com.gupta.fleetops.service.CompanyService;
import com.gupta.fleetops.service.DeliveryLocationService;
import com.gupta.fleetops.service.VehicleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class VehicleController {

    private final VehicleService vehicleService;
    private final DeliveryLocationService deliveryLocationService;

    public VehicleController(VehicleService vehicleService, DeliveryLocationService deliveryLocationService){
        this.vehicleService = vehicleService;
        this.deliveryLocationService = deliveryLocationService;
    }



    @PostMapping("/vehicle")
    public ResponseEntity<VehicleResponseDTO> addVehicle(@RequestBody VehicleRequest vehicleRequest){

        VehicleResponseDTO response = vehicleService.addVehicleToCompany(vehicleRequest);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/location")
    public DeliveryLocation getDate(@RequestParam String deliveryId){
        System.out.println("Recived");
        return deliveryLocationService.getLatestLocation(deliveryId);


    }


}
