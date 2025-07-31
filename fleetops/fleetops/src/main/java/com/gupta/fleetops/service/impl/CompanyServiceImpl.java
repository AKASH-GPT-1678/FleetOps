package com.gupta.fleetops.service.impl;


import com.gupta.fleetops.entity.Company;
import com.gupta.fleetops.entity.User;
import com.gupta.fleetops.io.CompanyRequest;
import com.gupta.fleetops.io.CompanyResponse;
import com.gupta.fleetops.repository.CompanyRepository;
import com.gupta.fleetops.repository.UserRepository;
import com.gupta.fleetops.service.CompanyService;
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
    public CompanyResponse createCompany(CompanyRequest companyRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NoSuchElementException("User not found: " + authentication.getName()));

        Company newCompany = new Company();
        newCompany.setName(companyRequest.getName());
        newCompany.setAddress(companyRequest.getAddress());
        newCompany.setAdminEmail(authentication.getName());

        String encodedPassword = passwordEncoder.encode(companyRequest.getAdminPassword());
        newCompany.setAdminPassword(encodedPassword);
        newCompany.setType(companyRequest.getType());
        newCompany.setCreatedAt(LocalDate.now());

        // Step 1: Link user to company
        List<User> users = new ArrayList<>();
        users.add(user);
        newCompany.setUsers(users);


        user.getCompanies().add(newCompany);


        companyRepository.save(newCompany);

        userRepository.save(user);

        // Build and return response
        CompanyResponse companyResponse = new CompanyResponse();
        companyResponse.setName(newCompany.getName());
        companyResponse.setStatus(true);
        companyResponse.setCompanyId(newCompany.getId());
        return companyResponse;
    }

    @Override
    public List<CompanyResponse> getAllCompaniesByUser() {
        // 1. Get logged-in user email
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        // 2. Fetch user from repository
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        // 3. Map user's companies to CompanyResponse list
        return user.getCompanies().stream()
                .map(company -> new CompanyResponse(
                        company.getName(),
                        company.isPremium(),
                        company.getId()
                ))
                .collect(Collectors.toList());
    }



}
