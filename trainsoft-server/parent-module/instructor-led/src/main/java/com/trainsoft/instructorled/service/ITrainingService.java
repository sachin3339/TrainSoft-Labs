package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigInteger;
import java.util.List;

public interface ITrainingService {
    TrainingTO createTraining(TrainingTO trainingTO);
    TrainingTO updateTraining(TrainingTO trainingTO);
    TrainingTO getTrainingBySid(String trainingSid);
    List<TrainingTO> getTrainings(String companySid);
    List<TrainingViewTO> getTrainingsWithPagination(int pageNo, int pageSize,String companySid);
    List<TrainingViewTO> getTrainingsByName(String name,String companySid);
    boolean deleteTrainingBySid(String trainingSid, String deletedBySid,String companySid);


    TrainingSessionTO createTrainingSession(TrainingSessionTO trainingSessionTO);
    TrainingSessionTO updateTrainingSession(TrainingSessionTO trainingSessionTO);
    TrainingSessionTO getTrainingSessionBySid(String trainingSessionSid);
    List<TrainingSessionTO> getTrainingSessionByTrainingSid(String trainingSid,String companySid);
    List<TrainingSessionTO> getTrainingSessionByTrainingSidAndCourseSid(String trainingSid,String courseSid,String companySid);
    List<TrainingSessionTO> getTrainingSessionsByName(String trainingSid,String name,String companySid);
    boolean deleteTrainingSessionBySid(String trainingSessionSid, String deletedBySid);
    void updateTrainingSessionStatus(String sessionSid,String status,String updatedBy);


    String generatePassword();
    List<UserTO> getParticipantsByBatchSid(String batchSid,String companySid);
    List<UserTO> getUsersByNameOrEmailOrPhoneNumber(String str, String companySid);
    BigInteger getCountByClass(String classz,String companySid);
    boolean updateVirtualAccountRole(String role, String virtualAccountSid, String virtualAccountSid1);
    boolean updateDepartmentRole(String role, String departmentVASid, String virtualAccountSid);
    boolean validateEmail(String email);
    boolean validateBatch(String batchName, String companySid);
    void updateVirtualAccountStatus(String virtualAccountSid, String status);
    public List<TrainingViewTO> getTrainingsOnRoleWithPagination(int pageNo, int pageSize,String companySid,String vASid);

}
