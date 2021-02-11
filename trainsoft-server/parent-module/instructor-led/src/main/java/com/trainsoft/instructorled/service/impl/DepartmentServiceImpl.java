package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.customexception.InstructorException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.BaseEntity;
import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.entity.Department;
import com.trainsoft.instructorled.entity.VirtualAccount;
import com.trainsoft.instructorled.repository.ICompanyRepository;
import com.trainsoft.instructorled.repository.IDepartmentRepository;
import com.trainsoft.instructorled.repository.IVirtualAccountRepository;
import com.trainsoft.instructorled.service.IDepartmentService;
import com.trainsoft.instructorled.to.DepartmentTO;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.apache.commons.lang.StringUtils;

import java.time.Instant;
import java.util.Date;

@Slf4j
@AllArgsConstructor
@Service
public class DepartmentServiceImpl implements IDepartmentService {
    private IVirtualAccountRepository virtualAccountRepository;
    private ICompanyRepository companyRepository;
    private IDepartmentRepository departmentRepositoryry;
    private DozerUtils mapper;


    @Override
    public DepartmentTO createDepartment(DepartmentTO departmentTO) {
        DepartmentTO savedDepartmentTO = null;
        try {
            if (departmentTO != null && !StringUtils.isEmpty(departmentTO.getCompanySid())) {
                Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(departmentTO.getCompanySid()));
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(departmentTO.getCreatedByVASid()));
                Department department = mapper.convert(departmentTO, Department.class);
                department.generateUuid();
                department.setCompany(company);
                department.setCreatedBy(virtualAccount);
                department.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                savedDepartmentTO = mapper.convert(departmentRepositoryry.save(department), DepartmentTO.class);
                savedDepartmentTO.setCreatedByVASid(virtualAccount.getStringSid());
                savedDepartmentTO.setCompanySid(company.getStringSid());
            }
            return savedDepartmentTO;
        } catch (Exception e) {
            log.info("throwing exception while creating the department");
            throw new InstructorException(HttpStatus.BAD_REQUEST, "throwing exception while creating the department", "");
        }
    }

    @Override
    public DepartmentTO updateDepartment(DepartmentTO departmentTO) {
        return null;
    }

    @Override
    public DepartmentTO getDepartmentBySid(String departmentSid) {
        Department dept= departmentRepositoryry.findDepartmentBySid(BaseEntity.hexStringToByteArray(departmentSid));
        try {
            if (!StringUtils.isEmpty(departmentSid) && dept!=null)
                return mapper.convert(dept,DepartmentTO.class);
            else
                throw new InstructorException(HttpStatus.NOT_FOUND,"department details not available by given sid","");
        }
        catch (Exception e){
            log.info("throwing exception while fetching the department details by sid");
            throw new InstructorException(HttpStatus.NOT_FOUND,"department details not available by given sid","");
        }
    }

    @Override
    public boolean deleteDepartmentBySid(String deptSid,String deletedBySid) {
        Department dept= departmentRepositoryry.findDepartmentBySid(BaseEntity.hexStringToByteArray(deptSid));
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(deletedBySid));
        try{
            if (!StringUtils.isEmpty(deletedBySid) && dept!=null) {
                dept.setStatus(InstructorEnum.Status.DELETED);
                dept.setUpdatedBy(virtualAccount);
                dept.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
                departmentRepositoryry.save(dept);
                log.info(String.format("Department %s is deleted successfully by %s", deletedBySid));
                return true;
            }
            else
                throw new InstructorException(HttpStatus.NOT_FOUND,"department details not available by given sid","");
        }
        catch (Exception e){
            log.info("throwing exception while deleting the department details by sid");
            throw new InstructorException(HttpStatus.NOT_FOUND,"department details not available by given sid","");
        }
    }
}