package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.commons.CommonUtils;
import com.trainsoft.instructorled.commons.CustomRepositoyImpl;
import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.customexception.RecordNotFoundException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.*;
import com.trainsoft.instructorled.repository.*;
import com.trainsoft.instructorled.service.ITrainingService;
import com.trainsoft.instructorled.to.*;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.trainsoft.instructorled.value.InstructorEnum.*;

@Slf4j
@AllArgsConstructor
@Service
public class TrainingServiceImpl implements ITrainingService {

    private IVirtualAccountRepository virtualAccountRepository;
    private IBatchRepository batchRepository;
    private ICourseRepository courseRepository;
    private ITrainingRepository trainingRepository;
    private ITrainingSessionRepository trainingSessionRepository;
    private ITrainingBatchRepository trainingBatchRepository;
    private ITrainingViewRepository trainingViewRepository;
    private ICourseSessionRepository courseSessionRepository;
    private DozerUtils mapper;
    private ICompanyRepository companyRepository;
    IDepartmentVirtualAccountRepository departmentVARepo;
    IBatchParticipantRepository participantRepository;
    IAppUserRepository appUserRepository;
    ITrainingCourseRepository trainingCourseRepository;
    CustomRepositoyImpl customRepositoy;


    @Override
    public TrainingTO createTraining(TrainingTO trainingTO) {
        try {
            if (trainingTO != null) {
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                        (BaseEntity.hexStringToByteArray(trainingTO.getCreatedByVASid()));
                VirtualAccount virtualAccount1=virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(trainingTO.getInstructor().getSid()));
                Course course = courseRepository.findCourseBySid
                        (BaseEntity.hexStringToByteArray(trainingTO.getCourseSid()));
                Training training = mapper.convert(trainingTO, Training.class);
                training.generateUuid();
                training.setCreatedBy(virtualAccount);
                training.setUpdatedOn(null);
                training.setCourse(null);
                training.setInstructor(virtualAccount1);
                training.setTrainingBatches(null);
                training.setCompany(getCompany(trainingTO.getCompanySid()));
                training.setStatus(Status.ENABLED);
                training.setStartDate(new Date(trainingTO.getStartDate()));
                training.setEndDate(new Date(trainingTO.getEndDate()));
                training.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                Training savedTraining=trainingRepository.save(training);
                if(trainingTO.getTrainingBatchs()!=null && trainingTO.getTrainingBatchs().size()!=0)
                    saveTrainingBatch(savedTraining, trainingTO.getTrainingBatchs());
                else
                    trainingTO.setTrainingBatchs(Collections.EMPTY_LIST);

                if(trainingTO.getCourseSid()!=null)
                    saveTrainingCourse(savedTraining, trainingTO.getCourseSid());
                else
                    trainingTO.setCourseSid(null);
                TrainingTO savedTrainingTO = mapper.convert(savedTraining, TrainingTO.class);
                savedTrainingTO.setCreatedByVASid(virtualAccount.getStringSid());
                savedTrainingTO.setCourseSid(course.getStringSid());
                return savedTrainingTO;
            } else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.error("throwing exception while creating the training",e.toString());
            throw new ApplicationException("Something went wrong while creating the training");
        }
    }

    @Override
    public List<TrainingTO> getTrainings(String companySid) {
        try {
            List<Training> trainings =  trainingRepository.findAllByCompanyAndStatusNot(getCompany(companySid),Status.DELETED);
            return trainings.stream().map(training-> {
                TrainingTO to = mapper.convert(training, TrainingTO.class);
                to.setCourseSid(training.getCourse() == null ? null : training.getCourse().getStringSid());
                to.setCreatedByVASid(training.getCreatedBy() == null ? null : training.getCreatedBy().getStringSid());
                to.setUpdatedByVASid(training.getUpdatedBy() == null ? null : training.getUpdatedBy().getStringSid());
                return to;
            }).collect(Collectors.toList());
        } catch (Exception e) {
            log.error("throwing exception while fetching the all training details",e.toString());
            throw new ApplicationException("Something went wrong while fetching the training details");
        }
    }

    @Override
    public List<TrainingViewTO> getTrainingsWithPagination(int pageNo, int pageSize,String companySid) {
        try {
            Pageable paging = PageRequest.of(pageNo, pageSize);
            Page<TrainingView> pagedResult = trainingViewRepository.findAllByStatusNotAndCompanySid(Status.DELETED,companySid,paging);
            List<TrainingView> trainingViews = pagedResult.toList();
            return trainingViews.stream().map(trainingView -> {
                TrainingViewTO to = mapper.convert(trainingView, TrainingViewTO.class);
                to.setCourse(trainingView.getCourseName() == null ? null : trainingView.getCourseName());
                to.setCreatedByVASid(trainingView.getCreatedBy() == null ? null : trainingView.getCreatedBy().getStringSid());
                to.setUpdatedByVASid(trainingView.getUpdatedBy() == null ? null : trainingView.getUpdatedBy().getStringSid());
                return to;
            }).collect(Collectors.toList());
        } catch (Exception e) {
            log.error("throwing exception while fetching the all training details",e.toString());
            throw new ApplicationException("Something went wrong while fetching the training details");
        }
    }

    @Override
    public TrainingTO getTrainingBySid(String trainingSid) {
        TrainingTO savedTrainingTO;
        Training training = trainingRepository.findTrainingBySidAndStatusNot(BaseEntity.hexStringToByteArray(trainingSid),Status.DELETED);
        try {
            if (StringUtils.isNotEmpty(trainingSid) && training != null) {
                savedTrainingTO = mapper.convert(training, TrainingTO.class);
                List<TrainingBatch> trainingBatchs =  trainingBatchRepository.findTrainingBatchByTraining(training);
                TrainingCourse trainingCourse=trainingCourseRepository.findTrainingCourseByTraining(training);
                List<TrainingBatchTO> batchTOS=new ArrayList<>();
                trainingBatchs.forEach(b->{
                    TrainingBatchTO bto=new TrainingBatchTO();
                    bto.setTrainingSid(b.getTraining().getStringSid());
                    bto.setBatchSid(b.getBatch().getStringSid());
                    bto.setSid(b.getStringSid());
                    batchTOS.add(bto);
                });
                savedTrainingTO.setTrainingBatchs(batchTOS);
                savedTrainingTO.setCreatedByVASid(training.getCreatedBy() == null ? null : training.getCreatedBy().getStringSid());
                savedTrainingTO.setUpdatedByVASid(training.getUpdatedBy() == null ? null : training.getUpdatedBy().getStringSid());
                savedTrainingTO.setCourseSid(trainingCourse.getStringSid());
                return savedTrainingTO;
            }
            else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.info("throwing exception while fetching the training details by sid");
            throw new ApplicationException("Something went wrong while fetching the training details by sid");
        }
    }

    @Override
    public TrainingSessionTO createTrainingSession(TrainingSessionTO trainingSessionTO) {
        try {
            if (trainingSessionTO != null) {
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(
                        BaseEntity.hexStringToByteArray(trainingSessionTO.getCreatedByVASid()));
                Training training = trainingRepository.findTrainingBySidAndStatusNot(
                        BaseEntity.hexStringToByteArray(trainingSessionTO.getTrainingSid()),Status.DELETED);
                Course course = courseRepository.findCourseBySid
                        (BaseEntity.hexStringToByteArray(trainingSessionTO.getCourseSid()));
                TrainingSession trainingSession = mapper.convert(trainingSessionTO, TrainingSession.class);
                trainingSession.generateUuid();
                trainingSession.setTraining(training);
                trainingSession.setCourse(course);
                trainingSession.setCreatedBy(virtualAccount);
                trainingSession.setCompany(getCompany(trainingSessionTO.getCompanySid()));
                trainingSession.setUpdatedOn(null);
                trainingSession.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                trainingSession.setStartTime(new Date(trainingSessionTO.getStartTime()));
                trainingSession.setEndTime(new Date(trainingSessionTO.getEndTime()));
                trainingSession.setSessionDate(new Date(trainingSessionTO.getSessionDate()));
                TrainingSessionTO savedTrainingSessionTO = mapper.convert(trainingSessionRepository.save(trainingSession), TrainingSessionTO.class);
                savedTrainingSessionTO.setCreatedByVASid(virtualAccount.getStringSid());
                savedTrainingSessionTO.setCourseSid(course.getStringSid());
                savedTrainingSessionTO.setTrainingSid(training.getStringSid());
                return savedTrainingSessionTO;
            }
            else {
                throw new RecordNotFoundException();
            }
        } catch (Exception exception) {
            log.error("throwing exception while creating the trainingSession",exception.toString());
            throw new ApplicationException("Something went wrong while creating the trainingSession");
        }
    }

    @Override
    public TrainingSessionTO getTrainingSessionBySid(String trainingSessionSid) {
        TrainingSessionTO savedTrainingSession;
        TrainingSession trainingSession = trainingSessionRepository.findTrainingSessionBySidAndStatusNot(BaseEntity.hexStringToByteArray(trainingSessionSid),Status.DELETED);
        try {
            if (StringUtils.isNotEmpty(trainingSessionSid) && trainingSession != null) {
                savedTrainingSession = mapper.convert(trainingSession, TrainingSessionTO.class);
                savedTrainingSession.setCreatedByVASid(trainingSession.getCreatedBy() == null ? null : trainingSession.getCreatedBy().getStringSid());
                savedTrainingSession.setTrainingSid(trainingSession.getTraining() == null ? null : trainingSession.getTraining().getStringSid());
                savedTrainingSession.setCourseSid(trainingSession.getCourse() == null ? null : trainingSession.getCourse().getStringSid());
                return savedTrainingSession;
            }
            else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.error("throwing exception while fetching the trainingSession details by sid",e.toString());
            throw new ApplicationException("Something went wrong while fetching the trainingSession details by sid");
        }
    }

    @Override
    public List<TrainingSessionTO> getTrainingSessionByTrainingSid(String trainingSid,String companySid) {
        Training training = trainingRepository.findTrainingBySidAndStatusNot(BaseEntity.hexStringToByteArray(trainingSid),Status.DELETED);
        try {
            if (StringUtils.isNotEmpty(training.getStringSid())) {
                List<TrainingSession> trainingSessions = trainingSessionRepository.findTrainingSessionByTrainingAndCompanyAndStatusNot(training,getCompany(companySid),Status.DELETED);
                return trainingSessions.stream().map(trainingSession -> {
                    TrainingSessionTO to = mapper.convert(trainingSession, TrainingSessionTO.class);
                    to.setCreatedByVASid(trainingSession.getCreatedBy() == null ? null : trainingSession.getCreatedBy().getStringSid());
                    to.setCourseSid(trainingSession.getCourse() == null ? null : trainingSession.getCourse().getStringSid());
                    to.setTrainingSid(trainingSession.getTraining() == null ? null : trainingSession.getTraining().getStringSid());
                    return to;
                }).collect(Collectors.toList());
            }
            else
                throw new RecordNotFoundException();
        }catch(Exception e){
                log.error("throwing exception while fetching the all trainingSession details",e.toString());
                throw new ApplicationException("Something went wrong while fetching the trainingSession details");
            }
    }

    private void saveTrainingBatch(Training trd, List<TrainingBatchTO> tbTO) {
        tbTO.forEach(tBatchTO-> {
            Batch batch = batchRepository.findBatchBySid(BaseEntity.hexStringToByteArray(tBatchTO.getBatchSid()));
            TrainingBatch  trb = new TrainingBatch();
            trb.generateUuid();
            trb.setBatch(batch);
            trb.setTraining(trd);
            trainingBatchRepository.save(trb);
        });
    }

    private void saveTrainingCourse(Training trd, String  courseSid) {
            Course course = courseRepository.findCourseBySid(BaseEntity.hexStringToByteArray(courseSid));
            TrainingCourse  trc = new TrainingCourse();
            trc.generateUuid();
            trc.setCourse(course);
            trc.setTraining(trd);
            trainingCourseRepository.save(trc);
    }

    @Override
    public List<TrainingSessionTO> getTrainingSessionByTrainingSidAndCourseSid(String trainingSid,String courseSid,String companySid) {
        List<TrainingSessionTO> sessionTOList= new ArrayList<>();
        try {
            Training training = trainingRepository.findTrainingBySidAndStatusNot(BaseEntity.hexStringToByteArray(trainingSid),Status.DELETED);
            Course course = courseRepository.findCourseBySid(BaseEntity.hexStringToByteArray(courseSid));
            List<CourseSession> courseSessionList = courseSessionRepository.findCourseSessionByCourseAndStatusNot(course,Status.DELETED)
                    .stream().filter(c->c.getStatus()!= Status.DELETED)
                    .collect(Collectors.toList());;
            List<TrainingSession> trainingSessionList= trainingSessionRepository.findTrainingSessionByTrainingAndCompanyAndStatusNot(training,getCompany(companySid),Status.DELETED);
            List<TrainingSessionTO> sessionsTO=mapper.convertList(trainingSessionList,TrainingSessionTO.class);
            if(sessionsTO!=null && sessionsTO.size()>0){
                sessionTOList.addAll(sessionsTO);
            }
            if(courseSessionList!=null && courseSessionList.size()>0){
                courseSessionList.forEach(courseSession -> {
                    TrainingSessionTO trainingSessionTO=new TrainingSessionTO();
                    trainingSessionTO.setSid(courseSession.getStringSid());
                    trainingSessionTO.setAgendaDescription(courseSession.getTopicDescription());
                    trainingSessionTO.setAgendaName(courseSession.getTopicName());
                    if(courseSession.getCreatedBy()!=null)
                    trainingSessionTO.setCreatedByVASid(courseSession.getCreatedBy().getStringSid());
                    trainingSessionTO.setCourseSid(courseSession.getCourse().getStringSid());
                    trainingSessionTO.setCreatedOn(courseSession.getCreatedOn().getTime());
                    if(courseSession.getUpdatedOn()!=null)
                        trainingSessionTO.setUpdatedOn(courseSession.getUpdatedOn().getTime());
                    if(courseSession.getUpdatedBy()!=null)
                        trainingSessionTO.setUpdatedByVASid(courseSession.getUpdatedBy().getStringSid());
                    sessionTOList.add(trainingSessionTO);
                });
            }
        }catch(Exception e){
            log.error("throwing exception while fetching the all trainingSession details",e.toString());
            throw new ApplicationException("Something went wrong while fetching the trainingSession details");
        }
        return sessionTOList;
    }

    @Override
    public String generatePassword() {
        return CommonUtils.generatePassword();
    }


    @Override
    public List<UserTO> getParticipantsByBatchSid(String batchSid,String companySid) {
        List<UserTO> list= new ArrayList<>();
        Batch batch=batchRepository.findBatchBySid(BaseEntity.hexStringToByteArray(batchSid));
        List<BatchParticipant> batchParticipants= participantRepository.findBatchParticipantByBatch(batch);
        batchParticipants.forEach(batchParticipant -> {
            DepartmentVirtualAccount dVA= departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(batchParticipant.getVirtualAccount());
            UserTO user=mapper.convert(batchParticipant.getVirtualAccount(),UserTO.class);
            user.getAppuser().setPassword(null);
            user.setDepartmentVA(mapper.convert(dVA, DepartmentVirtualAccountTO.class));
            if(user.getDepartmentVA().getDepartmentRole()== DepartmentRole.LEARNER)
                list.add(user);
        });
        return list;
    }

    @Override
    public List<TrainingViewTO> getTrainingsByName(String name,String companySid) {
        try {
            List<TrainingView> trainingViewList= trainingViewRepository.findTrainingViewsByNameContainingAndCompanySidAndStatusNot(name,companySid,Status.DELETED);
            return mapper.convertList(trainingViewList,TrainingViewTO.class);
        }catch (Exception e) {
            log.error("throwing exception while fetching the trainings details by name",e.toString());
            throw new ApplicationException("Something went wrong while fetching the trainings details by name ");
        }
    }

    @Override
    public List<TrainingSessionTO> getTrainingSessionsByName(String name,String companySid) {
        try {
            List<TrainingSession> trainingSessionList= trainingSessionRepository.findTrainingSessionByAgendaNameContainingAndCompanyAndStatusNot(name,getCompany(companySid),Status.DELETED);
            return mapper.convertList(trainingSessionList,TrainingSessionTO.class);
        }catch (Exception e) {
            log.error("throwing exception while fetching the training sessions details by name",e.toString());
            throw new ApplicationException("Something went wrong while fetching the training sessions details by name ");
        }
    }

    @Override
    public boolean deleteTrainingBySid(String trainingSid, String deletedBySid,String companySid) {
        Training training = trainingRepository.findTrainingBySidAndStatusNot(BaseEntity.hexStringToByteArray(trainingSid),Status.DELETED);
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                (BaseEntity.hexStringToByteArray(deletedBySid));
        try {
            if (!StringUtils.isEmpty(trainingSid) && training != null) {
                training.setStatus(Status.DELETED);
                training.setUpdatedBy(virtualAccount);
                training.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
                trainingRepository.save(training);
                log.info(String.format("Training %s is deleted successfully by %s",trainingSid, deletedBySid));
                return true;
            } else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.info("throwing exception while deleting the Training details by sid");
            throw new ApplicationException("Something went wrong while deleting the Training details by sid");
        }
    }

    @Override
    public boolean deleteTrainingSessionBySid(String trainingSessionSid, String deletedBySid) {
        TrainingSession trainingSession = trainingSessionRepository.findTrainingSessionBySidAndStatusNot(BaseEntity.hexStringToByteArray(trainingSessionSid),Status.DELETED);
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                (BaseEntity.hexStringToByteArray(deletedBySid));
        try {
            if (!StringUtils.isEmpty(trainingSessionSid) && trainingSession != null) {
                trainingSession.setStatus(Status.DELETED);
                trainingSession.setUpdatedBy(virtualAccount);
                trainingSession.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
                trainingSessionRepository.save(trainingSession);
                log.info(String.format("Training session %s is deleted successfully by %s",trainingSessionSid, deletedBySid));
                return true;
            } else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.info("throwing exception while deleting the Training Session details by sid");
            throw new ApplicationException("Something went wrong while deleting the Training Session details by sid");
        }
    }

    @Override
    public List<AppUserTO> getUsersByNameOrEmailOrPhoneNumber(String str,String companySid) {
        try {
            List<AppUser> appUserTOList= appUserRepository.findAppUsersByNameContainingOrEmailIdContainingOrPhoneNumberContaining
                    (str,BaseEntity.hexStringToByteArray(companySid),Status.DELETED);
            appUserTOList.forEach(appUser -> {
                appUser.setPassword(null);
            });
            return mapper.convertList(appUserTOList,AppUserTO.class);
        }catch (Exception e) {
            log.error("throwing exception while fetching the appUser details by name,email and phone number",e.toString());
            throw new ApplicationException("Something went wrong while fetching the appUser details by name,email and phone number ");
        }
    }

    @Override
    public BigInteger getCountByClass(String classz,String companySid) {
        return customRepositoy.noOfCountByClass(classz,companySid);
    }

    @Override
    public TrainingTO updateTraining(TrainingTO trainingTO) {
        try {
            if (trainingTO != null) {
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                        (BaseEntity.hexStringToByteArray(trainingTO.getUpdatedByVASid()));
                VirtualAccount virtualAccount1=virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(trainingTO.getInstructor().getSid()));
                Training training = trainingRepository.findTrainingBySidAndStatusNot(BaseEntity.hexStringToByteArray(trainingTO.getSid()),Status.DELETED);
                Course course = courseRepository.findCourseBySid
                        (BaseEntity.hexStringToByteArray(trainingTO.getCourseSid()));
                training.setName(trainingTO.getName());
                training.setInstructor(virtualAccount1);
                training.setCourse(null);
                training.setTrainingBatches(null);
                training.setStatus(trainingTO.getStatus());
                training.setStartDate(new Date(trainingTO.getStartDate()));
                training.setEndDate(new Date(trainingTO.getEndDate()));
                training.setUpdatedBy(virtualAccount);
                training.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
                Training savedTraining=trainingRepository.save(training);
                Integer flag= trainingCourseRepository.deleteAllByTraining(savedTraining);
                Integer flag2= trainingBatchRepository.deleteAllByTraining(savedTraining);
                if(trainingTO.getTrainingBatchs()!=null && trainingTO.getTrainingBatchs().size()!=0)
                    saveTrainingBatch(savedTraining, trainingTO.getTrainingBatchs());
                else
                    trainingTO.setTrainingBatchs(Collections.EMPTY_LIST);

                if(trainingTO.getCourseSid()!=null)
                    saveTrainingCourse(savedTraining, trainingTO.getCourseSid());
                else
                    trainingTO.setCourseSid(null);
                TrainingTO savedTrainingTO = mapper.convert(savedTraining, TrainingTO.class);
                savedTrainingTO.setCreatedByVASid(virtualAccount.getStringSid());
                savedTrainingTO.setCourseSid(course.getStringSid());
                savedTrainingTO.setTrainingBatchs(trainingTO.getTrainingBatchs());
                return savedTrainingTO;
            } else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.error("throwing exception while updating the training",e.toString());
            throw new ApplicationException("Something went wrong while updating the training");
        }
    }

    @Override
    public boolean updateVirtualAccountRole(String role, String reqVSid, String virtualAccountSid) {
        try {
            VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(reqVSid));
            virtualAccount.setRole(Enum.valueOf(VirtualAccountRole.class,role));
            virtualAccountRepository.save(virtualAccount);
        }catch (Exception e){
            log.error("while updating virtual account role, throwing error",e);
            throw new ApplicationException("Role updating failed");
        }
        return true;
    }

    @Override
    public boolean updateDepartmentRole(String role, String departmentVASid, String virtualAccountSid) {
        try {
            DepartmentVirtualAccount departmentVirtualAccount = departmentVARepo.findDepartmentVirtualAccountBySid(BaseEntity.hexStringToByteArray(departmentVASid));
            departmentVirtualAccount.setDepartmentRole(DepartmentRole.valueOf(role));
            departmentVARepo.save(departmentVirtualAccount);
        }catch (Exception e){
            log.error("while updating virtual account role, throwing error",e);
            throw new ApplicationException("Role updating failed");
        }
        return true;
    }

    @Override
    public boolean validateEmail(String email) {
        try {
            List<AppUser> appUser=appUserRepository.findAppUserByEmailId(email);
            if(appUser!=null && appUser.size()>0){
                return true;
            }else{
                return false;
            }
        }catch (Exception e){
            log.error("While validating email, throwing error",e.toString());
            throw new ApplicationException(e.getMessage());
        }
    }

    @Override
    public boolean validateBatch(String batchName, String companySid) {
        try{
            List<Batch> batches=batchRepository.findBatchesByCompanyAndName(getCompany(companySid),batchName);
            if(batches!=null && batches.size()>0){
                return true;
            }else {
                return false;
            }
        }catch (Exception e){
            log.error("while validating batch, throwing error",e);
            throw new ApplicationException(e.getMessage());
        }
    }
    private Company getCompany(String companySid){
        Company company=companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(companySid));
        Company c=new Company();
        c.setId(company.getId());
        return c;
    }

    public void updateVirtualAccountStatus(String virtualAccountSid, String status,String unPublishedBy) {
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(virtualAccountSid));
        boolean update = false;
        if (status.equals("ENABLED")) {
            virtualAccount.setStatus(virtualAccount.getStatus().ENABLED);
            update = true;
        }
        if (status.equals("DISABLED")) {
            virtualAccount.setStatus(virtualAccount.getStatus().DISABLED);
        }
        if (update == true) {
            virtualAccountRepository.save(virtualAccount);
        }
    }


}
