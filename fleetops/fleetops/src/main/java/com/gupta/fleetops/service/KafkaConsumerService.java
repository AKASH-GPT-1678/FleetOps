package com.gupta.fleetops.service;


import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {


    @KafkaListener(topics = "transact", groupId = "233")
    public void consume(String message) {
        System.out.println("Message received: " + message);
    }
}
