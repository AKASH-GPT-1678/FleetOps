package com.gupta.fleetops.service;


import com.gupta.fleetops.io.KafkaMessage;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private static final String TOPIC = "transact";

    private final KafkaTemplate<String,KafkaMessage> kafkaTemplate;

    public KafkaProducerService(KafkaTemplate kafkaTemplate){
        this.kafkaTemplate = kafkaTemplate;
    }

//    public void sendMessage(String message) {
//        kafkaTemplate.send(TOPIC, message);
//        System.out.println("Message sent: " + message);
//    }

    public void sendLocation(KafkaMessage kafkaMessage) {
        kafkaTemplate.send(TOPIC, kafkaMessage);

    }
}
