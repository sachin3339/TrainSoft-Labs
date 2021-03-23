package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.BatchView;
import com.trainsoft.instructorled.entity.Course;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICourseRepository extends JpaRepository<Course, Integer>{
	Course findCourseBySid(byte[] sid);
	List<Course> findCourseByNameContaining(String name);
	Page<Course> findAllByStatusNot(InstructorEnum.Status status, Pageable paging);
}
