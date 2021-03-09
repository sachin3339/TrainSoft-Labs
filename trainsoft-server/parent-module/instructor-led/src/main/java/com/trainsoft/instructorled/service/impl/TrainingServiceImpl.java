package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.customexception.RecordNotFoundException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.*;
import com.trainsoft.instructorled.repository.*;
import com.trainsoft.instructorled.service.ITrainingService;
import com.trainsoft.instructorled.to.CourseSessionTO;
import com.trainsoft.instructorled.to.TrainingSessionTO;
import com.trainsoft.instructorled.to.TrainingTO;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;
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
    private DozerUtils mapper;

    @Override
    public TrainingTO createTraining(TrainingTO trainingTO) {
        try {
            if (trainingTO != null) {
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                        (BaseEntity.hexStringToByteArray(trainingTO.getCreatedByVASid()));
                Course course = courseRepository.findCourseBySid
                        (BaseEntity.hexStringToByteArray(trainingTO.getCourseSid()));
                Training training = mapper.convert(trainingTO, Training.class);
                training.generateUuid();
                training.setCreatedBy(virtualAccount);
                training.setUpdatedOn(null);
                training.setCourse(course);
                training.setTrainingBatches(null);
                training.setStatus(InstructorEnum.Status.ENABLED);
                training.setStartDate(new Date(trainingTO.getStartDate()));
                training.setEndDate(new Date(trainingTO.getEndDate()));
                training.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                TrainingTO savedTrainingTO = mapper.convert(trainingRepository.save(training), TrainingTO.class);
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
            List<Training> trainings = trainingRepository.findAll();
            return trainings.stream().map(training -> {
                TrainingTO to = mapper.convert(training, TrainingTO.class);
                to.setCreatedByVASid(training.getCreatedBy() == null ? null : training.getCreatedBy().getStringSid());
                to.setUpdatedByVASid(training.getUpdatedBy() == null ? null : training.getUpdatedBy().getStringSid());
                to.setCourseSid(training.getCourse() == null ? null : training.getCourse().getStringSid());
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
                savedTrainingTO.setCreatedByVASid(training.getCreatedBy() == null ? null : training.getCreatedBy().getStringSid());
                savedTrainingTO.setUpdatedByVASid(training.getUpdatedBy() == null ? null : training.getUpdatedBy().getStringSid());
                savedTrainingTO.setCourseSid(training.getCourse() == null ? null : training.getCourse().getStringSid());
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
                List<TrainingSession> trainingSessions = trainingSessionRepository.findTrainingSessionByTraining(training);
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
}
