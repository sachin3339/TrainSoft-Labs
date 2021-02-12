package com.trainsoft.instructorled.repository;


import com.trainsoft.instructorled.entity.CourseSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICourseSessionRepository extends JpaRepository<CourseSession, Integer>{
	CourseSession findCourseSessionBySid(byte[] sid);
}
