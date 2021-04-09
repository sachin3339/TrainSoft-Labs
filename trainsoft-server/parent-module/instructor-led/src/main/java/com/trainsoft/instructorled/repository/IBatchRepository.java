package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.Batch;
import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IBatchRepository extends JpaRepository<Batch, Integer>{
	Batch findBatchBySid(byte[] sid);
	List<Batch> findBatchesByNameContainingAndCompany(String name,Company company);
	List<Batch> findBatchesByCompanyAndName(Company company, String name);
	List<Batch> findAllByCompany(Company company);
	Batch findBatchBySidAndCompanyAndStatusNot(byte[] sid, Company company, InstructorEnum.Status status);

}
