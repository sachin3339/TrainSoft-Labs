package com.trainsoft.instructorled.repository;


import com.trainsoft.instructorled.entity.BatchView;
import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.entity.Course;
import com.trainsoft.instructorled.entity.CourseSession;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICourseSessionRepository extends JpaRepository<CourseSession, Integer>{
	CourseSession findCourseSessionBySid(byte[] sid);
	List<CourseSession> findCourseSessionByCourseAndStatusNot(Course course,InstructorEnum.Status status);
	List<CourseSession> findCourseSessionByCourseAndTopicNameContainingAndCompanyAndStatusNot(Course course,String name, Company company,InstructorEnum.Status status);
	Page<CourseSession> findCourseSessionByCourseAndStatusNot(Course course,InstructorEnum.Status status, Pageable paging);
}
