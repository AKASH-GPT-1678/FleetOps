package com.gupta.fleetops.controllers;


import com.gupta.fleetops.entity.NewsletterSubscriber;
import com.gupta.fleetops.entity.VehicleOrigin;
import com.gupta.fleetops.io.OriginDTO;
import com.gupta.fleetops.repository.NewsLetterRepository;
import com.gupta.fleetops.service.OriginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/origin")
@RequiredArgsConstructor
public class OriginController {

    private final OriginService originService;
    private final NewsLetterRepository newsLetterRepository;




    @PostMapping("/add")
    public VehicleOrigin addOrigin(@RequestBody OriginDTO vehicleOrigin){
        System.out.println(vehicleOrigin);
        return originService.addOrigin(vehicleOrigin);
    }

    @PostMapping("/newsletter")
    public ResponseEntity<String> subscribeToNewsletter(@RequestBody String email){
        NewsletterSubscriber newsletterSubscriber = new NewsletterSubscriber();
        newsletterSubscriber.setEmail(email);
        newsletterSubscriber.setSubscribedAt(LocalDateTime.now());
        newsLetterRepository.save(newsletterSubscriber);

        return ResponseEntity.ok().body("Thank you for subscribing to our newsletter");
    }




}
