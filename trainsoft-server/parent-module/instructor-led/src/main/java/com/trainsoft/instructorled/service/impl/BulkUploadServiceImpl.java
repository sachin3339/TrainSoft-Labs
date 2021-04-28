package com.trainsoft.instructorled.service.impl;
import com.trainsoft.instructorled.commons.CommonUtils;
import com.trainsoft.instructorled.commons.ExcelHelper;
import com.trainsoft.instructorled.commons.Utility;
import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.customexception.RecordNotFoundException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.*;
import com.trainsoft.instructorled.repository.*;
import com.trainsoft.instructorled.service.IBatchService;
import com.trainsoft.instructorled.service.IBulkUploadService;
import com.trainsoft.instructorled.service.ICompanyService;
import com.trainsoft.instructorled.to.AppUserTO;
import com.trainsoft.instructorled.to.BatchTO;
import com.trainsoft.instructorled.to.DepartmentVirtualAccountTO;
import com.trainsoft.instructorled.to.UserTO;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class BulkUploadServiceImpl implements IBulkUploadService {

    private final IAppUserRepository appUserRepository;
    private final IBatchParticipantRepository batchParticipantRepository;
    private final IBatchRepository batchRepository;
    private final IDepartmentRepository departmentRepository;
    private final IVirtualAccountRepository virtualAccountRepository;
    private final ICompanyRepository companyRepository;
    private final IDepartmentVirtualAccountRepository departmentVARepo;
    private final DozerUtils mapper;
    private final IBatchService batchService;
    private final ICompanyService companyService;

    @Value("${app.zoom.companySid}")
    private  String companySid;

    @Value("${app.zoom.departmentSid}")
    private  String departmentSid;

    @Override
    public void uploadParticipantsWithBatch(MultipartFile file, String batchName, String instructorName,String companySid,
                                            HttpServletRequest request,String vASid) {
       VirtualAccount virtualAccount= virtualAccountRepository.findVirtualAccountBySidAndCompanyAndStatusNot(BaseEntity.hexStringToByteArray(vASid),getCompany(companySid),
                                                                       InstructorEnum.Status.DELETED);
        if (file!=null && ExcelHelper.hasExcelFormat(file)) {
            try {
                 Batch batch=new Batch();
                 batch.setSid(BaseEntity.generateByteUuid());
                 batch.setName(batchName);
                 batch.setTrainingType(InstructorEnum.TrainingType.valueOf(instructorName));
                 batch.setStatus(InstructorEnum.Status.ENABLED);
                 batch.setCreatedBy(virtualAccount);
                 batch.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                 batch.setUpdatedOn(null);
                 batch.setCompany(getCompany(companySid));
                 batch=batchRepository.save(batch);
                 List<UserTO> userTOList = ExcelHelper.excelToUserTO(file.getInputStream());
                 String batchSid=batch.getStringSid();
                 userTOList.forEach(userTO -> {
                     userTO.setCompanySid(companySid);
                   if(StringUtils.isNotEmpty(userTO.getAppuser().getEmailId()))
                     createVirtualAccountByBatch(userTO,batchSid,request);
                 });

            } catch (IOException e) {
                log.error("while creating batch and uploading participiant throwing error",e.toString());
                throw new ApplicationException("fail to store excel data: " + e.getMessage());
            }
        }
        else {
            Batch batch=new Batch();
            batch.setSid(BaseEntity.generateByteUuid());
            batch.setName(batchName);
            batch.setTrainingType(InstructorEnum.TrainingType.valueOf(instructorName));
            batch.setStatus(InstructorEnum.Status.ENABLED);
            batch.setCreatedBy(virtualAccount);
            batch.setCreatedOn(new Date(Instant.now().toEpochMilli()));
            batch.setUpdatedOn(null);
            batch.setCompany(getCompany(companySid));
            batch=batchRepository.save(batch);
            log.info("batch created without uploading participants list");
        }
    }

    private Company getCompany(String companySid){
        Company c=companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(companySid));
        Company company=new Company();
        company.setId(c.getId());
        return company;
    }

    @Override
    public List<AppUserTO> getAllAppUsers(String companySid) {
        List<AppUser> appUserList= appUserRepository.findAppUserByCompanySidAndStatus(BaseEntity.hexStringToByteArray(companySid), InstructorEnum.Status.DELETED);
        if (appUserList.isEmpty())
            throw new RecordNotFoundException("No record found");
        else
           return mapper.convertList(appUserList,AppUserTO.class);
    }

    @Override
    public UserTO createVirtualAccount(UserTO userTO,HttpServletRequest request) {
        DepartmentVirtualAccount savedDepartmentVA=null;
        Department savedDepartment=null;
        List<VirtualAccount> virtualAccounts = virtualAccountRepository.findVirtualAccountByEmailId(userTO.getAppuser().getEmailId());
        VirtualAccount virtualAccount = null;
        if(userTO.getCompanySid()!=null) {
            Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(userTO.getCompanySid()));
            if (virtualAccounts == null || virtualAccounts.size() == 0) {
                virtualAccount = mapper.convert(userTO, VirtualAccount.class);
                virtualAccount.generateUuid();
                virtualAccount.setCompany(company);
                virtualAccount.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                AppUser appUser = virtualAccount.getAppuser();
                appUser.generateUuid();
                appUser.setSuperAdmin(false);
                appUser.setStatus(InstructorEnum.Status.ENABLED);
                appUser = appUserRepository.save(appUser);
                virtualAccount.setAppuser(appUser);
                virtualAccount.setDesignation("Employee");
                virtualAccount.setStatus(InstructorEnum.Status.ENABLED);
                virtualAccount = virtualAccountRepository.save(virtualAccount);
                if (userTO.getDepartmentVA() != null) {
                    if (userTO.getDepartmentVA().getDepartment() != null && StringUtils.isNotEmpty(userTO.getDepartmentVA().getDepartment().getSid())) {
                        DepartmentVirtualAccount departmentVirtualAccount = new DepartmentVirtualAccount();
                        departmentVirtualAccount.generateUuid();
                        departmentVirtualAccount.setVirtualAccount(virtualAccount);
                        departmentVirtualAccount.setDepartment(departmentRepository.findDepartmentBySidAndStatusNot(BaseEntity.hexStringToByteArray(userTO.getDepartmentVA().getDepartment().getSid()), InstructorEnum.Status.DELETED));
                        departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                        savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
                    } else if (userTO.getDepartmentVA().getDepartment() != null &&
                            StringUtils.isEmpty(userTO.getDepartmentVA().getDepartment().getSid()) &&
                            StringUtils.isNotEmpty(userTO.getDepartmentVA().getDepartment().getName())) {
                        Department department = departmentRepository.findDepartmentByNameAndStatusNotAndCompany(userTO.getDepartmentVA().getDepartment().getName(), InstructorEnum.Status.DELETED, company);
                        if (department != null) {
                            DepartmentVirtualAccount departmentVirtualAccount = new DepartmentVirtualAccount();
                            departmentVirtualAccount.generateUuid();
                            departmentVirtualAccount.setVirtualAccount(virtualAccount);
                            departmentVirtualAccount.setDepartment(department);
                            departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                            savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
                        } else {
                            Department departmentObj = new Department();
                            departmentObj.generateUuid();
                            departmentObj.setCompany(company);
                            departmentObj.setName(userTO.getDepartmentVA().getDepartment().getName());
                            departmentObj.setDescription(userTO.getDepartmentVA().getDepartment().getDescription());
                            departmentObj.setStatus(InstructorEnum.Status.ENABLED);
                            departmentObj.setEmailId(userTO.getDepartmentVA().getDepartment().getEmailId());
                            departmentObj.setLocation(userTO.getDepartmentVA().getDepartment().getLocation());
                            savedDepartment = departmentRepository.save(departmentObj);
                            DepartmentVirtualAccount departmentVirtualAccount = new DepartmentVirtualAccount();
                            departmentVirtualAccount.generateUuid();
                            departmentVirtualAccount.setVirtualAccount(virtualAccount);
                            departmentVirtualAccount.setDepartment(savedDepartment);
                            departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                            savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
                        }
                    }
                }
                String token1 = companyService.generateTokenAndUpdateResetPassToken(virtualAccount.getAppuser().getEmailId());
                // String resetPasswordLink = Utility.getSiteURL(request).replace("/insled","") + "/reset/" + token1;
                String resetPasswordLink = Utility.getSiteURL(request) + "/reset/" + token1;
                companyService.sendEmail(virtualAccount.getAppuser().getEmailId(), virtualAccount.getAppuser().getName(), resetPasswordLink);
                log.info("We have sent a reset password link to your email. Please check.");
            }
            else {
                virtualAccount = virtualAccounts.get(0);
                if (!userTO.getCompanySid().equalsIgnoreCase(virtualAccount.getCompany().getStringSid())) {
                    virtualAccount = virtualAccountRepository.findVirtualAccountBySid(virtualAccount.getSid());
                    virtualAccount.setStatus(InstructorEnum.Status.ENABLED);
                    virtualAccount.setCompany(company);
                    virtualAccount.setRole(userTO.getRole());
                    virtualAccount = virtualAccountRepository.save(virtualAccount);
                    DepartmentVirtualAccount departmentVirtualAccount = departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(virtualAccount);
                    departmentVirtualAccount.setCompany(company);
                    departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                    departmentVirtualAccount.setDepartment(departmentRepository.findDepartmentByNameAndStatusNotAndCompany(userTO.getDepartmentVA().getDepartment().getName(), InstructorEnum.Status.DELETED, company));
                    savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
                    userTO.getAppuser().setSid(virtualAccount.getAppuser().getStringSid());
                    userTO.setSid(virtualAccount.getStringSid());
                    userTO.getDepartmentVA().setSid(savedDepartmentVA.getStringSid());
                    userTO.getDepartmentVA().getDepartment().setSid(savedDepartmentVA.getDepartment().getStringSid());
                } else {
                    virtualAccount = virtualAccountRepository.findVirtualAccountBySid(virtualAccount.getSid());
                    DepartmentVirtualAccount departmentVirtualAccount = departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(virtualAccount);
                    userTO.getAppuser().setSid(virtualAccount.getAppuser().getStringSid());
                    userTO.setSid(virtualAccount.getStringSid());
                    userTO.getDepartmentVA().setSid(departmentVirtualAccount.getStringSid());
                    userTO.getDepartmentVA().getDepartment().setSid(departmentVirtualAccount.getDepartment().getStringSid());
                }
            }
            userTO.getAppuser().setSid(virtualAccount.getAppuser().getStringSid());
            userTO.setSid(virtualAccount.getStringSid());
            if (savedDepartmentVA != null) {
                userTO.getDepartmentVA().setSid(savedDepartmentVA.getStringSid());
            }
            if (savedDepartmentVA != null && savedDepartmentVA.getDepartment() != null) {
                userTO.getDepartmentVA().getDepartment().setSid(savedDepartmentVA.getDepartment().getStringSid());
            }
            return userTO;
        }
        else {
            Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(companySid));
           Department department= departmentRepository.findDepartmentBySidAndStatusNot(BaseEntity.hexStringToByteArray(departmentSid), InstructorEnum.Status.DELETED);
            if (virtualAccounts == null || virtualAccounts.size() == 0) {
                virtualAccount = mapper.convert(userTO, VirtualAccount.class);
                virtualAccount.generateUuid();
                virtualAccount.setCompany(company);
                virtualAccount.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                AppUser appUser = virtualAccount.getAppuser();
                appUser.setSuperAdmin(false);
                appUser.setAccessType(InstructorEnum.AccessType.ALL);
                appUser.setStatus(InstructorEnum.Status.ENABLED);
                appUser.setPassword(CommonUtils.generatePassword());
                appUser = appUserRepository.save(appUser);
                virtualAccount.setAppuser(appUser);
                virtualAccount.setDesignation("Student");
                virtualAccount.setStatus(InstructorEnum.Status.ENABLED);
                virtualAccount.setCategoryTopicValue(userTO.getCategoryTopicValue());
                virtualAccount = virtualAccountRepository.save(virtualAccount);

                DepartmentVirtualAccount departmentVirtualAccount = new DepartmentVirtualAccount();
                departmentVirtualAccount.generateUuid();
                departmentVirtualAccount.setVirtualAccount(virtualAccount);
                departmentVirtualAccount.setDepartment(department);
                departmentVirtualAccount.setDepartmentRole(InstructorEnum.DepartmentRole.ASSESS_USER);
                savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);

                String token1 = companyService.generateTokenAndUpdateResetPassToken(virtualAccount.getAppuser().getEmailId());
                String resetPasswordLink = Utility.getSiteURL(request) + "/reset/" + token1;
                companyService.sendEmail(virtualAccount.getAppuser().getEmailId(), virtualAccount.getAppuser().getName(), resetPasswordLink);
                log.info("We have sent a reset password link to your email. Please check.");

                }
            userTO.getAppuser().setSid(virtualAccount.getAppuser().getStringSid());
            userTO.setSid(virtualAccount.getStringSid());
            if (savedDepartmentVA != null) {
                userTO.getDepartmentVA().setSid(savedDepartmentVA.getStringSid());
            }
            if (savedDepartmentVA != null && savedDepartmentVA.getDepartment() != null) {
                userTO.getDepartmentVA().getDepartment().setSid(savedDepartmentVA.getDepartment().getStringSid());
            }
            return userTO;
        }

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
    public List<UserTO> getVirtualAccountByCompanySid(String companySid,String type,int pageNo,int record){
        List<UserTO> list= new ArrayList<>();
        Company company= companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(companySid));
        Pageable paging = PageRequest.of(pageNo, record);
        Page<VirtualAccount> virtualAccountPage=virtualAccountRepository.findVirtualAccountByCompanyAndStatusNotOrderByCreatedOnDesc(company,InstructorEnum.Status.DELETED,paging);
        List<VirtualAccount> virtualAccounts=virtualAccountPage.toList();
        virtualAccounts.forEach(virtualAccount -> {
            if(type.equalsIgnoreCase("ALL")) {
                DepartmentVirtualAccount dVA = departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(virtualAccount);
                UserTO user = mapper.convert(virtualAccount, UserTO.class);;
                if(dVA!=null) {
                    user.getAppuser().setPassword(null);
                    user.setDepartmentVA(mapper.convert(dVA, DepartmentVirtualAccountTO.class));
                }
                list.add(user);
            }else if(type.equalsIgnoreCase("INSTRUCTOR")){
                DepartmentVirtualAccount dVA = departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(virtualAccount);
                UserTO user = mapper.convert(virtualAccount, UserTO.class);
                if(dVA!=null && dVA.getDepartmentRole()!=null && dVA.getDepartmentRole().name().equalsIgnoreCase("INSTRUCTOR")) {
                    user.getAppuser().setPassword(null);
                    user.setDepartmentVA(mapper.convert(dVA, DepartmentVirtualAccountTO.class));
                    list.add(user);
                }
            }else if(type.equalsIgnoreCase("LEARNER")){
                DepartmentVirtualAccount dVA = departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(virtualAccount);
                UserTO user = mapper.convert(virtualAccount, UserTO.class);
                if(dVA!=null && dVA.getDepartmentRole()!=null && dVA.getDepartmentRole().name().equalsIgnoreCase("LEARNER")) {
                    user.getAppuser().setPassword(null);
                    user.setDepartmentVA(mapper.convert(dVA, DepartmentVirtualAccountTO.class));
                    list.add(user);
                }
            }
        });
        return list;
    }

    private UserTO createVirtualAccountByBatch(UserTO userTO,String batchSid,HttpServletRequest request){
        DepartmentVirtualAccount savedDepartmentVA = null;
        Department savedDepartment = null;
        Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(userTO.getCompanySid()));
        Batch batch = batchRepository.findBatchBySid(BaseEntity.hexStringToByteArray(batchSid));
        List<VirtualAccount> virtualAccounts = virtualAccountRepository.findVirtualAccountByEmailId(userTO.getAppuser().getEmailId());
        VirtualAccount virtualAccount = null;
        if (virtualAccounts == null || virtualAccounts.size() == 0) {
            virtualAccount = mapper.convert(userTO, VirtualAccount.class);
            virtualAccount.generateUuid();
            virtualAccount.setCompany(company);
            virtualAccount.setCreatedOn(new Date(Instant.now().toEpochMilli()));
            AppUser appUser = virtualAccount.getAppuser();
            appUser.generateUuid();
            appUser.setSuperAdmin(false);
            appUser.setStatus(InstructorEnum.Status.ENABLED);
            appUser = appUserRepository.save(appUser);
            virtualAccount.setAppuser(appUser);
            virtualAccount.setDesignation("Employee");
            virtualAccount.setRole(InstructorEnum.VirtualAccountRole.USER);
            virtualAccount.setStatus(InstructorEnum.Status.ENABLED);
            virtualAccount = virtualAccountRepository.save(virtualAccount);
            BatchParticipant participant= new BatchParticipant();
            participant.generateUuid();
            participant.setVirtualAccount(virtualAccount);
            participant.setBatch(batch);
            participant=batchParticipantRepository.save(participant);
            if (userTO.getDepartmentVA() != null) {
                if (userTO.getDepartmentVA().getDepartment() != null && StringUtils.isNotEmpty(userTO.getDepartmentVA().getDepartment().getSid())) {
                    DepartmentVirtualAccount departmentVirtualAccount = new DepartmentVirtualAccount();
                    departmentVirtualAccount.generateUuid();
                    departmentVirtualAccount.setVirtualAccount(virtualAccount);
                    departmentVirtualAccount.setDepartment(departmentRepository.findDepartmentBySidAndStatusNot(BaseEntity.hexStringToByteArray(userTO.getDepartmentVA().getDepartment().getSid()), InstructorEnum.Status.DELETED));
                    departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                    savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
                } else if (userTO.getDepartmentVA().getDepartment() != null &&
                        StringUtils.isEmpty(userTO.getDepartmentVA().getDepartment().getSid()) &&
                        StringUtils.isNotEmpty(userTO.getDepartmentVA().getDepartment().getName())) {
                    Department department = departmentRepository.findDepartmentByNameAndStatusNotAndCompany(userTO.getDepartmentVA().getDepartment().getName(), InstructorEnum.Status.DELETED, company);
                    if (department != null) {
                        DepartmentVirtualAccount departmentVirtualAccount = new DepartmentVirtualAccount();
                        departmentVirtualAccount.generateUuid();
                        departmentVirtualAccount.setVirtualAccount(virtualAccount);
                        departmentVirtualAccount.setDepartment(department);
                        departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                        savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
                    } else {
                        Department departmentObj = new Department();
                        departmentObj.generateUuid();
                        departmentObj.setCompany(company);
                        departmentObj.setName(userTO.getDepartmentVA().getDepartment().getName());
                        departmentObj.setDescription(userTO.getDepartmentVA().getDepartment().getDescription());
                        departmentObj.setStatus(InstructorEnum.Status.ENABLED);
                        departmentObj.setEmailId(userTO.getDepartmentVA().getDepartment().getEmailId() == null ? null : userTO.getDepartmentVA().getDepartment().getEmailId());
                        departmentObj.setLocation(userTO.getDepartmentVA().getDepartment().getLocation());
                        savedDepartment = departmentRepository.save(departmentObj);
                        DepartmentVirtualAccount departmentVirtualAccount = new DepartmentVirtualAccount();
                        departmentVirtualAccount.generateUuid();
                        departmentVirtualAccount.setVirtualAccount(virtualAccount);
                        departmentVirtualAccount.setDepartment(savedDepartment);
                        departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                        savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
                    }
                }
            }
            String token1 = companyService.generateTokenAndUpdateResetPassToken(virtualAccount.getAppuser().getEmailId());
           // String resetPasswordLink = Utility.getSiteURL(request).replace("/insled","") + "/reset/" + token1;
            String resetPasswordLink = Utility.getSiteURL(request)+ "/reset/" + token1;
            companyService.sendEmail(virtualAccount.getAppuser().getEmailId(),virtualAccount.getAppuser().getName(),resetPasswordLink);
            log.info("We have sent a reset password link to your email. Please check.");
        } else {
            virtualAccount = virtualAccounts.get(0);
            if (!userTO.getCompanySid().equalsIgnoreCase(virtualAccount.getCompany().getStringSid())) {
                virtualAccount = virtualAccountRepository.findVirtualAccountBySid(virtualAccount.getSid());
                virtualAccount.setStatus(InstructorEnum.Status.ENABLED);
                virtualAccount.setCompany(company);
                virtualAccount.setRole(InstructorEnum.VirtualAccountRole.USER);
                virtualAccount = virtualAccountRepository.save(virtualAccount);
                BatchParticipant participant= new BatchParticipant();
                participant.generateUuid();
                participant.setVirtualAccount(virtualAccount);
                participant.setBatch(batch);
                participant=batchParticipantRepository.save(participant);
                DepartmentVirtualAccount departmentVirtualAccount = departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(virtualAccount);
                departmentVirtualAccount.setCompany(company);
                departmentVirtualAccount.setDepartmentRole(InstructorEnum.DepartmentRole.LEARNER);
                departmentVirtualAccount.setDepartment(departmentRepository.findDepartmentByNameAndStatusNotAndCompany(userTO.getDepartmentVA().getDepartment().getName(), InstructorEnum.Status.DELETED, company));
                savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
                userTO.getAppuser().setSid(virtualAccount.getAppuser().getStringSid());
                userTO.setSid(virtualAccount.getStringSid());
                userTO.getDepartmentVA().setSid(savedDepartmentVA.getStringSid());
                userTO.getDepartmentVA().getDepartment().setSid(savedDepartmentVA.getDepartment().getStringSid());
            } else {
                virtualAccount = virtualAccountRepository.findVirtualAccountBySid(virtualAccount.getSid());
                BatchParticipant participant= new BatchParticipant();
                participant.generateUuid();
                participant.setVirtualAccount(virtualAccount);
                participant.setBatch(batch);
                participant=batchParticipantRepository.save(participant);
                DepartmentVirtualAccount departmentVirtualAccount = departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(virtualAccount);
                userTO.getAppuser().setSid(virtualAccount.getAppuser().getStringSid());
                userTO.setSid(virtualAccount.getStringSid());
                userTO.getDepartmentVA().setSid(departmentVirtualAccount.getStringSid());
                userTO.getDepartmentVA().getDepartment().setSid(departmentVirtualAccount.getDepartment().getStringSid());
            }
        }
        userTO.getAppuser().setSid(virtualAccount.getAppuser().getStringSid());
        userTO.setSid(virtualAccount.getStringSid());
        if (savedDepartmentVA!= null) {
            userTO.getDepartmentVA().setSid(savedDepartmentVA.getStringSid());
        }
        if (savedDepartmentVA!= null && savedDepartmentVA.getDepartment()!=null ) {
            userTO.getDepartmentVA().getDepartment().setSid(savedDepartmentVA.getDepartment().getStringSid());
        }
        return userTO;
    }


    private BatchTO saveUserWithBatch(List<UserTO> userTOList,BatchTO batchTO,HttpServletRequest request){
      BatchTO batchTO1=  batchService.createBatch(batchTO);
        userTOList.forEach(userTO -> {
            createVirtualAccountByBatch(userTO,batchTO1.getSid(),request);
        });
      return batchTO1;
    }

    @Override
    public void uploadParticipants(MultipartFile file, String companySid, HttpServletRequest request) {
        if (ExcelHelper.hasExcelFormat(file)) {
            try {
                List<UserTO> userTOList = ExcelHelper.excelToUserTO(file.getInputStream());
                userTOList.forEach(userTO -> {
                    userTO.setCompanySid(companySid);
                    if(StringUtils.isNotEmpty(userTO.getAppuser().getEmailId())) {
                        userTO.setRole(InstructorEnum.VirtualAccountRole.USER);
                       createVirtualAccount(userTO,request);
                    }
                });

            } catch (IOException e) {
                throw new ApplicationException("fail to store excel data: " + e.getMessage());
            }
        }
    }

    @Override
    public UserTO updateUserDetails(UserTO userTO) {
        DepartmentVirtualAccount savedDepartmentVA=null;
        Department savedDepartment=null;
        Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(userTO.getCompanySid()));
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(userTO.getSid()));
        AppUser appUser=virtualAccount.getAppuser();
        appUser.setName(userTO.getAppuser().getName());
        appUser.setEmployeeId(userTO.getAppuser().getEmployeeId());
        appUser.setEmailId(userTO.getAppuser().getEmailId());
        appUser.setPassword(userTO.getAppuser().getPassword());
        appUser.setAccessType(userTO.getAppuser().getAccessType());
        appUser.setStatus(userTO.getAppuser().getStatus());
        appUser=appUserRepository.save(appUser);
        virtualAccount.setAppuser(appUser);
        virtualAccount.setStatus(userTO.getStatus());
        virtualAccount= virtualAccountRepository.save(virtualAccount);
        if(userTO.getDepartmentVA()!=null){
            if(userTO.getDepartmentVA().getDepartment()!=null &&
                    StringUtils.isNotEmpty(userTO.getDepartmentVA().getDepartment().getSid())){
                DepartmentVirtualAccount departmentVirtualAccount=  departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(virtualAccount);
                departmentVirtualAccount.setVirtualAccount(virtualAccount);
                departmentVirtualAccount.setDepartment(departmentRepository.findDepartmentBySidAndStatusNot(BaseEntity.hexStringToByteArray(userTO.getDepartmentVA().getDepartment().getSid()), InstructorEnum.Status.DELETED));
                departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
            }else if(userTO.getDepartmentVA().getDepartment()!=null &&
                    StringUtils.isEmpty(userTO.getDepartmentVA().getDepartment().getSid()) &&
                    StringUtils.isNotEmpty(userTO.getDepartmentVA().getDepartment().getName())){
                Department department=departmentRepository.findDepartmentByNameAndStatusNotAndCompany(userTO.getDepartmentVA().getDepartment().getName(), InstructorEnum.Status.DELETED,company);
                if(department!=null) {
                    DepartmentVirtualAccount departmentVirtualAccount=  departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(virtualAccount);
                    departmentVirtualAccount.setVirtualAccount(virtualAccount);
                    departmentVirtualAccount.setDepartment(department);
                    departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                    savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
                }else{
                    Department departmentObj = new Department();
                    departmentObj.generateUuid();
                    departmentObj.setCompany(company);
                    departmentObj.setName(userTO.getDepartmentVA().getDepartment().getName());
                    departmentObj.setDescription(userTO.getDepartmentVA().getDepartment().getDescription());
                    departmentObj.setStatus(InstructorEnum.Status.ENABLED);
                    departmentObj.setEmailId(userTO.getDepartmentVA().getDepartment().getEmailId());
                    departmentObj.setLocation(userTO.getDepartmentVA().getDepartment().getLocation());
                    savedDepartment = departmentRepository.save(departmentObj);
                    DepartmentVirtualAccount departmentVirtualAccount = new DepartmentVirtualAccount();
                    departmentVirtualAccount.generateUuid();
                    departmentVirtualAccount.setVirtualAccount(virtualAccount);
                    departmentVirtualAccount.setDepartment(savedDepartment);
                    departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                    savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
                }

            }else
                throw new ApplicationException("throwing error while updating user");
        }
        userTO.getAppuser().setSid(virtualAccount.getAppuser().getStringSid());
        userTO.setSid(virtualAccount.getStringSid());
        userTO.getDepartmentVA().setSid(savedDepartmentVA.getStringSid());
        userTO.getDepartmentVA().getDepartment().setSid(savedDepartmentVA.getDepartment().getStringSid());
        return userTO;
    }

    @Override
    public int getUserCount(String companySid, String type) {
        List<VirtualAccount> virtualAccounts=virtualAccountRepository.findVirtualAccountByCompanyAndStatusNot(getCompany(companySid), InstructorEnum.Status.DELETED);
        if(virtualAccounts!=null && virtualAccounts.size()>0){
            return virtualAccounts.size();
        }else {
            return 0;
        }
    }
}
