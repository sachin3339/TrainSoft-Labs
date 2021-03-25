package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigInteger;
import java.util.List;

public interface ITrainingService {
    TrainingTO createTraining(TrainingTO trainingTO);
    TrainingTO updateTraining(TrainingTO trainingTO);
    TrainingTO getTrainingBySid(String trainingSid);
    List<TrainingTO> getTrainings();
    List<TrainingViewTO> getTrainingsWithPagination(int pageNo, int pageSize);
    List<TrainingViewTO> getTrainingsByName(String name);
    boolean deleteTrainingBySid(String trainingSid, String deletedBySid);

    TrainingSessionTO createTrainingSession(MultipartFile file,TrainingSessionTO trainingSessionTO);
    TrainingSessionTO updateTrainingSession(TrainingSessionTO trainingSessionTO);
    TrainingSessionTO getTrainingSessionBySid(String trainingSessionSid);
    List<TrainingSessionTO> getTrainingSessionByTrainingSid(String trainingSid);
    List<TrainingSessionTO> getTrainingSessionByTrainingSidAndCourseSid(String trainingSid,String courseSid);
    List<TrainingSessionTO> getTrainingSessionsByTrainingSidAndSessionName(String trainingSid,String name);
    boolean deleteTrainingSessionBySid(String trainingSessionSid, String deletedBySid);

    String generatePassword();
    List<UserTO> getParticipantsByBatchSid(String batchSid);
    List<AppUserTO> getUsersByNameOrEmailOrPhoneNumber(String str);
    BigInteger getCountByClass(String classz);
    void updateVirtualAccountStatus(String virtualAccountSid, String status);


}
