package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.commons.ExcelHelper;
import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.customexception.RecordNotFoundException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.*;
import com.trainsoft.instructorled.repository.*;
import com.trainsoft.instructorled.service.IBatchService;
import com.trainsoft.instructorled.service.IBulkUploadService;
import com.trainsoft.instructorled.to.AppUserTO;
import com.trainsoft.instructorled.to.BatchTO;
import com.trainsoft.instructorled.to.DepartmentVirtualAccountTO;
import com.trainsoft.instructorled.to.UserTO;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Service
public class BulkUploadServiceImpl implements IBulkUploadService {

    IAppUserRepository appUserRepository;
    IBatchParticipantRepository batchParticipantRepository;
    IBatchRepository batchRepository;
    IDepartmentRepository departmentRepository;
    IVirtualAccountRepository virtualAccountRepository;
    ICompanyRepository companyRepository;
    IDepartmentVirtualAccountRepository departmentVARepo;
    DozerUtils mapper;
    IBatchService batchService;

    @Override
    public void uploadParticipants(MultipartFile file, String batchName, String instructorName,String companySid) {
        if (ExcelHelper.hasExcelFormat(file)) {
            try {
                 Batch batch=new Batch();
                 batch.setSid(BaseEntity.generateByteUuid());
                 batch.setName(batchName);
                 batch.setTrainingType(InstructorEnum.TrainingType.valueOf(instructorName));
                 batch.setStatus(InstructorEnum.Status.ENABLED);
                 batch.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                 batch=batchRepository.save(batch);
                 List<UserTO> userTOList = ExcelHelper.excelToUserTO(file.getInputStream());
                 String batchSid=batch.getStringSid();
                 userTOList.forEach(userTO -> {
                     userTO.setCompanySid(companySid);
                   if(StringUtils.isNotEmpty(userTO.getAppuser().getEmailId()))
                     createVirtualAccountByBatch(userTO,batchSid);
                 });

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
        DepartmentVirtualAccount savedDepartmentVA=null;
        Department savedDepartment=null;
        Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(userTO.getCompanySid()));
        VirtualAccount virtualAccount = mapper.convert(userTO,VirtualAccount.class);
        virtualAccount.generateUuid();
        virtualAccount.setCompany(company);
        AppUser appUser=virtualAccount.getAppuser();
        appUser.generateUuid();
        appUser.setSuperAdmin(false);
        appUser.setStatus(InstructorEnum.Status.ENABLED);
        appUser=appUserRepository.save(appUser);
        virtualAccount.setAppuser(appUser);
        virtualAccount.setDesignation("Employee");
        virtualAccount.setStatus(InstructorEnum.Status.ENABLED);
        virtualAccount= virtualAccountRepository.save(virtualAccount);
       // associateVirtualAccountWithBatch(virtualAccount.getId(),batch.getId());
        if(userTO.getDepartmentVA()!=null){
            if(userTO.getDepartmentVA().getDepartment()!=null && StringUtils.isNotEmpty(userTO.getDepartmentVA().getDepartment().getSid())){
                DepartmentVirtualAccount departmentVirtualAccount= new DepartmentVirtualAccount();
                departmentVirtualAccount.generateUuid();
                departmentVirtualAccount.setVirtualAccount(virtualAccount);
                departmentVirtualAccount.setDepartment(departmentRepository.findDepartmentBySid(BaseEntity.hexStringToByteArray(userTO.getDepartmentVA().getDepartment().getSid())));
                departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
            }else if(userTO.getDepartmentVA().getDepartment()!=null &&
                    StringUtils.isEmpty(userTO.getDepartmentVA().getDepartment().getSid()) &&
                    StringUtils.isNotEmpty(userTO.getDepartmentVA().getDepartment().getName())){
                Department department=departmentRepository.findDepartmentByName(userTO.getDepartmentVA().getDepartment().getName());
                if(department!=null) {
                    DepartmentVirtualAccount departmentVirtualAccount= new DepartmentVirtualAccount();
                    departmentVirtualAccount.generateUuid();
                    departmentVirtualAccount.setVirtualAccount(virtualAccount);
                    departmentVirtualAccount.setDepartment(department);
                    departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                    savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
                }else{
                    Department departmentObj=new Department();
                    departmentObj.generateUuid();
                    departmentObj.setCompany(company);
                    departmentObj.setName(userTO.getDepartmentVA().getDepartment().getName());
                    departmentObj.setDescription(userTO.getDepartmentVA().getDepartment().getDescription());
                    departmentObj.setStatus(userTO.getDepartmentVA().getDepartment().getStatus());
                    departmentObj.setEmailId(userTO.getDepartmentVA().getDepartment().getEmailId());
                    departmentObj.setLocation(userTO.getDepartmentVA().getDepartment().getLocation());
                    savedDepartment = departmentRepository.save(departmentObj);
                    DepartmentVirtualAccount departmentVirtualAccount= new DepartmentVirtualAccount();
                    departmentVirtualAccount.generateUuid();
                    departmentVirtualAccount.setVirtualAccount(virtualAccount);
                    departmentVirtualAccount.setDepartment(savedDepartment);
                    departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                    savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
                }

            }else
                throw new ApplicationException("throwing error while creating user");
        }
        userTO.getAppuser().setSid(virtualAccount.getAppuser().getStringSid());
        userTO.setSid(virtualAccount.getStringSid());
        userTO.getDepartmentVA().setSid(savedDepartmentVA.getStringSid());
        userTO.getDepartmentVA().getDepartment().setSid(savedDepartmentVA.getDepartment().getStringSid());
        return userTO;
    }

    @Override
    public UserTO getVirtualAccountByVASid(String virtualAccountSid){
       VirtualAccount account= virtualAccountRepository.findVirtualAccountBySid(
               BaseEntity.hexStringToByteArray(virtualAccountSid));
       UserTO user=mapper.convert(account,UserTO.class);
       DepartmentVirtualAccount dVA= departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(account);
       user.setDepartmentVA(mapper.convert(dVA, DepartmentVirtualAccountTO.class));
       return user;
    }

    @Override
    public List<UserTO> getVirtualAccountByCompanySid(String companySid){
        List<UserTO> list= new ArrayList<>();
        Company company= companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(companySid));
        List<VirtualAccount> virtualAccounts= virtualAccountRepository.findVirtualAccountByCompany(company);
        virtualAccounts.forEach(virtualAccount -> {
            DepartmentVirtualAccount dVA= departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(virtualAccount);
            UserTO user=mapper.convert(virtualAccount,UserTO.class);
            user.getAppuser().setPassword(null);
            user.setDepartmentVA(mapper.convert(dVA, DepartmentVirtualAccountTO.class));
            list.add(user);
        });
        return list;
    }

    private UserTO createVirtualAccountByBatch(UserTO userTO,String batchSid) {
        DepartmentVirtualAccount savedDepartmentVA=null;
        Department savedDepartment=null;
        Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(userTO.getCompanySid()));
        Batch batch=batchRepository.findBatchBySid(BaseEntity.hexStringToByteArray(batchSid));
        VirtualAccount virtualAccount = mapper.convert(userTO,VirtualAccount.class);
        virtualAccount.generateUuid();
        virtualAccount.setCompany(company);
        AppUser appUser=virtualAccount.getAppuser();
        appUser.generateUuid();
        appUser.setSuperAdmin(false);
        appUser.setStatus(InstructorEnum.Status.ENABLED);
        appUser=appUserRepository.save(appUser);
        virtualAccount.setAppuser(appUser);
        virtualAccount.setDesignation("Employee");
        virtualAccount.setStatus(InstructorEnum.Status.ENABLED);
        virtualAccount= virtualAccountRepository.save(virtualAccount);
        BatchParticipant participant= new BatchParticipant();
        participant.generateUuid();
        participant.setVirtualAccount(virtualAccount);
        participant.setBatch(batch);
        participant=batchParticipantRepository.save(participant);
        if(userTO.getDepartmentVA()!=null){
            if(userTO.getDepartmentVA().getDepartment()!=null && StringUtils.isNotEmpty(userTO.getDepartmentVA().getDepartment().getSid())){
                DepartmentVirtualAccount departmentVirtualAccount= new DepartmentVirtualAccount();
                departmentVirtualAccount.generateUuid();
                departmentVirtualAccount.setVirtualAccount(virtualAccount);
                departmentVirtualAccount.setDepartment(departmentRepository.findDepartmentBySid(BaseEntity.hexStringToByteArray(userTO.getDepartmentVA().getDepartment().getSid())));
                departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
            }else if(userTO.getDepartmentVA().getDepartment()!=null &&
                    StringUtils.isEmpty(userTO.getDepartmentVA().getDepartment().getSid()) &&
                    StringUtils.isNotEmpty(userTO.getDepartmentVA().getDepartment().getName())){
                Department department=departmentRepository.findDepartmentByName(userTO.getDepartmentVA().getDepartment().getName());
                if(department!=null) {
                    DepartmentVirtualAccount departmentVirtualAccount= new DepartmentVirtualAccount();
                    departmentVirtualAccount.generateUuid();
                    departmentVirtualAccount.setVirtualAccount(virtualAccount);
                    departmentVirtualAccount.setDepartment(department);
                    departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                    savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
                }else{
                    Department departmentObj=new Department();
                    departmentObj.generateUuid();
                    departmentObj.setCompany(company);
                    departmentObj.setName(userTO.getDepartmentVA().getDepartment().getName());
                    departmentObj.setDescription(userTO.getDepartmentVA().getDepartment().getDescription());
                    departmentObj.setStatus(userTO.getDepartmentVA().getDepartment().getStatus());
                    departmentObj.setEmailId(userTO.getDepartmentVA().getDepartment().getEmailId()==null?null:userTO.getDepartmentVA().getDepartment().getEmailId());
                    departmentObj.setLocation(userTO.getDepartmentVA().getDepartment().getLocation());
                    savedDepartment = departmentRepository.save(departmentObj);
                    DepartmentVirtualAccount departmentVirtualAccount= new DepartmentVirtualAccount();
                    departmentVirtualAccount.generateUuid();
                    departmentVirtualAccount.setVirtualAccount(virtualAccount);
                    departmentVirtualAccount.setDepartment(savedDepartment);
                    departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                    savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
                }

            }else
                throw new ApplicationException("throwing error while creating user");
        }
        userTO.getAppuser().setSid(virtualAccount.getAppuser().getStringSid());
        userTO.setSid(virtualAccount.getStringSid());
        userTO.getDepartmentVA().setSid(savedDepartmentVA.getStringSid());
        userTO.getDepartmentVA().getDepartment().setSid(savedDepartmentVA.getDepartment().getStringSid());
        return userTO;
    }

    private BatchTO saveUserWithBatch(List<UserTO> userTOList,BatchTO batchTO){
      BatchTO batchTO1=  batchService.createBatch(batchTO);
        userTOList.forEach(userTO -> {
            createVirtualAccountByBatch(userTO,batchTO1.getSid());
        });
      return batchTO1;
    }
}
