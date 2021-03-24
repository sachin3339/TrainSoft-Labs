package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.*;

import java.math.BigInteger;
import java.util.List;

public interface ITrainingService {
    TrainingTO createTraining(TrainingTO trainingTO);
    TrainingTO getTrainingBySid(String trainingSid);
    List<TrainingTO> getTrainings();
    List<TrainingViewTO> getTrainingsWithPagination(int pageNo, int pageSize);
    TrainingSessionTO createTrainingSession(TrainingSessionTO trainingSessionTO);
    TrainingSessionTO getTrainingSessionBySid(String trainingSessionSid);
    List<TrainingSessionTO> getTrainingSessionByTrainingSid(String trainingSid);
    List<TrainingSessionTO> getTrainingSessionByTrainingSidAndCourseSid(String trainingSid,String courseSid);
    String generatePassword();
    List<UserTO> getParticipantsByBatchSid(String batchSid);
    List<TrainingViewTO> getTrainingsByName(String name);
    List<TrainingSessionTO> getTrainingSessionsByName(String name);
    boolean deleteTrainingBySid(String trainingSid, String deletedBySid);
    boolean deleteTrainingSessionBySid(String trainingSessionSid, String deletedBySid);
    List<AppUserTO> getUsersByNameOrEmailOrPhoneNumber(String str);
    BigInteger getCountByClass(String classz);
    TrainingTO updateTraining(TrainingTO trainingTO);
}
