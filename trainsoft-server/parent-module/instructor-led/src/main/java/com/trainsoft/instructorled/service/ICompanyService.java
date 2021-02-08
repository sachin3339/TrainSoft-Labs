package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.CompanyTO;

public interface ICompanyService {
      CompanyTO getCompanyBySid(String sid);
      CompanyTO createCompany(CompanyTO companyTO);

}
