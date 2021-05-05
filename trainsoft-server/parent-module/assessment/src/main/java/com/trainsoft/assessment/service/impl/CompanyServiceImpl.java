package com.trainsoft.assessment.service.impl;


import com.trainsoft.assessment.commons.CommonUtils;
import com.trainsoft.assessment.customexception.ApplicationException;
import com.trainsoft.assessment.customexception.IncorrectEmailException;
import com.trainsoft.assessment.customexception.RecordNotFoundException;
import com.trainsoft.assessment.dozer.DozerUtils;
import com.trainsoft.assessment.entity.*;
import com.trainsoft.assessment.repository.*;
import com.trainsoft.assessment.service.ICompanyService;
import com.trainsoft.assessment.to.AppUserTO;
import com.trainsoft.assessment.to.CompanyTO;
import com.trainsoft.assessment.value.InstructorEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.utility.RandomString;
import org.apache.commons.lang3.StringUtils;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Service
@Slf4j
public class CompanyServiceImpl implements ICompanyService {
    private IVirtualAccountRepository virtualAccountRepository;
    private ICompanyRepository companyRepository;
    private IAppUserRepository appUserRepository;
    private IDepartmentRepository departmentRepository;
    private IDepartmentVirtualAccountRepository departmentVARepo;
    private DozerUtils mapper;

    private final JavaMailSender mailSender;

    @Override
    public boolean validateCompany(String name) {
        try {
            List<Company> company=  companyRepository.findCompanyByName(name);
            if(company!=null && company.size()>0){
                return true;
            }else{
                return false;
            }
        }catch (Exception e){
            throw new ApplicationException(e.getMessage());
        }
    }

    @Override
    public void sendEmail(String email,String name,String link) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("trainsoft.ind@gmail.com");
        message.setTo(email);
        String subject = "Reset Password";
        StringBuilder emailContent = new StringBuilder();
        emailContent.append(System.lineSeparator())
                .append("Your reset password details is below:")
                .append(System.lineSeparator())
                .append("User Name : ")
                .append(email)
                .append(System.lineSeparator())
                .append("Reset Password link: ")
                .append(System.lineSeparator())
                .append("\"" + link + "\"");
        emailContent.append(System.lineSeparator())
                .append("Thanks,")
                .append(System.lineSeparator())
                .append(name);
        message.setSubject(subject);
        message.setText(emailContent.toString());
        mailSender.send(message);

    }

    @Override
    public AppUserTO getByResetPasswordToken(String token){
        // Find user by token
        AppUser user=appUserRepository.findAppUsersByTpToken(token);
        if(user.getExpiryDate().toInstant().toEpochMilli()< Instant.now().toEpochMilli())
            throw new ApplicationException("Token has expired or invalid,kindly try again");
        else
            return mapper.convert(user,AppUserTO.class);
    }

    @Override
    public boolean updatePassword(String token,String appUserSid, String newPassword) {
        AppUser appUser= appUserRepository.findAppUserBySidAndTpToken(BaseEntity.hexStringToByteArray(appUserSid),token);
        if (appUser!=null && appUser.getTpToken().equals(token) && !StringUtils.isEmpty(newPassword)){
            appUser.setPassword(newPassword);
            appUser.setResetPassword(false);
            appUserRepository.save(appUser);
            return true;
        }
        else
            throw  new RecordNotFoundException("No Record Found");
    }

    @Override
    public void updateResetPasswordToken(String token, String email){
        AppUser appUser = appUserRepository.findAppUsersByEmailId(email);
        if (appUser != null) {
            appUser.setTpToken(token);
            appUser.setResetPassword(true);
            appUser.setExpiryDate(new Date(Instant.now().plusSeconds(3600).toEpochMilli()));
            appUserRepository.save(appUser);
        } else {
            throw new IncorrectEmailException("Please enter the valid email_address");
        }
    }
    @Override
    public  String generateTokenAndUpdateResetPassToken(String email) {
        String token1 = RandomString.make(30);
        updateResetPasswordToken(token1,email);
        return  token1;
    }

    @Override
    public String getAppUserNameByEmail(String email) {
        AppUser appUser = appUserRepository.findAppUsersByEmailId(email);
        return appUser.getName();
    }

    @Override
    public void sendAssessmentEmail(String email,String name,String link) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("trainsoft.ind@gmail.com");
        message.setTo(email);
        String subject = "Assessment invitation";
        StringBuilder emailContent = new StringBuilder();
        emailContent.append(System.lineSeparator())
                .append("Your Assessment related details is below:")
                .append(System.lineSeparator())
                .append("User Name : ")
                .append(email)
                .append(System.lineSeparator())
                .append("Assessment Invitation link: ")
                .append(System.lineSeparator())
                .append("\"" + link + "\"");
               emailContent.append(System.lineSeparator())
                .append("Thanks,")
                .append(System.lineSeparator())
                .append(name);
        message.setSubject(subject);
        message.setText(emailContent.toString());
        mailSender.send(message);

    }
}