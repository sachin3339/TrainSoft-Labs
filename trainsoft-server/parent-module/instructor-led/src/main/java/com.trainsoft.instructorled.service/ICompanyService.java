package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.entity.Company;

public interface ICompanyService {
      Company getCompanyBySid(String sid);
      Company createCompany(Company company);

}
