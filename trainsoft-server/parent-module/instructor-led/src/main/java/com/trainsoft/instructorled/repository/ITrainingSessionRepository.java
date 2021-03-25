package com.trainsoft.instructorled.repository;


import com.trainsoft.instructorled.entity.Training;
import com.trainsoft.instructorled.entity.TrainingSession;
import com.trainsoft.instructorled.entity.TrainingView;
import com.trainsoft.instructorled.to.TrainingSessionTO;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ITrainingSessionRepository extends JpaRepository<TrainingSession, Integer>{
	TrainingSession findTrainingSessionBySid(byte[] sid);
	List<TrainingSession> findTrainingSessionByTraining(Training training);
	List<TrainingSession> findTrainingSessionByTrainingAndStatusNotAndAgendaNameContaining(Training training, InstructorEnum.Status status,String name);
}
