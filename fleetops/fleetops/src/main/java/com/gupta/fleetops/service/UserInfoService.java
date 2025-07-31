package com.gupta.fleetops.service;


import com.gupta.fleetops.UserInforDetails;
import com.gupta.fleetops.entity.User;
import com.gupta.fleetops.io.AuthRequest;
import com.gupta.fleetops.io.AuthResponse;
import com.gupta.fleetops.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserInfoService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

   public UserInfoService(UserRepository userRepository, PasswordEncoder encoder, JwtService jwtService){
       this.userRepository = userRepository;
       this.passwordEncoder = encoder;
       this.jwtService = jwtService;

   }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new UserInforDetails(user);



    }

    public User createUser(User userInfo){
       User newUser = new User();
       newUser.setEmail(userInfo.getEmail());

       newUser.setUsername(userInfo.getUsername());
       newUser.setEmail(userInfo.getEmail());
       newUser.setRoles(String.valueOf(List.of(userInfo.getRoles())));
       String encodedPassword = passwordEncoder.encode(userInfo.getPassword());
       newUser.setPassword(encodedPassword);

       return userRepository.save(newUser);



    }

    public AuthResponse authenticateUser(AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(),
                            authRequest.getPassword()
                    )
            );


            String token = jwtService.generateToken(authRequest.getEmail());
            return new AuthResponse(true, "Login Successful", token);

        } catch (Exception e) {
            // Authentication failed
            return new AuthResponse(false, "Invalid email or password", null);
        }
    }






}
