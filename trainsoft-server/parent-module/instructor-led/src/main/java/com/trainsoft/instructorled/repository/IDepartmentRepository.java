package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.entity.Department;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IDepartmentRepository extends JpaRepository<Department, Integer>{
	Department findDepartmentBySidAndStatusNot(byte[] sid, InstructorEnum.Status status);
	Department findDepartmentByNameAndStatusNotAndCompany(String name, InstructorEnum.Status status, Company company);
	List<Department> findAllByCompanyAndStatusNot(Company company,InstructorEnum.Status status);
}
