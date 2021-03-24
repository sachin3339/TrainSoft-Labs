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
                training.setStatus(InstructorEnum.Status.ENABLED);
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
            log.info("throwing exception while creating the training");
            throw new ApplicationException("Something went wrong while creating the training");
        }
    }

    @Override
    public List<TrainingTO> getTrainings() {
        try {
            List<String> batchSid=null;
            List<Training> trainings =  trainingRepository.findAll().stream().filter(c->c.getStatus()!= InstructorEnum.Status.DELETED)
                    .collect(Collectors.toList());
            return trainings.stream().map(training-> {
                TrainingTO to = mapper.convert(training, TrainingTO.class);
/*                List<TrainingBatch> batches=trainingBatchRepository.findTrainingBatchByTraining(training);
                batches.forEach(batch -> {
                    batchSid.add(batch.getBatch().getStringSid());
                });*/
                to.setCourseSid(training.getCourse() == null ? null : training.getCourse().getStringSid());
                to.setCreatedByVASid(training.getCreatedBy() == null ? null : training.getCreatedBy().getStringSid());
                to.setUpdatedByVASid(training.getUpdatedBy() == null ? null : training.getUpdatedBy().getStringSid());
                return to;
            }).collect(Collectors.toList());
        } catch (Exception e) {
            log.info("throwing exception while fetching the all training details");
            throw new ApplicationException("Something went wrong while fetching the training details");
        }
    }

    @Override
    public List<TrainingViewTO> getTrainingsWithPagination(int pageNo, int pageSize) {
        try {
            Pageable paging = PageRequest.of(pageNo, pageSize);
            Page<TrainingView> pagedResult = trainingViewRepository.findAllByStatusNot(InstructorEnum.Status.DELETED,paging);
            List<TrainingView> trainingViews = pagedResult.toList();
            return trainingViews.stream().map(trainingView -> {
                TrainingViewTO to = mapper.convert(trainingView, TrainingViewTO.class);
                to.setCourse(trainingView.getCourseName() == null ? null : trainingView.getCourseName());
                to.setCreatedByVASid(trainingView.getCreatedBy() == null ? null : trainingView.getCreatedBy().getStringSid());
                to.setUpdatedByVASid(trainingView.getUpdatedBy() == null ? null : trainingView.getUpdatedBy().getStringSid());
                return to;
            }).collect(Collectors.toList());
        } catch (Exception e) {
            log.info("throwing exception while fetching the all training details");
            throw new ApplicationException("Something went wrong while fetching the training details");
        }
    }

    @Override
    public TrainingTO getTrainingBySid(String trainingSid) {
        TrainingTO savedTrainingTO;
        Training training = trainingRepository.findTrainingBySid(BaseEntity.hexStringToByteArray(trainingSid));
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
                savedTrainingTO.setTrainingCourseSid(trainingCourse.getStringSid());
                savedTrainingTO.setCourseSid(trainingCourse.getCourse().getStringSid());
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
                Training training = trainingRepository.findTrainingBySid(
                        BaseEntity.hexStringToByteArray(trainingSessionTO.getTrainingSid()));
                Course course = courseRepository.findCourseBySid
                        (BaseEntity.hexStringToByteArray(trainingSessionTO.getCourseSid()));
                TrainingSession trainingSession = mapper.convert(trainingSessionTO, TrainingSession.class);
                trainingSession.generateUuid();
                trainingSession.setTraining(training);
                trainingSession.setCourse(course);
                trainingSession.setCreatedBy(virtualAccount);
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
            log.info("throwing exception while creating the trainingSession");
            throw new ApplicationException("Something went wrong while creating the trainingSession");
        }
    }

    @Override
    public TrainingSessionTO getTrainingSessionBySid(String trainingSessionSid) {
        TrainingSessionTO savedTrainingSession;
        TrainingSession trainingSession = trainingSessionRepository.findTrainingSessionBySid(BaseEntity.hexStringToByteArray(trainingSessionSid));
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
            log.info("throwing exception while fetching the trainingSession details by sid");
            throw new ApplicationException("Something went wrong while fetching the trainingSession details by sid");
        }
    }

    @Override
    public List<TrainingSessionTO> getTrainingSessionByTrainingSid(String trainingSid) {
        Training training = trainingRepository.findTrainingBySid(BaseEntity.hexStringToByteArray(trainingSid));
        try {
            if (StringUtils.isNotEmpty(training.getStringSid())) {
                List<TrainingSession> trainingSessions = trainingSessionRepository.findTrainingSessionByTraining(training).
                        stream().filter(c->c.getStatus()!= InstructorEnum.Status.DELETED)
                        .collect(Collectors.toList());;
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
                log.info("throwing exception while fetching the all trainingSession details");
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
    public List<TrainingSessionTO> getTrainingSessionByTrainingSidAndCourseSid(String trainingSid,String courseSid) {
        List<TrainingSessionTO> sessionTOList= new ArrayList<>();
        try {
            Training training = trainingRepository.findTrainingBySid(BaseEntity.hexStringToByteArray(trainingSid));
            Course course = courseRepository.findCourseBySid(BaseEntity.hexStringToByteArray(courseSid));
            List<CourseSession> courseSessionList = courseSessionRepository.findCourseSessionByCourse(course)
                    .stream().filter(c->c.getStatus()!= InstructorEnum.Status.DELETED)
                    .collect(Collectors.toList());;
            List<TrainingSession> trainingSessionList= trainingSessionRepository.findTrainingSessionByTraining(training)
                    .stream().filter(c->c.getStatus()!= InstructorEnum.Status.DELETED)
                    .collect(Collectors.toList());;
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
            log.info("throwing exception while fetching the all trainingSession details");
            throw new ApplicationException("Something went wrong while fetching the trainingSession details");
        }
        return sessionTOList;
    }

    @Override
    public String generatePassword() {
        return CommonUtils.generatePassword();
    }


    @Override
    public List<UserTO> getParticipantsByBatchSid(String batchSid) {
        List<UserTO> list= new ArrayList<>();
        Batch batch=batchRepository.findBatchBySid(BaseEntity.hexStringToByteArray(batchSid));
        List<BatchParticipant> batchParticipants= participantRepository.findBatchParticipantByBatch(batch);
        batchParticipants.forEach(batchParticipant -> {
            DepartmentVirtualAccount dVA= departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(batchParticipant.getVirtualAccount());
            UserTO user=mapper.convert(batchParticipant.getVirtualAccount(),UserTO.class);
            user.getAppuser().setPassword(null);
            user.setDepartmentVA(mapper.convert(dVA, DepartmentVirtualAccountTO.class));
            if(user.getDepartmentVA().getDepartmentRole()== InstructorEnum.DepartmentRole.LEARNER)
                list.add(user);
        });
        return list;
    }

    @Override
    public List<TrainingViewTO> getTrainingsByName(String name) {
        try {
            List<TrainingView> trainingViewList= trainingViewRepository.findTrainingViewsByNameContaining(name);
            return mapper.convertList(trainingViewList,TrainingViewTO.class);
        }catch (Exception e)
        {
            log.info("throwing exception while fetching the trainings details by name");
            throw new ApplicationException("Something went wrong while fetching the trainings details by name ");
        }
    }

    @Override
    public List<TrainingSessionTO> getTrainingSessionsByName(String name) {
        try {
            List<TrainingSession> trainingSessionList= trainingSessionRepository.findTrainingSessionByAgendaNameContaining(name);
            return mapper.convertList(trainingSessionList,TrainingSessionTO.class);
        }catch (Exception e)
        {
            log.info("throwing exception while fetching the training sessions details by name");
            throw new ApplicationException("Something went wrong while fetching the training sessions details by name ");
        }
    }

    @Override
    public boolean deleteTrainingBySid(String trainingSid, String deletedBySid) {
        Training training = trainingRepository.findTrainingBySid(BaseEntity.hexStringToByteArray(trainingSid));
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                (BaseEntity.hexStringToByteArray(deletedBySid));
        try {
            if (!StringUtils.isEmpty(trainingSid) && training != null) {
                training.setStatus(InstructorEnum.Status.DELETED);
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
        TrainingSession trainingSession = trainingSessionRepository.findTrainingSessionBySid(BaseEntity.hexStringToByteArray(trainingSessionSid));
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                (BaseEntity.hexStringToByteArray(deletedBySid));
        try {
            if (!StringUtils.isEmpty(trainingSessionSid) && trainingSession != null) {
                trainingSession.setStatus(InstructorEnum.Status.DELETED);
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
    public List<AppUserTO> getUsersByNameOrEmailOrPhoneNumber(String str) {
        try {
            List<AppUser> appUserTOList= appUserRepository.findAppUsersByNameContainingOrEmailIdContainingOrPhoneNumberContaining(str);
            appUserTOList.forEach(appUser -> {
                appUser.setPassword(null);
            });
            return mapper.convertList(appUserTOList,AppUserTO.class);
        }catch (Exception e)
        {
            log.info("throwing exception while fetching the appUser details by name,email and phone number");
            throw new ApplicationException("Something went wrong while fetching the appUser details by name,email and phone number ");
        }
    }

    @Override
    public BigInteger getCountByClass(String classz) {
        return customRepositoy.noOfCountByClass(classz);
    }

    @Override
    public TrainingTO updateTraining(TrainingTO trainingTO) {
        try {
            if (trainingTO != null) {
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                        (BaseEntity.hexStringToByteArray(trainingTO.getUpdatedByVASid()));
                VirtualAccount virtualAccount1=virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(trainingTO.getInstructor().getSid()));
                Training training = trainingRepository.findTrainingBySid(BaseEntity.hexStringToByteArray(trainingTO.getSid()));
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
               // Integer flag= trainingCourseRepository.deleteAllByTraining(savedTraining);
               TrainingCourse trainingCourse= trainingCourseRepository.findTrainingCourseByTraining(training);
               trainingCourse.setCourse(course);
                trainingCourseRepository.save(trainingCourse);
                Integer flag2= trainingBatchRepository.deleteAllByTraining(savedTraining);
                if(trainingTO.getTrainingBatchs()!=null && trainingTO.getTrainingBatchs().size()!=0)
                    saveTrainingBatch(savedTraining, trainingTO.getTrainingBatchs());
                else
                    trainingTO.setTrainingBatchs(Collections.EMPTY_LIST);

/*                if(trainingTO.getCourseSid()!=null)
                    saveTrainingCourse(savedTraining, trainingTO.getCourseSid());
                else
                    trainingTO.setCourseSid(null);*/
                TrainingTO savedTrainingTO = mapper.convert(savedTraining, TrainingTO.class);
                savedTrainingTO.setCreatedByVASid(virtualAccount.getStringSid());
                savedTrainingTO.setCourseSid(course.getStringSid());
                savedTrainingTO.setTrainingBatchs(trainingTO.getTrainingBatchs());
                return savedTrainingTO;
            } else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.info("throwing exception while updating the training");
            throw new ApplicationException("Something went wrong while updating the training");
        }
    }

    @Override
    public void updateVirtualAccountStatus(String virtualAccountSid, String status) {
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(virtualAccountSid));
        boolean update = false;
        if (status.equals("ENABLED")) {
            virtualAccount.setStatus(InstructorEnum.Status.ENABLED);
            update = true;
        }
        if (status.equals("DISABLED")) {
            virtualAccount.setStatus(InstructorEnum.Status.DISABLED);
            update = true;
        }
        if (status.equals("DELETED")) {
            virtualAccount.setStatus(InstructorEnum.Status.DELETED);
            update = true;
        }
        if (update == true) {
            virtualAccountRepository.save(virtualAccount);
        }
    }

}
