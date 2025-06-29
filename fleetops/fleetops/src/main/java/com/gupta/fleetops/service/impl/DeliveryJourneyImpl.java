package com.gupta.fleetops.service.impl;


import com.gupta.fleetops.entity.DeliveryJourney;
import com.gupta.fleetops.repository.JourneyRepository;
import com.gupta.fleetops.service.DeliveryJourneyService;
import org.springframework.stereotype.Service;

@Service
public class DeliveryJourneyImpl implements DeliveryJourneyService {

    private final JourneyRepository journeyRepository;

    public DeliveryJourneyImpl(JourneyRepository journeyRepository) {
        this.journeyRepository = journeyRepository;

    }

    public String saveJourney(DeliveryJourney deliveryJourney) {
        journeyRepository.save(deliveryJourney);
        return "Journey Saved Successfully";


    }

}
