package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICompanyRepository extends JpaRepository<Company, Integer>{
	Company findCompanyBySid(byte[] sid);
}
