package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.TrainingBatch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITrainingBatchRepository extends JpaRepository<TrainingBatch, Integer>{
	TrainingBatch findTrainingBatchBySid(byte[] sid);
}
