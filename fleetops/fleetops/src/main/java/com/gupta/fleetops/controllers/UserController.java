package com.gupta.fleetops.controllers;


import com.gupta.fleetops.entity.UserInfo;
import com.gupta.fleetops.io.AuthRequest;
import com.gupta.fleetops.io.AuthResponse;
import com.gupta.fleetops.service.JwtService;
import com.gupta.fleetops.service.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;



@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserInfoService userInfoService;

    private JwtService jwtService;

    private AuthenticationManager authenticationManager;

    public UserController(UserInfoService userInfoService){
        this.userInfoService = userInfoService;
    }



    @GetMapping("/welcome")
    private String welcome(){
        return "Welcome to World";

    }

    @PostMapping("/adduser")
    public UserInfo addNewUser(@RequestBody UserInfo userInfo) {
        return userInfoService.createUser(userInfo);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUseer(@RequestBody AuthRequest authRequest){
        AuthResponse isVerifed = userInfoService.authenticateUser(authRequest);
        return ResponseEntity.ok().body(isVerifed);
    }



}
