package com.trainsoft.instructorled.repository;


import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICompanyRepository extends JpaRepository<Company, Integer> {
	Company findCompanyBySid(byte[] sid);
	List<Company> findCompanyByNameAndStatusNot(String name, InstructorEnum.Status status);
	List<Company> findCompanyByName(String name);
}
