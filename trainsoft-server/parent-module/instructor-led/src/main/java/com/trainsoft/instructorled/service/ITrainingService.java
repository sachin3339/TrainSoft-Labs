package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.*;

import java.util.List;

public interface ITrainingService {
    TrainingTO createTraining(TrainingTO trainingTO);
    TrainingTO getTrainingBySid(String trainingSid);
    List<TrainingViewTO> getTrainings();
    TrainingSessionTO createTrainingSession(TrainingSessionTO trainingSessionTO);
    TrainingSessionTO getTrainingSessionBySid(String trainingSessionSid);
    List<TrainingSessionTO> getTrainingSessionByTrainingSid(String trainingSid);
    List<TrainingSessionTO> getTrainingSessionByTrainingSidAndCourseSid(String trainingSid,String courseSid);
    String generatePassword();
    public List<UserTO> getParticipantsByBatchSid(String batchSid);
}
