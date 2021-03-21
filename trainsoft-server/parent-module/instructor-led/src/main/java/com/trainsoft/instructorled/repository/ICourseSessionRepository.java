package com.trainsoft.instructorled.repository;


import com.trainsoft.instructorled.entity.Course;
import com.trainsoft.instructorled.entity.CourseSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICourseSessionRepository extends JpaRepository<CourseSession, Integer>{
	CourseSession findCourseSessionBySid(byte[] sid);
	List<CourseSession> findCourseSessionByCourse(Course course);
	List<CourseSession> findCourseSessionByTopicNameContaining(String name);
}
