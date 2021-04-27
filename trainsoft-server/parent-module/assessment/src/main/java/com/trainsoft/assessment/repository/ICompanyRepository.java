package com.trainsoft.assessment.repository;


import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.value.AssessmentEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICompanyRepository extends JpaRepository<Company, Integer> {
	Company findCompanyBySid(byte[] sid);
	List<Company> findCompanyByNameAndStatusNot(String name, AssessmentEnum.Status status);
	List<Company> findCompanyByName(String name);
}