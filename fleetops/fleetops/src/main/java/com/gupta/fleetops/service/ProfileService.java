package com.gupta.fleetops.service;

import com.gupta.fleetops.entity.User;
import com.gupta.fleetops.io.ProfileResponse;

public interface ProfileService {
    ProfileResponse loadUserProfile();
    void saveUserProfile(User user);

}
