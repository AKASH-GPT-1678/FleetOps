package com.gupta.fleetops.service;

import com.gupta.fleetops.io.CompanyDTO;
import com.gupta.fleetops.io.CompanyRequest;
import com.gupta.fleetops.io.CompanyResponse;

public interface CompanyService {


    CompanyResponse createCompany(CompanyRequest companyRequest);

    CompanyResponse getAllCompaniesByUser();

    CompanyDTO getCompanyById();



}
