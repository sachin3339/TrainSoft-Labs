package com.trainsoft.assessment.service.impl;

import com.trainsoft.assessment.commons.AssessmentUserExcelHelper;
import com.trainsoft.assessment.commons.CommonUtils;
import com.trainsoft.assessment.commons.Utility;
import com.trainsoft.assessment.customexception.ApplicationException;
import com.trainsoft.assessment.dozer.DozerUtils;
import com.trainsoft.assessment.entity.*;
import com.trainsoft.assessment.repository.*;
import com.trainsoft.assessment.service.ICompanyService;
import com.trainsoft.assessment.service.IUserBulkUploadService;
import com.trainsoft.assessment.to.UserTO;
import com.trainsoft.assessment.value.InstructorEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Service
@Slf4j
public class UserBulkUploadServiceImpl implements IUserBulkUploadService {

    private final IAppUserRepository appUserRepository;
    private final IDepartmentRepository departmentRepository;
    private final IVirtualAccountRepository virtualAccountRepository;
    private final ICompanyRepository companyRepository;
    private final IDepartmentVirtualAccountRepository departmentVARepo;
    private final DozerUtils mapper;
    private final ICompanyService companyService;
    private final IAssessmentRepository assessmentRepository;
    private  final IVirtualAccountAssessmentRepository VAAssessmentRepository;

    private final String companySid="87EABA4D52D54638BE304F5E0C05577FB1F809AA22B94F0F8D11FFCA0D517CAC";
    private final String departmentSid="174939494E6240B2A2F52E7D36EFA1FBE9B520F3DC7B49A0AFB9869DD2D51334";

    @Override
    public void uploadAssessementParticipants(MultipartFile file,HttpServletRequest request,String assessmentSid,String assessUrl) {
        if (file!=null && AssessmentUserExcelHelper.hasExcelFormat(file)) {
            try {
                List<UserTO> userTOList = AssessmentUserExcelHelper.excelToUserTO(file.getInputStream());
                userTOList.forEach(userTO -> {
                    if(StringUtils.isNotEmpty(userTO.getAppuser().getEmailId())) {
                        UserTO createVA  = createVirtualAccountWithAssessmentUser(request,userTO,assessmentSid);
                        String assessmentURl = assessUrl+"&virtualAccountSid="+createVA.getSid();
                        companyService.sendAssessmentEmail(createVA.getAppuser().getEmailId(), userTO.getAppuser().getName(), assessmentURl);
                        log.info("We have sent a assessment link to your email. Please check.");
                    }
                });

            } catch (IOException e) {
                log.error("while uploading assessment participiant throwing error",e.toString());
                throw new ApplicationException("fail to store excel data: " + e.getMessage());
            }
        }
    }


    public UserTO createVirtualAccountWithAssessmentUser(HttpServletRequest request,UserTO userTO,String assessmentSid) {
        DepartmentVirtualAccount savedDepartmentVA=null;
        Department savedDepartment=null;
        VirtualAccount virtualAccount = null;

        Assessment assessment= assessmentRepository.findAssessmentBySid(BaseEntity.hexStringToByteArray(assessmentSid));
        List<VirtualAccount> virtualAccounts = virtualAccountRepository.findVirtualAccountByEmailId(userTO.getAppuser().getEmailId());
        if(assessment.getCompany().getStringSid()!=null && assessment.getCompany().getStringSid()!=companySid) {
            Company company = companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(assessment.getCompany().getStringSid()));
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
                virtualAccount.setDesignation("Student");
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
                if(userTO.getDepartmentVA().getDepartmentRole()!= InstructorEnum.DepartmentRole.ASSESS_USER) {
                    String token1 = companyService.generateTokenAndUpdateResetPassToken(virtualAccount.getAppuser().getEmailId());
                    String resetPasswordLink = Utility.getSiteURL(request) + "/reset/" + token1;
                    companyService.sendEmail(virtualAccount.getAppuser().getEmailId(), virtualAccount.getAppuser().getName(), resetPasswordLink);
                    log.info("We have sent a reset password link to your email. Please check.");
                }
            }
            else {
                virtualAccount = virtualAccounts.get(0);
                if (!assessment.getCompany().getStringSid().equalsIgnoreCase(virtualAccount.getCompany().getStringSid())) {
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
                    if (departmentVirtualAccount!=null) {
                        userTO.getDepartmentVA().setSid(savedDepartmentVA.getStringSid());
                        userTO.getDepartmentVA().getDepartment().setSid(savedDepartmentVA.getDepartment().getStringSid());
                    }
                }
                else {
                    virtualAccount = virtualAccountRepository.findVirtualAccountBySid(virtualAccount.getSid());
                    DepartmentVirtualAccount departmentVirtualAccount = departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(virtualAccount);
                    userTO.getAppuser().setSid(virtualAccount.getAppuser().getStringSid());
                    userTO.setSid(virtualAccount.getStringSid());
                    if (departmentVirtualAccount != null) {
                        userTO.getDepartmentVA().setSid(departmentVirtualAccount.getStringSid());
                    }
                }
            }
            VirtualAccountAssessment virtualAccountAssessment= new VirtualAccountAssessment();
            virtualAccountAssessment.generateUuid();
            virtualAccountAssessment.setVirtualAccount(virtualAccount);
            virtualAccountAssessment.setAssessment(assessment);
            VAAssessmentRepository.save(virtualAccountAssessment);
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
            Company company = companyRepository.findCompanyBySidAndStatusNot(BaseEntity.hexStringToByteArray(companySid), InstructorEnum.Status.DELETED);
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

            }
            else {
                virtualAccount = virtualAccounts.get(0);
                if (virtualAccount.getCompany().getStringSid()!=null) {
                    virtualAccount = virtualAccountRepository.findVirtualAccountBySid(virtualAccount.getSid());
                    virtualAccount.setStatus(InstructorEnum.Status.ENABLED);
                    virtualAccount.setCompany(company);
                    virtualAccount.setRole(userTO.getRole());
                    virtualAccount = virtualAccountRepository.save(virtualAccount);
                    DepartmentVirtualAccount departmentVirtualAccount = departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(virtualAccount);
                    departmentVirtualAccount.setCompany(company);
                    departmentVirtualAccount.setDepartmentRole(userTO.getDepartmentVA().getDepartmentRole());
                    departmentVirtualAccount.setDepartment(departmentRepository.findDepartmentByNameAndStatusNotAndCompany(department.getName(), InstructorEnum.Status.DELETED, company));
                    savedDepartmentVA = departmentVARepo.save(departmentVirtualAccount);
                    userTO.getAppuser().setSid(virtualAccount.getAppuser().getStringSid());
                    userTO.setSid(virtualAccount.getStringSid());
                    userTO.getDepartmentVA().setSid(savedDepartmentVA.getStringSid());
                } else {
                    virtualAccount = virtualAccountRepository.findVirtualAccountBySid(virtualAccount.getSid());
                    DepartmentVirtualAccount departmentVirtualAccount = departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(virtualAccount);
                    userTO.getAppuser().setSid(virtualAccount.getAppuser().getStringSid());
                    userTO.setSid(virtualAccount.getStringSid());
                    userTO.getDepartmentVA().setSid(departmentVirtualAccount.getStringSid());
                }
            }
            if(assessment!=null) {
                VirtualAccountAssessment virtualAccountAssessment = new VirtualAccountAssessment();
                virtualAccountAssessment.generateUuid();
                virtualAccountAssessment.setVirtualAccount(virtualAccount);
                virtualAccountAssessment.setAssessment(assessment);
                VAAssessmentRepository.save(virtualAccountAssessment);
            }
            userTO.getAppuser().setSid(virtualAccount.getAppuser().getStringSid());
            userTO.setSid(virtualAccount.getStringSid());
            if (savedDepartmentVA != null) {
                userTO.getDepartmentVA().setSid(savedDepartmentVA.getStringSid());
            }
            return userTO;
        }
    }
}
