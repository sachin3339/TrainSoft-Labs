package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.commons.CommonUtils;
import com.trainsoft.instructorled.commons.JWTTokenGen;
import com.trainsoft.instructorled.commons.JWTTokenTO;
import com.trainsoft.instructorled.commons.Utility;
import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.customexception.IncorrectEmailIdOrPasswordException;
import com.trainsoft.instructorled.customexception.RecordNotFoundException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.*;
import com.trainsoft.instructorled.repository.*;
import com.trainsoft.instructorled.service.ICompanyService;
import com.trainsoft.instructorled.to.*;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.utility.RandomString;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
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

/*    @Value("spring.mail.username")
    private String emailSenderAddress;*/

    private final JavaMailSender mailSender;

    @Override
    public CompanyTO getCompanyBySid(String sid) {
        Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(sid));
        return mapper.convert(company, CompanyTO.class);
    }

    @Override
    public CompanyTO createCompany(CompanyTO companyTO) {
        long epochMilli = Instant.now().toEpochMilli();
        Company company = mapper.convert(companyTO, Company.class);
        company.generateUuid();
        company.setCreatedOn(new Date(epochMilli));
        company.setStatus(InstructorEnum.Status.DISABLED);
        CompanyTO savedCompanyTO = mapper.convert(companyRepository.save(company), CompanyTO.class);
        return savedCompanyTO;
    }

    @Override
    public CompanyTO createCompanyWithAppUser(CompanyTO companyTO) {
        DepartmentVirtualAccount savedDepartmentVA = null;
        Department savedDepartment = null;
        try {
            if (companyTO!=null) {
                long epochMilli = Instant.now().toEpochMilli();
                Company company = mapper.convert(companyTO, Company.class);
                company.generateUuid();
                company.setCreatedOn(new Date(epochMilli));
                company.setStatus(InstructorEnum.Status.DISABLED);
                Company savedCompany = companyRepository.save(company);
                CompanyTO savedCompanyTO = mapper.convert(savedCompany, CompanyTO.class);

                AppUser appUser = mapper.convert(companyTO.getAppuser(), AppUser.class);
                appUser.generateUuid();
                appUser.setSuperAdmin(false);
                appUser.setName(companyTO.getAppuser().getName());
                appUser.setEmployeeId(companyTO.getAppuser().getEmployeeId());
                appUser.setEmailId(companyTO.getAppuser().getEmailId());
                appUser.setPhoneNumber(companyTO.getAppuser().getPhoneNumber());
                appUser.setAccessType(InstructorEnum.AccessType.ALL);
                appUser.setStatus(InstructorEnum.Status.ENABLED);
                appUser.setPassword(CommonUtils.generatePassword());
                appUser = appUserRepository.save(appUser);

                VirtualAccount virtualAccount = new VirtualAccount();
                virtualAccount.generateUuid();
                virtualAccount.setCompany(savedCompany);
                virtualAccount.setAppuser(appUser);
                virtualAccount.setDesignation("Employee");
                virtualAccount.setStatus(InstructorEnum.Status.ENABLED);
                virtualAccount.setRole(InstructorEnum.VirtualAccountRole.ADMIN);
                virtualAccount = virtualAccountRepository.save(virtualAccount);

                Department departmentObj = new Department();
                departmentObj.generateUuid();
                departmentObj.setCompany(company);
                departmentObj.setName("Default");
                departmentObj.setDescription("Default Department");
                departmentObj.setStatus(InstructorEnum.Status.ENABLED);
                departmentObj.setEmailId(null);
                departmentObj.setLocation(null);
                savedDepartment = departmentRepository.save(departmentObj);

                DepartmentVirtualAccount departmentVirtualAccount = new DepartmentVirtualAccount();
                departmentVirtualAccount.generateUuid();
                departmentVirtualAccount.setVirtualAccount(virtualAccount);
                departmentVirtualAccount.setDepartment(savedDepartment);
                departmentVirtualAccount.setDepartmentRole(InstructorEnum.DepartmentRole.SUPERVISOR);
                savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);

                savedCompanyTO.setCreatedByVASid(virtualAccount.getStringSid());
                companyTO.getAppuser().setSid(virtualAccount.getAppuser().getStringSid());
                companyTO.setSid(virtualAccount.getStringSid());
                companyTO.getDepartmentVA().setSid(savedDepartmentVA.getStringSid());
                companyTO.getDepartmentVA().getDepartment().setSid(savedDepartmentVA.getDepartment().getStringSid());
                //send mail
                return companyTO;
            }else
                throw new RecordNotFoundException();

        } catch (Exception e) {
            throw new ApplicationException("throwing error while creating company");
        }
    }

    @Override
    public UserTO login(String email, String password) {
        JWTTokenTO jwt = new JWTTokenTO();
        AppUser appUsersByEmailAndPassword = appUserRepository.findAppUsersByEmailIdAndPasswordAndStatus
                                             (email, password,InstructorEnum.Status.ENABLED);
        try {
            if (appUsersByEmailAndPassword!=null){
             VirtualAccount virtualAccount= virtualAccountRepository.findVirtualAccountByAppuser(appUsersByEmailAndPassword);
             UserTO userTO = mapper.convert(virtualAccount,UserTO.class);
             userTO.getAppuser().setPassword(null);
              DepartmentVirtualAccount dVA=  departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(virtualAccount);
             userTO.setDepartmentVA(mapper.convert(dVA, DepartmentVirtualAccountTO.class));
             userTO.getDepartmentVA().setDepartment(mapper.convert(dVA.getDepartment(), DepartmentTO.class));
             userTO.setCompanySid(virtualAccount.getCompany().getStringSid());
             jwt.setCompanySid(virtualAccount.getCompany().getStringSid());
             jwt.setEmailId(virtualAccount.getAppuser().getEmailId());
             jwt.setVirtualAccountSid(virtualAccount.getStringSid());
             jwt.setVirtualAccountRole(virtualAccount.getRole().name());
             jwt.setUserSid(virtualAccount.getAppuser().getStringSid());
             userTO.setJwtToken(JWTTokenGen.generateGWTToken(jwt));
             log.info("login Successfully with given user details");
             return userTO;
            }
            else
                throw new IncorrectEmailIdOrPasswordException();
        } catch (Exception e) {
            log.error("throwing error while fetching  user details", e.toString());
            throw new IncorrectEmailIdOrPasswordException();
        }
    }
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
                .append("Your reset password link below:")
                .append(System.lineSeparator())
                .append("User Name : ")
                .append(email)
                .append(System.lineSeparator())
                .append("Reset Password link: ")
                .append("<a href=\"" + link + "\">");
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
            throw  new ApplicationException("Incorrect data,please check the data which you provide");
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
            throw new ApplicationException("Could not find any user with the email ");
        }
    }
    @Override
    public  String generateTokenAndUpdateResetPassToken(String email)
    {
        String token1 = RandomString.make(30);
        updateResetPasswordToken(token1,email);
        return  token1;
    }

    @Override
    public String getAppUserNameByEmail(String email) {
        AppUser appUser = appUserRepository.findAppUsersByEmailId(email);
        return appUser.getName();
    }
}