package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.entity.Training;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ITrainingRepository extends JpaRepository<Training, Integer>{
	Training findTrainingBySidAndStatusNot(byte[] sid,InstructorEnum.Status status);
	List<Training> findAllByCompanyAndStatusNot(Company company, InstructorEnum.Status status);
}
