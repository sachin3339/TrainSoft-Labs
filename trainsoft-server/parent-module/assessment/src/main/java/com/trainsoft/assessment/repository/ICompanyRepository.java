package com.trainsoft.assessment.repository;


import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.value.AssessmentEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICompanyRepository extends JpaRepository<Company, Integer> {
	@Query("FROM Company  as c WHERE c.status<>'DELETED' AND c.sid=:sid")
	Company findCompanyBySid(byte[] sid);
}
