package com.gupta.fleetops.controllers;


import com.gupta.fleetops.service.KafkaProducerService;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@RestController
@RequestMapping("/kafka")
public class KafkaController {

    private final KafkaProducerService kafkaProducerService;

    public KafkaController(KafkaProducerService kafkaProducerService){
        this.kafkaProducerService = kafkaProducerService;
    }

    @GetMapping("/send")
    public String sendMessage(@RequestParam String message) {
        kafkaProducerService.sendMessage(message);
        return "Message sent successfully";
    }
}
