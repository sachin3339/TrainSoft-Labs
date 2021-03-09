package com.trainsoft.instructorled.repository;


import com.trainsoft.instructorled.entity.Training;
import com.trainsoft.instructorled.entity.TrainingSession;
import com.trainsoft.instructorled.to.TrainingSessionTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ITrainingSessionRepository extends JpaRepository<TrainingSession, Integer>{
	TrainingSession findTrainingSessionBySid(byte[] sid);
	List<TrainingSession> findTrainingSessionByTraining(Training training);
}
