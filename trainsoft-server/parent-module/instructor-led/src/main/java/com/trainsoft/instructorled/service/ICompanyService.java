package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.customexception.IncorrectEmailException;
import com.trainsoft.instructorled.to.AppUserTO;
import com.trainsoft.instructorled.to.CompanyTO;
import com.trainsoft.instructorled.to.UserTO;

public interface ICompanyService {
      CompanyTO createCompany(CompanyTO companyTO);
      CompanyTO getCompanyBySid(String sid);
      CompanyTO createCompanyWithAppUser(CompanyTO companyTO);
      UserTO login(String email, String password);
      boolean validateCompany(String name);
      void sendEmail(String email,String name,String link);
      AppUserTO getByResetPasswordToken(String token);
      boolean updatePassword(String token,String appUserSid, String newPassword);
      void updateResetPasswordToken(String token, String email) throws IncorrectEmailException;
      String generateTokenAndUpdateResetPassToken(String email) throws IncorrectEmailException;
      String getAppUserNameByEmail(String email);
}
