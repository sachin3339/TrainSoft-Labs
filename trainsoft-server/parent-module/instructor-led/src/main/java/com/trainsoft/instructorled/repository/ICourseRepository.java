package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICourseRepository extends JpaRepository<Course, Integer>{
	Course findCourseBySid(byte[] sid);
}
