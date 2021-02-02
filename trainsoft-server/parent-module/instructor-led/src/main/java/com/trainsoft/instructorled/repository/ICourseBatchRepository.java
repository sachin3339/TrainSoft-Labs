package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.CourseBatch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICourseBatchRepository extends JpaRepository<CourseBatch, Integer>{
	CourseBatch findCourseBatchBySid(byte[] sid);
}
