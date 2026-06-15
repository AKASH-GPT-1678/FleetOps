package com.gupta.fleetops.service;

import com.gupta.fleetops.entity.User;
import com.gupta.fleetops.io.ProfileResponse;
import com.gupta.fleetops.io.response.ProfilePicResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ProfileService {
    ProfileResponse loadUserProfile();
    void saveUserProfile(User user);
    ProfilePicResponse uploadProfilePic(MultipartFile file);


}
