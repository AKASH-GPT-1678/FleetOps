package com.gupta.fleetops.service.impl;

import com.gupta.fleetops.entity.User;
import com.gupta.fleetops.io.ProfileResponse;
import com.gupta.fleetops.repository.UserRepository;

import com.gupta.fleetops.service.ProfileService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
@Service
public class ActivityServiceImpl implements ProfileService {
    private final UserRepository userRepository;
    public ActivityServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public ProfileResponse loadUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NoSuchElementException("User not found: " + authentication.getName()));


        ProfileResponse profileResponse = new ProfileResponse();
        profileResponse.setEmail(user.getEmail());
        profileResponse.setUsername(user.getUsername());
        profileResponse.setRoles(user.getRoles());
        profileResponse.setId(user.getId());
        profileResponse.setPremium(user.isPremium());


        return profileResponse;
    }

    @Override
    public void saveUserProfile(User user) {


    }
}
