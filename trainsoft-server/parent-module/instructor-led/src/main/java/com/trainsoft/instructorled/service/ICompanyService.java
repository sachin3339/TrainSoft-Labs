package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.AppUserTO;
import com.trainsoft.instructorled.to.CompanyTO;
import com.trainsoft.instructorled.to.UserTO;

public interface ICompanyService {
      CompanyTO createCompany(CompanyTO companyTO);
      CompanyTO getCompanyBySid(String sid);
      CompanyTO createCompanyWithAppUser(CompanyTO companyTO);
      UserTO login(String email, String password);
      boolean validateCompany(String name);

}
