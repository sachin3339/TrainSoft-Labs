package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.TrainingCourse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITrainingCourseRepository extends JpaRepository<TrainingCourse, Integer>{
	TrainingCourse findTrainingCourseBySid(byte[] sid);
}
