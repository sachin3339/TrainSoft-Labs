package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.CourseTechnology;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICourseTechnologyRepository extends JpaRepository<CourseTechnology, Integer>{
	CourseTechnology findCourseTechnologyBySid(byte[] sid);
}
