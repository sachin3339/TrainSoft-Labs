package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDepartmentRepository extends JpaRepository<Department, Integer>{
	Department findDepartmentBySid(byte[] sid);
}
