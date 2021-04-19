package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.commons.AWSUploadClient;
import com.trainsoft.instructorled.commons.CommonUtils;
import com.trainsoft.instructorled.commons.CustomRepositoyImpl;
import com.trainsoft.instructorled.commons.JsonUtils;
import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.customexception.RecordNotFoundException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.*;
import com.trainsoft.instructorled.repository.*;
import com.trainsoft.instructorled.service.ITrainingService;
import com.trainsoft.instructorled.to.*;
import com.trainsoft.instructorled.value.InstructorEnum;
import com.trainsoft.instructorled.zoom.helper.ZoomMeetingResponse;
import com.trainsoft.instructorled.zoom.helper.ZoomServiceImpl;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
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
@RequiredArgsConstructor
@Service
public class TrainingServiceImpl implements ITrainingService {
    @Value("${app.zoom.accessToken}")
    private  String accessToken;
    @Value("${app.zoom.userId}")
    private  String userId;
    @Value("${app.zoom.password}")
    private  String password;
    @Value("${app.zoom.type}")
    private  Integer type;
    @Value("${app.zoom.zoomSettingSid}")
    private  String zoomSettingSid;

    private final IVirtualAccountRepository virtualAccountRepository;
    private final IBatchRepository batchRepository;
    private final ICourseRepository courseRepository;
    private final ITrainingRepository trainingRepository;
    private final ITrainingSessionRepository trainingSessionRepository;
    private final ITrainingBatchRepository trainingBatchRepository;
    private final ITrainingViewRepository trainingViewRepository;
    private final ICourseSessionRepository courseSessionRepository;
    private final DozerUtils mapper;
    private final ICompanyRepository companyRepository;
    private final  IDepartmentVirtualAccountRepository departmentVARepo;
    private final IBatchParticipantRepository participantRepository;
    private final IAppUserRepository appUserRepository;
    private final ITrainingCourseRepository trainingCourseRepository;
    private final CustomRepositoyImpl customRepositoy;
    private final AWSUploadClient awsUploadClient;
    private final ITrainsoftCustomRepository customRepository;
    private final ZoomServiceImpl zoomService;
    private final ISettingRepository settingRepository;


    @Override
    public TrainingTO createTraining(TrainingTO trainingTO) {
        try {
            if (trainingTO != null) {
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(trainingTO.getCreatedByVASid()));
                VirtualAccount virtualAccount1=virtualAccountRepository.findVirtualAccountBySid(BaseEntity.hexStringToByteArray(trainingTO.getInstructor().getSid()));
                Course course = courseRepository.findCourseBySid(BaseEntity.hexStringToByteArray(trainingTO.getCourseSid()));
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
                saveCourseSession(trainingTO.getCourseSid(),savedTraining.getId(),trainingTO.getCreatedByVASid(),trainingTO.getCompanySid());
                TrainingTO savedTrainingTO = mapper.convert(savedTraining, TrainingTO.class);
                savedTrainingTO.setCreatedByVASid(virtualAccount.getStringSid());
                savedTrainingTO.setCourseSid(course.getStringSid());
                return savedTrainingTO;
            } else
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            log.error("throwing exception while creating the training",e.toString());
            throw new ApplicationException("Something went wrong while creating the training");
        }
    }

    private void saveCourseSession(String courseSid,Integer trainerId,String virtualAccountSid,String companySid) {
        try{
            Course course=courseRepository.findCourseBySid(BaseEntity.hexStringToByteArray(courseSid));
            List<CourseSession> courseSessionList= courseSessionRepository.findCourseSessionByCourseAndStatusNot(course,Status.DELETED);
            if(CollectionUtils.isNotEmpty(courseSessionList)){
                courseSessionList.forEach(courseSession -> {
                    try {
                            VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(
                                    BaseEntity.hexStringToByteArray(virtualAccountSid));
                            Training training = new Training();
                            training.setId(trainerId);
                            TrainingSession trainingSession = new TrainingSession();
                            trainingSession.generateUuid();
                            trainingSession.setTopic(courseSession.getTopicName());
                            trainingSession.setAgenda(courseSession.getTopicDescription());
                            trainingSession.setTraining(training);
                            trainingSession.setStatus(Status.DISABLED);
                            trainingSession.setCourse(course);
                            trainingSession.setCreatedBy(virtualAccount);
                            trainingSession.setCompany(getCompany(companySid));
                            trainingSession.setUpdatedOn(null);
                            trainingSession.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                            trainingSession.setCourseSessionSid(courseSid);
                            trainingSessionRepository.save(trainingSession);
                    } catch (Exception exception) {
                        exception.printStackTrace();
                        log.error("throwing exception while creating the trainingSession",exception.toString());
                        throw new ApplicationException("Something went wrong while creating the trainingSession");
                    }
                });
            }
        }catch (Exception e){
            log.error("while saving course session to trainning session throwing error",e);
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
                savedTrainingTO.setTrainingCourseSid(trainingCourse.getStringSid());
                savedTrainingTO.setCourseSid(trainingCourse.getCourse().getStringSid());
                return savedTrainingTO;
            }
            else
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            e.printStackTrace();
            log.info("throwing exception while fetching the training details by sid");
            throw new ApplicationException("Something went wrong while fetching the training details by sid");
        }
    }

    @Override
    public TrainingSessionTO createTrainingSession(TrainingSessionTO trainingSessionTO) {
        ZoomMeetingResponse response = null;
        try {
            if (trainingSessionTO != null) {
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(
                        BaseEntity.hexStringToByteArray(trainingSessionTO.getCreatedByVASid()));
                Training training = trainingRepository.findTrainingBySidAndStatusNot(
                        BaseEntity.hexStringToByteArray(trainingSessionTO.getTrainingSid()),Status.DELETED);
                Course course = courseRepository.findCourseBySid
                        (BaseEntity.hexStringToByteArray(trainingSessionTO.getCourseSid()));
                Settings zoomSettings=settingRepository.findSettingBySid(BaseEntity.hexStringToByteArray(zoomSettingSid));
                Long startDate=trainingSessionTO.getStartTime();
                Long endDate=trainingSessionTO.getEndTime();
                trainingSessionTO.setStartTime(null);
                trainingSessionTO.setEndTime(null);
                TrainingSession trainingSession = mapper.convert(trainingSessionTO, TrainingSession.class);
                trainingSession.generateUuid();
                trainingSession.setStartTime(Instant.ofEpochMilli(startDate));
                trainingSession.setEndTime(Instant.ofEpochMilli(endDate));
                trainingSession.setUpdatedOn(null);
                trainingSession.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                trainingSession.setPassword(password);
                trainingSession.setUserId(userId);
                trainingSession.setType(type);
                trainingSession.setAssets(trainingSessionTO.getAssets());
                if(trainingSession.getDuration()!=null) {
                    trainingSession.setStatus(Status.ENABLED);
                    trainingSession.setSettings(zoomSettings);
                    trainingSession.setStart_time(Instant.ofEpochMilli(startDate).toString());
                    response = zoomService.createMeetingWithAccessToken(trainingSession, accessToken);
                    trainingSession.setMeetingInfo(JsonUtils.toJsonString(response));
                }
                trainingSession.setTraining(training);
                trainingSession.setCourse(course);
                trainingSession.setCreatedBy(virtualAccount);
                trainingSession.setCompany(getCompany(trainingSessionTO.getCompanySid()));
                TrainingSession savedTraining=trainingSessionRepository.save(trainingSession);
                Instant startTime=savedTraining.getStartTime();
                Instant endTime=savedTraining.getEndTime();
                savedTraining.setStartTime(null);
                savedTraining.setEndTime(null);
                TrainingSessionTO savedTrainingSessionTO = mapper.convert(savedTraining, TrainingSessionTO.class);
                savedTrainingSessionTO.setStartTime(convertTo(startTime));
                savedTrainingSessionTO.setEndTime(convertTo(endTime));
                savedTrainingSessionTO.setCreatedByVASid(virtualAccount.getStringSid());
                savedTrainingSessionTO.setCourseSid(course.getStringSid());
                savedTrainingSessionTO.setTrainingSid(training.getStringSid());
                return savedTrainingSessionTO;
            }
            else {
                throw new RecordNotFoundException("No record found");
            }
        } catch (Exception exception) {
            log.error("throwing exception while creating the trainingSession",exception.toString());
            throw new ApplicationException("Something went wrong while creating the trainingSession");
        }
    }

    @Override
    public TrainingSessionTO updateTrainingSession(TrainingSessionTO trainingSessionTO,String meetingId) {
        ZoomMeetingResponse response = null;

        try {
            if (trainingSessionTO != null) {
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(
                        BaseEntity.hexStringToByteArray(trainingSessionTO.getUpdatedByVASid()));
                TrainingSession trainingSession = trainingSessionRepository.findTrainingSessionBySid(
                        BaseEntity.hexStringToByteArray(trainingSessionTO.getSid()));
                Settings zoomSettings=settingRepository.findSettingBySid(BaseEntity.hexStringToByteArray(zoomSettingSid));

                trainingSession.setAgenda(trainingSessionTO.getAgenda());
                trainingSession.setTopic(trainingSessionTO.getTopic());
                trainingSession.setDuration(trainingSessionTO.getDuration());
                trainingSession.setAssets(trainingSessionTO.getAssets());
                trainingSession.setRecording(trainingSessionTO.getRecording());
                trainingSession.setCreatedBy(null);
                trainingSession.getCompany().setCreatedBy(null);
                trainingSession.getTraining().setCourse(null);
                trainingSession.getCourse().setTrainingCourses(null);

                if( meetingId!=null && trainingSession.getDuration()!=null) {
                    trainingSession.setStart_time(Instant.ofEpochMilli(trainingSessionTO.getStartTime()).toString());
                    response = zoomService.updateMeetingWithAccessToken(trainingSession,meetingId, accessToken);
                    trainingSession.setMeetingInfo(JsonUtils.toJsonString(response));
                }
                else if(trainingSession.getDuration()!=null){
                    trainingSession.setStatus(Status.ENABLED);
                    trainingSession.setSettings(zoomSettings);
                    trainingSession.setPassword(password);
                    trainingSession.setUserId(userId);
                    trainingSession.setType(type);
                    trainingSession.setStartTime(Instant.ofEpochMilli(trainingSessionTO.getStartTime()));
                    trainingSession.setEndTime(Instant.ofEpochMilli(trainingSessionTO.getEndTime()));
                    trainingSession.setStart_time(Instant.ofEpochMilli(trainingSessionTO.getStartTime()).toString());
                    response = zoomService.createMeetingWithAccessToken(trainingSession, accessToken);
                    trainingSession.setMeetingInfo(JsonUtils.toJsonString(response));
                }else{
                    trainingSession.setStart_time(Instant.ofEpochMilli(trainingSessionTO.getStartTime()).toString());
                    zoomService.deleteMeetingWithAccessToken(meetingId, accessToken);
                    trainingSession.setMeetingInfo(JsonUtils.toJsonString(null));
                }
                trainingSession.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
                trainingSession.setUpdatedBy(virtualAccount);
                TrainingSession savedUpdatedSession=trainingSessionRepository.save(trainingSession);
                Instant startTime=savedUpdatedSession.getStartTime();
                Instant endTime=savedUpdatedSession.getEndTime();
                savedUpdatedSession.setStartTime(null);
                savedUpdatedSession.setEndTime(null);
                TrainingSessionTO savedTrainingSessionTO = mapper.convert(savedUpdatedSession, TrainingSessionTO.class);
                savedTrainingSessionTO.setStartTime(convertTo(startTime));
                savedTrainingSessionTO.setEndTime(convertTo(endTime));
                savedTrainingSessionTO.setCreatedByVASid(virtualAccount.getStringSid());
                savedTrainingSessionTO.setCourseSid(trainingSession.getCourse().getStringSid());
                savedTrainingSessionTO.setTrainingSid(trainingSession.getTraining().getStringSid());
                return savedTrainingSessionTO;
            }
            else {
                throw new RecordNotFoundException("No record found");
            }
        } catch (Exception exception) {
            log.info("throwing exception while updating the trainingSession",exception);
            throw new ApplicationException("Something went wrong while updating the trainingSession");
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
                throw new RecordNotFoundException("No record found");
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
                List<TrainingSession> trainingSessions = trainingSessionRepository.findTrainingSessionByTrainingAndCompanyAndStatusNotOrderByCreatedOnDesc(training,getCompany(companySid),Status.DELETED);
                return trainingSessions.stream().map(trainingSession -> {
                    TrainingSessionTO to = mapper.convert(trainingSession, TrainingSessionTO.class);
                    to.setCreatedByVASid(trainingSession.getCreatedBy() == null ? null : trainingSession.getCreatedBy().getStringSid());
                    to.setCourseSid(trainingSession.getCourse() == null ? null : trainingSession.getCourse().getStringSid());
                    to.setTrainingSid(trainingSession.getTraining() == null ? null : trainingSession.getTraining().getStringSid());
                    return to;
                }).collect(Collectors.toList());
            }
            else
                throw new RecordNotFoundException("No record found");
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
        List<Instant> startDateList= new ArrayList<>();
        List<Instant> endDateList= new ArrayList<>();
        try {
            Training training = trainingRepository.findTrainingBySidAndStatusNot(BaseEntity.hexStringToByteArray(trainingSid),Status.DELETED);
            List<TrainingSession> trainingSessionList= trainingSessionRepository.findTrainingSessionByTrainingAndCompanyAndStatusNotOrderByCreatedOnDesc(training,getCompany(companySid),Status.DELETED);
            trainingSessionList.forEach(trainingSession->{
                Instant startDate=trainingSession.getStartTime();
                Instant endDate=trainingSession.getEndTime();
                startDateList.add(startDate);
                endDateList.add(endDate);
                trainingSession.setStartTime(null);
                trainingSession.setEndTime(null);
            });
            List<TrainingSessionTO> sessionsTO=mapper.convertList(trainingSessionList,TrainingSessionTO.class);
            if(sessionsTO!=null && sessionsTO.size()>0){
                sessionsTO.forEach(sessionTO->{
                    int index =0;
                   sessionTO.setStartTime(convertTo(startDateList.get(index)));
                   sessionTO.setEndTime(convertTo(endDateList.get(index)));
                    sessionTOList.add(sessionTO);
                    index++;
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
    public List<TrainingSessionTO> getTrainingSessionsByName(String trainingSid,String name,String companySid) {
        try {
            Training training =trainingRepository.findTrainingBySid(BaseEntity.hexStringToByteArray(trainingSid));
            List<TrainingSession> trainingSessionList= trainingSessionRepository.
                    findTrainingSessionByTrainingAndTopicContainingAndCompanyAndStatusNot(training,name,getCompany(companySid),Status.DELETED);
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
                throw new RecordNotFoundException("No record found");
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
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            log.info("throwing exception while deleting the Training Session details by sid");
            throw new ApplicationException("Something went wrong while deleting the Training Session details by sid");
        }
    }

    @Override
    public List<UserTO> getUsersByNameOrEmailOrPhoneNumber(String str, String companySid) {
        try {
            List<VirtualAccount> virtualAccounts=virtualAccountRepository.findVirtualAccountByNameContainingOrEmailIdContainingOrPhoneNumberContaining(str,BaseEntity.hexStringToByteArray(companySid),Status.DELETED);
            List<UserTO> userTOS=new ArrayList<>();
            virtualAccounts.forEach(virtualAccount -> {
                virtualAccount.getAppuser().setPassword(null);
                DepartmentVirtualAccount dVA = departmentVARepo.findDepartmentVirtualAccountByVirtualAccount(virtualAccount);
                UserTO user = mapper.convert(virtualAccount, UserTO.class);;
                if(dVA!=null) {
                    user.getAppuser().setPassword(null);
                    user.setDepartmentVA(mapper.convert(dVA, DepartmentVirtualAccountTO.class));
                }
                userTOS.add(user);
            });
            return userTOS;
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
               TrainingCourse trainingCourse= trainingCourseRepository.findTrainingCourseByTraining(training);
               trainingCourse.setCourse(course);
                trainingCourseRepository.save(trainingCourse);
                Integer flag2= trainingBatchRepository.deleteAllByTraining(savedTraining);
                if(trainingTO.getTrainingBatchs()!=null && trainingTO.getTrainingBatchs().size()!=0)
                    saveTrainingBatch(savedTraining, trainingTO.getTrainingBatchs());
                else
                    trainingTO.setTrainingBatchs(Collections.EMPTY_LIST);
                TrainingTO savedTrainingTO = mapper.convert(savedTraining, TrainingTO.class);
                savedTrainingTO.setCreatedByVASid(virtualAccount.getStringSid());
                savedTrainingTO.setCourseSid(course.getStringSid());
                savedTrainingTO.setTrainingBatchs(trainingTO.getTrainingBatchs());
                return savedTrainingTO;
            } else
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            e.printStackTrace();
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

    @Override
    public void updateTrainingSessionStatus(String sessionSid, String status, String updatedBy,String meetingId) {
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                (BaseEntity.hexStringToByteArray(updatedBy));
        TrainingSession trainingSession = trainingSessionRepository.findTrainingSessionBySid(BaseEntity.hexStringToByteArray(sessionSid));
        if(trainingSession!=null && meetingId!=null && status.equals("DISABLED") ||status.equals("DELETED")){
            zoomService.deleteMeetingWithAccessToken(meetingId, accessToken);
            trainingSession.setMeetingInfo(JsonUtils.toJsonString(null));
            trainingSession.setStatus(InstructorEnum.Status.valueOf(status));
            trainingSession.setUpdatedBy(virtualAccount);
            trainingSession.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
            trainingSessionRepository.save(trainingSession);
        }else if(trainingSession!=null) {
            trainingSession.setStatus(InstructorEnum.Status.valueOf(status));
            trainingSession.setUpdatedBy(virtualAccount);
            trainingSession.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
            trainingSessionRepository.save(trainingSession);
        }else
            throw new RecordNotFoundException("there is no record with given sid");
    }


    @Override
    public List<TrainingViewTO> getTrainingsOnRoleWithPagination(int pageNo, int pageSize,String companySid,String vASid) {
        try {
            Pageable paging = PageRequest.of(pageNo, pageSize);
            Page<TrainingView> pagedResult = trainingViewRepository.findAllByStatusNotAndCompanySidAndVirtualAccountSid(Status.DELETED,companySid,vASid,paging);
            List<TrainingView> trainingViews = pagedResult.toList();
            return trainingViews.stream().map(trainingView -> {
                TrainingViewTO to = mapper.convert(trainingView, TrainingViewTO.class);
                to.setCreatedByVASid(trainingView.getCreatedBy() == null ? null : trainingView.getCreatedBy().getStringSid());
                to.setUpdatedByVASid(trainingView.getUpdatedBy() == null ? null : trainingView.getUpdatedBy().getStringSid());
                return to;
            }).collect(Collectors.toList());
        } catch (Exception e) {
            log.error("throwing exception while fetching the all training details based on roles",e.toString());
            throw new ApplicationException("throwing exception while fetching the all training details based on roles");
        }
    }

    @Override
    public List<TrainingViewTO> getTrainingsForLeaner(String vASid,String companySid) {
        try {
            List<TrainingView> trainingList = customRepository.findTrainingsForLeaner(vASid,companySid);
            return mapper.convertList(trainingList,TrainingViewTO.class);

        } catch (Exception e) {
            log.error("throwing exception while fetching the all training details based on learners",e.toString());
            throw new ApplicationException("throwing exception while fetching the all training details based on roles");
        }
    }

    private Long convertTo(Object source) {
        if (source==null) return null;
        if(source instanceof Instant){
            Instant instant=(Instant) source;
            return instant.toEpochMilli();
        }else{
            return null;
        }
    }
}
