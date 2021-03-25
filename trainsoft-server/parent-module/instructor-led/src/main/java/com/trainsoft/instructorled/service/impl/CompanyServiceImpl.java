package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.commons.CommonUtils;
import com.trainsoft.instructorled.commons.JWTTokenGen;
import com.trainsoft.instructorled.commons.JWTTokenTO;
import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.customexception.IncorrectEmailIdOrPasswordException;
import com.trainsoft.instructorled.customexception.RecordNotFoundException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.*;
import com.trainsoft.instructorled.repository.*;
import com.trainsoft.instructorled.service.ICompanyService;
import com.trainsoft.instructorled.to.CompanyTO;
import com.trainsoft.instructorled.to.DepartmentTO;
import com.trainsoft.instructorled.to.DepartmentVirtualAccountTO;
import com.trainsoft.instructorled.to.UserTO;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@AllArgsConstructor
@Service
@Slf4j
public class CompanyServiceImpl implements ICompanyService {
    private IVirtualAccountRepository virtualAccountRepository;
    private ICompanyRepository repository;
    private IAppUserRepository appUserRepository;
    private IDepartmentRepository departmentRepository;
    private IDepartmentVirtualAccountRepository departmentVARepo;
    private DozerUtils mapper;

    @Override
    public CompanyTO getCompanyBySid(String sid) {
        Company company = repository.findCompanyBySid(BaseEntity.hexStringToByteArray(sid));
        return mapper.convert(company, CompanyTO.class);
    }

    @Override
    public CompanyTO createCompany(CompanyTO companyTO) {
        long epochMilli = Instant.now().toEpochMilli();
        Company company = mapper.convert(companyTO, Company.class);
        company.generateUuid();
        company.setCreatedOn(new Date(epochMilli));
        company.setStatus(InstructorEnum.Status.DISABLED);
        CompanyTO savedCompanyTO = mapper.convert(repository.save(company), CompanyTO.class);
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
                Company savedCompany = repository.save(company);
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
}