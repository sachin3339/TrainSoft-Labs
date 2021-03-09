package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.TrainingSessionTO;
import com.trainsoft.instructorled.to.TrainingTO;

import java.util.List;

public interface ITrainingService {
    TrainingTO createTraining(TrainingTO trainingTO);
    TrainingTO getTrainingBySid(String trainingSid);
    List<TrainingTO> getTrainings();
    TrainingSessionTO createTrainingSession(TrainingSessionTO trainingSessionTO);
    TrainingSessionTO getTrainingSessionBySid(String trainingSessionSid);
    List<TrainingSessionTO> getTrainingSessionByTrainingSid(String trainingSid);
}
