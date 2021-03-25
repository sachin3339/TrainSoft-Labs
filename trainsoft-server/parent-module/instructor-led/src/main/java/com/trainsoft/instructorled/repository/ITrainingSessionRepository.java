package com.trainsoft.instructorled.repository;


import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.entity.Training;
import com.trainsoft.instructorled.entity.TrainingSession;
import com.trainsoft.instructorled.entity.TrainingView;
import com.trainsoft.instructorled.to.TrainingSessionTO;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ITrainingSessionRepository extends JpaRepository<TrainingSession, Integer>{
    TrainingSession findTrainingSessionBySid(byte[] sid);
	TrainingSession findTrainingSessionBySidAndStatusNot(byte[] sid, InstructorEnum.Status status);
	List<TrainingSession> findTrainingSessionByTrainingAndCompanyAndStatusNot(Training training, Company company, InstructorEnum.Status status);
	List<TrainingSession> findTrainingSessionByAgendaNameContainingAndCompanyAndStatusNot(String name,Company company,InstructorEnum.Status status);
}
