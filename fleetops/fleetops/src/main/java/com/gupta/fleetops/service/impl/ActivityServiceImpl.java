package com.gupta.fleetops.service.impl;

import com.gupta.fleetops.entity.User;
import com.gupta.fleetops.io.ProfileResponse;
import com.gupta.fleetops.io.response.ProfilePicResponse;
import com.gupta.fleetops.repository.UserRepository;

import com.gupta.fleetops.service.FileUploadService;
import com.gupta.fleetops.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;

import java.util.NoSuchElementException;
@Service
public class ActivityServiceImpl implements ProfileService {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private FileUploadService fileService;


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
        profileResponse.setProfileImg(user.getProfileImg());


        return profileResponse;
    }

    @Override
    public void saveUserProfile(User user) {


    }

    @Override
    public ProfilePicResponse uploadProfilePic(MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NoSuchElementException("User not found: " + authentication.getName()));
        String imgUrl = fileService.uploadFile(file);
        user.setProfileImg(imgUrl);
        userRepository.save(user);

        return ProfilePicResponse.builder()
                .message("Profile picture uploaded successfully")
                .imageUrl(imgUrl)
                .fileName(file.getOriginalFilename())
                .fileSize(file.getSize())
                .build();

    }
}
