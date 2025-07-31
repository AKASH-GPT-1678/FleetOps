package com.gupta.fleetops.service;

import com.gupta.fleetops.entity.Company;
import com.gupta.fleetops.io.CompanyRequest;
import com.gupta.fleetops.io.CompanyResponse;

import java.util.List;

public interface CompanyService {


    CompanyResponse createCompany(CompanyRequest companyRequest);

    List<CompanyResponse> getAllCompaniesByUser();



}
