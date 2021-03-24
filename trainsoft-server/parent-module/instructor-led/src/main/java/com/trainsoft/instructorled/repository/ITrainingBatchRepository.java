package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.Batch;
import com.trainsoft.instructorled.entity.Training;
import com.trainsoft.instructorled.entity.TrainingBatch;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface ITrainingBatchRepository extends JpaRepository<TrainingBatch, Integer>{
	TrainingBatch findTrainingBatchBySid(byte[] sid);
	List<TrainingBatch> findTrainingBatchByTraining(Training training);
	Integer deleteAllByTraining(Training training);
}
