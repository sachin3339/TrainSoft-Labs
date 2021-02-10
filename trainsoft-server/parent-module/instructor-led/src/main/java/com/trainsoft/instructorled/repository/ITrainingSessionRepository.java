package com.trainsoft.instructorled.repository;


import com.trainsoft.instructorled.entity.TrainingSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITrainingSessionRepository extends JpaRepository<TrainingSession, Integer>{
	TrainingSession findTrainingSessionBySid(byte[] sid);
}
