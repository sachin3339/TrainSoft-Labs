package com.trainsoft.assessment.service;


import com.trainsoft.assessment.customexception.IncorrectEmailException;
import com.trainsoft.assessment.to.AppUserTO;

public interface ICompanyService {
      boolean validateCompany(String name);
      void sendEmail(String email,String name,String link);
      AppUserTO getByResetPasswordToken(String token);
      boolean updatePassword(String token,String appUserSid, String newPassword);
      void updateResetPasswordToken(String token, String email) throws IncorrectEmailException;
      String generateTokenAndUpdateResetPassToken(String email) throws IncorrectEmailException;
      String getAppUserNameByEmail(String email);
      void sendAssessmentEmail(String email,String name,String link);
      void sendEmailAndPassword(String email,String password,String name);
}
