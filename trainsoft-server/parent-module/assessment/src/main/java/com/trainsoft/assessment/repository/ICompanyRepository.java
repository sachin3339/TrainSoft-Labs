package com.trainsoft.assessment.repository;


import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.value.InstructorEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICompanyRepository extends JpaRepository<Company, Integer> {
	@Query("FROM Company  as c WHERE c.status='ENABLED' AND c.sid=:sid")
	Company findCompanyBySid(byte[] sid);
	List<Company> findCompanyByNameAndStatusNot(String name, InstructorEnum.Status status);
	List<Company> findCompanyByName(String name);
	Company findCompanyBySidAndStatusNot(byte[] sid, InstructorEnum.Status status);

}
