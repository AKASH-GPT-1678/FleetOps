package com.gupta.fleetops.service.impl;


import com.gupta.fleetops.entity.Company;
import com.gupta.fleetops.entity.User;
import com.gupta.fleetops.exceptions.NotPremiumUserException;
import com.gupta.fleetops.io.CompanyRequest;
import com.gupta.fleetops.io.CompanyResponse;
import com.gupta.fleetops.repository.CompanyRepository;
import com.gupta.fleetops.repository.UserRepository;
import com.gupta.fleetops.service.CompanyService;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompanyServiceImpl implements CompanyService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;

    public CompanyServiceImpl(UserRepository userRepository, CompanyRepository companyRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    @Transactional
    public CompanyResponse createCompany(CompanyRequest companyRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Fetch authenticated user
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NoSuchElementException("User not found: " + authentication.getName()));

        // Check if user already has a company and is not premium
        if (user.getCompany() != null && !user.isPremium()) {
            throw new NotPremiumUserException("Buy Premium to Create More than One Company", false);
        }


        Company newCompany = new Company();
        newCompany.setName(companyRequest.getName());
        newCompany.setAddress(companyRequest.getAddress());
        newCompany.setType(companyRequest.getType());
        newCompany.setAdminEmail(authentication.getName());

        String encodedPassword = passwordEncoder.encode(companyRequest.getAdminPassword());
        newCompany.setAdminPassword(encodedPassword);
        newCompany.setCreatedAt(LocalDate.now());
        newCompany.setPremium(false); // or true if premium applies

        // Step 1: Link both sides of the relationship
        newCompany.setUser(user); // company owns user reference
        user.setCompany(newCompany); // user owns company reference

        // Step 2: Save the company first (optional, you can swap the order)
        companyRepository.save(newCompany);


        userRepository.save(user);

        CompanyResponse companyResponse = new CompanyResponse();
        companyResponse.setName(newCompany.getName());
        companyResponse.setStatus(true);
        companyResponse.setCompanyId(newCompany.getId());
        return companyResponse;
    }


    @Override
    public CompanyResponse getAllCompaniesByUser() {
        // 1. Get logged-in user email
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        // 2. Fetch user from repository
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        Company company = user.getCompany();
        CompanyResponse companyResponse = new CompanyResponse();
        if(company == null){
            throw new NoSuchElementException("No such Company found");
        }

        companyResponse.setName(company.getName());
        companyResponse.setStatus(true);
        companyResponse.setCompanyId(company.getId());

        return companyResponse;
    }



}
