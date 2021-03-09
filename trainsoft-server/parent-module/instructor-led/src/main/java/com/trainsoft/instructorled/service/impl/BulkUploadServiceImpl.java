package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.commons.ExcelHelper;
import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.customexception.RecordNotFoundException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.*;
import com.trainsoft.instructorled.repository.*;
import com.trainsoft.instructorled.service.IBulkUploadService;
import com.trainsoft.instructorled.to.AppUserTO;
import com.trainsoft.instructorled.to.UserTO;
import com.trainsoft.instructorled.to.VirtualAccountTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@Service
public class BulkUploadServiceImpl implements IBulkUploadService {

    IAppUserRepository appUserRepository;
    IDepartmentRepository departmentRepository;
    IVirtualAccountRepository virtualAccountRepository;
    ICompanyRepository companyRepository;
    IDepartmentVirtualAccountRepository departmentVARepo;
    DozerUtils mapper;

    @Override
    public void save(MultipartFile file) {
        if (ExcelHelper.hasExcelFormat(file)) {
            try {
                List<AppUser> appUserList = ExcelHelper.excelToAppUsers(file.getInputStream());
                appUserRepository.saveAll(appUserList);
            } catch (IOException e) {
                throw new ApplicationException("fail to store excel data: " + e.getMessage());
            }
        }
    }

    @Override
    public List<AppUserTO> getAllAppUsers() {
        List<AppUser> appUserList= appUserRepository.findAll();
        if (appUserList.isEmpty())
          throw new RecordNotFoundException();
        else
           return mapper.convertList(appUserList,AppUserTO.class);
    }

    @Override
    public UserTO createVirtualAccount(UserTO userTO) {
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(
                BaseEntity.hexStringToByteArray(userTO.getVirtualAccount().getSid()));
        Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(userTO.getVirtualAccount().getCompanySid()));
        Department department = departmentRepository.findDepartmentBySid(BaseEntity.hexStringToByteArray(userTO.getDepartmentVirtualAccount().
                        getDepartment().getSid()));

        AppUser user= new AppUser();
        user.generateUuid();
        user.setName(userTO.getAppUser().getName());
        user.setEmployeeId(userTO.getAppUser().getEmployeeId());
        user.setEmailId(userTO.getAppUser().getEmailId());
        user.setPhoneNumber(userTO.getAppUser().getPhoneNumber());
        user.setAccessType(userTO.getAppUser().getAccessType());
        appUserRepository.save(user);

        Department departmentObj= new Department();
        Department savedDepartment=null;
        if(!userTO.getDepartmentVirtualAccount().getDepartment().getName().
                equals(departmentRepository.findDepartmentByName(userTO.getDepartmentVirtualAccount().getDepartment().getName()))) {
            departmentObj.generateUuid();
            departmentObj.setCompany(company);
            departmentObj.setName(userTO.getDepartmentVirtualAccount().getDepartment().getName());
            departmentObj.setDescription(userTO.getDepartmentVirtualAccount().getDepartment().getDescription());
            departmentObj.setStatus(userTO.getDepartmentVirtualAccount().getDepartment().getStatus());
            departmentObj.setEmailId(userTO.getDepartmentVirtualAccount().getDepartment().getEmailId());
            departmentObj.setLocation(userTO.getDepartmentVirtualAccount().getDepartment().getLocation());
            savedDepartment = departmentRepository.save(departmentObj);
        }
        DepartmentVirtualAccount departmentVirtualAccount= new DepartmentVirtualAccount();
        departmentVirtualAccount.setVirtualAccount(virtualAccount);
        departmentVirtualAccount.setDepartment(departmentRepository.findDepartmentByName(userTO.getDepartmentVirtualAccount().
                getDepartment().getName())==null?savedDepartment:department);
        departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVirtualAccount().getDepartmentRole());
        DepartmentVirtualAccount savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
        return null;
    }
}
