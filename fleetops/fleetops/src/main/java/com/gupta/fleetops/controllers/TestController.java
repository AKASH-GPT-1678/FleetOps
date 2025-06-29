package com.gupta.fleetops.controllers;


import com.gupta.fleetops.entity.DeliveryLocation;
import com.gupta.fleetops.service.DeliveryLocationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class TestController {


    private final DeliveryLocationService deliveryLocationService;
    public TestController(DeliveryLocationService deliveryLocationService){
        this.deliveryLocationService = deliveryLocationService;
    }




    @GetMapping("/value")
    public List<DeliveryLocation> test(@RequestParam String deliveryId){
        return deliveryLocationService.getRecentLocation(deliveryId);
    }
}
