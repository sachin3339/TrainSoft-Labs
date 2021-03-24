package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.Training;
import com.trainsoft.instructorled.entity.TrainingBatch;
import com.trainsoft.instructorled.entity.TrainingCourse;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface ITrainingCourseRepository extends JpaRepository<TrainingCourse, Integer>{
	TrainingCourse findTrainingCourseBySid(byte[] sid);
	TrainingCourse findTrainingCourseByTraining(Training training);
	Integer deleteAllByTraining(Training training);
}
