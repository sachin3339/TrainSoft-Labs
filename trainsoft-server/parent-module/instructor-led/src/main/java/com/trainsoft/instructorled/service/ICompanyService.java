package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.CompanyTO;

public interface ICompanyService {
      CompanyTO createCompany(CompanyTO companyTO);
      CompanyTO getCompanyBySid(String sid);

}
