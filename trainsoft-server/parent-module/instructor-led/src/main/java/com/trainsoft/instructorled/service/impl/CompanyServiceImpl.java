package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.BaseEntity;
import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.entity.VirtualAccount;
import com.trainsoft.instructorled.repository.ICompanyRepository;
import com.trainsoft.instructorled.repository.IVirtualAccountRepository;
import com.trainsoft.instructorled.service.ICompanyService;
import com.trainsoft.instructorled.to.CompanyTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@AllArgsConstructor
@Service
public class CompanyServiceImpl implements ICompanyService {
    private IVirtualAccountRepository virtualAccountRepository;
    private ICompanyRepository repository;
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
        //company.setCreatedBy(virtualAccount);
        company.setCreatedOn(new Date(epochMilli));
        CompanyTO savedCompanyTO = mapper.convert(repository.save(company), CompanyTO.class);
        //savedCompanyTO.setCreatedByVASid(virtualAccount.getStringSid());
        return savedCompanyTO;
    }


}