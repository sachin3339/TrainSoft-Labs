package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.customexception.RecordNotFoundException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.*;
import com.trainsoft.instructorled.repository.ICompanyRepository;
import com.trainsoft.instructorled.repository.IDepartmentRepository;
import com.trainsoft.instructorled.repository.IVirtualAccountRepository;
import com.trainsoft.instructorled.service.IDepartmentService;
import com.trainsoft.instructorled.to.CourseTO;
import com.trainsoft.instructorled.to.DepartmentTO;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
@Service
public class DepartmentServiceImpl implements IDepartmentService {
    private IVirtualAccountRepository virtualAccountRepository;
    private ICompanyRepository companyRepository;
    private IDepartmentRepository departmentRepository;
    private DozerUtils mapper;


    @Override
    public DepartmentTO createDepartment(DepartmentTO departmentTO) {
        try {
            if (departmentTO != null && !StringUtils.isEmpty(departmentTO.getCompanySid())) {
                Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(departmentTO.getCompanySid()));
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(departmentTO.getCreatedByVASid()));
                Department department = mapper.convert(departmentTO, Department.class);
                department.generateUuid();
                department.setCompany(company);
                department.setUpdatedBy(virtualAccount);
                department.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
                DepartmentTO savedDepartmentTO = mapper.convert(departmentRepository.save(department), DepartmentTO.class);
                savedDepartmentTO.setUpdatedByVASid(virtualAccount.getStringSid());
                return savedDepartmentTO;
            }
            else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.info("throwing exception while creating the department");
            throw new ApplicationException("Something went wrong while creating the department");
        }
    }

    @Override
    public DepartmentTO updateDepartment(DepartmentTO departmentTO) {
        try {
            if (departmentTO != null && !StringUtils.isEmpty(departmentTO.getCompanySid())) {
                Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(departmentTO.getCompanySid()));
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(departmentTO.getCreatedByVASid()));
                Department department = mapper.convert(departmentTO, Department.class);
                department.generateUuid();
                department.setCompany(company);
                department.setCreatedBy(virtualAccount);
                department.setUpdatedOn(new Date(0));
                department.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                DepartmentTO savedDepartmentTO = mapper.convert(departmentRepository.save(department), DepartmentTO.class);
                savedDepartmentTO.setCreatedByVASid(virtualAccount.getStringSid());
                savedDepartmentTO.setCompanySid(company.getStringSid());
                return savedDepartmentTO;
            }
            else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.info("throwing exception while creating the department");
            throw new ApplicationException("Something went wrong while creating the department");
        }
    }

    @Override
    public DepartmentTO getDepartmentBySid(String departmentSid) {
        Department dept= departmentRepository.findDepartmentBySid(BaseEntity.hexStringToByteArray(departmentSid));
        try {
            if (!StringUtils.isEmpty(departmentSid) && dept!=null)
                return mapper.convert(dept,DepartmentTO.class);
            else
                throw new RecordNotFoundException();
        }
        catch (Exception e){
            log.info("throwing exception while fetching the department details by sid");
            throw new ApplicationException("Something went wrong while fetching the department details by sid");
        }
    }

    @Override
    public List<DepartmentTO> getDepartments() {
        try {
            List<Department> departmentList = departmentRepository.findAll();
            return departmentList.stream().map(department -> {
                DepartmentTO to = mapper.convert(department, DepartmentTO.class);
                to.setCreatedByVASid(department.getCreatedBy() == null ? null : department.getCreatedBy().getStringSid());
                to.setUpdatedByVASid(department.getUpdatedBy() == null ? null : department.getUpdatedBy().getStringSid());
                to.setCompanySid(department.getCompany()==null?null:department.getCompany().getStringSid());
                return to;
            }).collect(Collectors.toList());
        }
        catch (Exception e){
            log.info("throwing exception while fetching the department details");
            throw new ApplicationException("Something went wrong while fetching the department details");
        }
    }

    @Override
    public boolean deleteDepartmentBySid(String deptSid,String deletedBySid) {
        Department dept= departmentRepository.findDepartmentBySid(BaseEntity.hexStringToByteArray(deptSid));
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(deletedBySid));
        try{
            if (!StringUtils.isEmpty(deletedBySid) && dept!=null) {
                dept.setStatus(InstructorEnum.Status.DELETED);
                dept.setUpdatedBy(virtualAccount);
                dept.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
                departmentRepository.save(dept);
                log.info(String.format("Department %s is deleted successfully by %s", deptSid,deletedBySid));
                return true;
            }
            else
                throw new RecordNotFoundException();
        }catch (Exception e){
            log.info("throwing exception while deleting the department details by sid");
            throw new ApplicationException("Something went wrong while deleting the department details by sid");
        }
    }
}