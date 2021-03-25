package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.BatchView;
import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.entity.Course;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICourseRepository extends JpaRepository<Course, Integer>{
	Course findCourseBySid(byte[] sid);
	List<Course> findCourseByNameContainingAndCompanyAndStatusNot(String name,Company company,InstructorEnum.Status status);
	Page<Course> findAllByStatusNotAndCompany(InstructorEnum.Status status,Company company, Pageable paging);
	List<Course> findAllByCompanyAndStatusNot(Company company, InstructorEnum.Status status);
	Course findCourseBySidAndCompanyAndStatusNot(byte[] sid,Company company,InstructorEnum.Status status);
}
