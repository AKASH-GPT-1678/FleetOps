package com.gupta.fleetops.controllers;


import com.gupta.fleetops.io.KafkaMessage;
import com.gupta.fleetops.io.KafkaRequest;
import com.gupta.fleetops.service.KafkaProducerService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;



@RestController
@RequestMapping("/kafka")
public class KafkaController {

    private final KafkaProducerService kafkaProducerService;

    public KafkaController(KafkaProducerService kafkaProducerService){
        this.kafkaProducerService = kafkaProducerService;
    }

    @PostMapping("/send")
    public KafkaMessage sendMessage(@RequestBody KafkaRequest kafkaMessage, HttpServletRequest request) {
        String origin = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        System.out.println("Origin: " + origin);


        System.out.println("Origin: " + origin);

        KafkaMessage newMessage = new KafkaMessage();
        newMessage.setDeliveryId(kafkaMessage.getDeliveryId());
        newMessage.setLat(kafkaMessage.getLat());
        newMessage.setLng(kafkaMessage.getLng());
        newMessage.setTimestamp(new Timestamp(System.currentTimeMillis()));
        newMessage.setShouldSave(kafkaMessage.isShouldSave());
        kafkaProducerService.sendLocation(newMessage);

        return newMessage;
    }
}
