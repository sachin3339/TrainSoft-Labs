package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.entity.BaseEntity;
import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.entity.VirtualAccount;
import com.trainsoft.instructorled.repository.IAppUserRepository;
import com.trainsoft.instructorled.repository.ICompanyRepository;
import com.trainsoft.instructorled.repository.IVirtualAccountRepository;
import com.trainsoft.instructorled.service.ICompanyService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@AllArgsConstructor
@Service
public class CompanyServiceImpl implements ICompanyService {
    private IVirtualAccountRepository virtualAccountRepository;
    private ICompanyRepository repository;

    @Override
    public Company getCompanyBySid(String sid) {
        Company company = repository.findCompanyBySid(BaseEntity.hexStringToByteArray(sid));
        return company;
    }

    @Override
    public Company createCompany(Company company) {
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(company.getCreatedBy().getStringSid()));
        long epochMilli = Instant.now().toEpochMilli();
        Company company1= new Company();
        company1.generateUuid();
        company1.setName(company.getName());
        company1.setEmailId(company.getEmailId());
        company1.setPhoneNumber(company.getPhoneNumber());
        company1.setCreatedBy(virtualAccount);
        company1.setCreatedOn(new Date(epochMilli));
        Company savedCompany = repository.save(company1);
        return savedCompany;
    }
}