package com.gupta.fleetops.service.impl;


import com.gupta.fleetops.entity.Company;
import com.gupta.fleetops.entity.UserInfo;
import com.gupta.fleetops.io.CompanyRequest;
import com.gupta.fleetops.io.CompanyResponse;
import com.gupta.fleetops.repository.CompanyRepository;
import com.gupta.fleetops.repository.UserRepository;
import com.gupta.fleetops.service.CompanyService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.NoSuchElementException;

@Service
public class CompanyServiceImpl implements CompanyService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    public CompanyServiceImpl(UserRepository userRepository, CompanyRepository companyRepository){
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }


    @Override
    public CompanyResponse createCompany(CompanyRequest companyRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserInfo user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NoSuchElementException("User not found: " + authentication.getName()));



        ;

        Company newCompany = new Company();
        newCompany.setName(companyRequest.getName());
        newCompany.setCreatedAt(LocalDate.now());
        newCompany.setUser(user);

        companyRepository.save(newCompany);



        CompanyResponse companyResponse = new CompanyResponse();
        companyResponse.setName(newCompany.getName());
        companyResponse.setStatus(true);
        companyResponse.setCompanyId(newCompany.getId());
        return companyResponse;
    }
}
