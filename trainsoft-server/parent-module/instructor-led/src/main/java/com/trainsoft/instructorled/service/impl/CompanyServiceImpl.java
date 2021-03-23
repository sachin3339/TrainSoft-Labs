package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.commons.CommonUtils;
import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.*;
import com.trainsoft.instructorled.repository.*;
import com.trainsoft.instructorled.service.ICompanyService;
import com.trainsoft.instructorled.to.CompanyTO;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@AllArgsConstructor
@Service
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
        //VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(companyTO.getCreatedByVASid()));
        long epochMilli = Instant.now().toEpochMilli();
        Company company = mapper.convert(companyTO, Company.class);
        company.generateUuid();
        company.setCreatedOn(new Date(epochMilli));
        CompanyTO savedCompanyTO = mapper.convert(repository.save(company), CompanyTO.class);
        //savedCompanyTO.setCreatedByVASid(virtualAccount.getStringSid());
        return savedCompanyTO;
    }

    public CompanyTO createCompanyWithAppUser(CompanyTO companyTO) {
        DepartmentVirtualAccount savedDepartmentVA = null;
        Department savedDepartment = null;

        long epochMilli = Instant.now().toEpochMilli();
        Company company = mapper.convert(companyTO, Company.class);
        company.generateUuid();
        company.setCreatedOn(new Date(epochMilli));
        Company savedCompany = repository.save(company);
        CompanyTO savedCompanyTO = mapper.convert(savedCompany, CompanyTO.class);

        AppUser appUser = mapper.convert(companyTO.getAppuser(), AppUser.class);
        appUser.generateUuid();
        appUser.setSuperAdmin(false);
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

        if (companyTO.getDepartmentVA() == null && companyTO.getDepartmentVA().getDepartment() == null) {
            Department departmentObj = new Department();
            departmentObj.generateUuid();
            departmentObj.setCompany(company);
            departmentObj.setName("DEFAULT_DEPARTMENT");
            departmentObj.setDescription("Default Department");
            departmentObj.setStatus(InstructorEnum.Status.ENABLED);
            departmentObj.setEmailId(null);
            departmentObj.setLocation(null);
            savedDepartment = departmentRepository.save(departmentObj);

            DepartmentVirtualAccount departmentVirtualAccount = new DepartmentVirtualAccount();
            departmentVirtualAccount.generateUuid();
            departmentVirtualAccount.setVirtualAccount(virtualAccount);
            departmentVirtualAccount.setDepartment(savedDepartment);
            departmentVirtualAccount.setDepartmentRole(InstructorEnum.DepartmentRole.INSTRUCTOR);
            savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
        }else
            throw new ApplicationException("throwing error while creating department");
        savedCompanyTO.setCreatedByVASid(virtualAccount.getStringSid());
        companyTO.getAppuser().setSid(virtualAccount.getAppuser().getStringSid());
        companyTO.setSid(virtualAccount.getStringSid());
        companyTO.getDepartmentVA().setSid(savedDepartmentVA.getStringSid());
        companyTO.getDepartmentVA().getDepartment().setSid(savedDepartmentVA.getDepartment().getStringSid());
        //send mail
        return companyTO;
        }
}