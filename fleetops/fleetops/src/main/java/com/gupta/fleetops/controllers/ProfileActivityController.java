package com.gupta.fleetops.controllers;


import com.gupta.fleetops.entity.User;
import com.gupta.fleetops.io.ProfileResponse;
import com.gupta.fleetops.io.response.ProfilePicResponse;
import com.gupta.fleetops.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profile")
public class ProfileActivityController {

    @Autowired
    private ProfileService profileService;





    @GetMapping("/getProfile")
    public ResponseEntity<ProfileResponse> getProfile(){
        ProfileResponse user = profileService.loadUserProfile();
        return ResponseEntity.ok().body(user);
    }
    @PostMapping("/profile-picture")
    public ResponseEntity<ProfilePicResponse> uploadProfilePicture(
            @RequestParam("file") MultipartFile file) {

        ProfilePicResponse response = profileService.uploadProfilePic(file);

        return ResponseEntity.ok(response);
    }


}
