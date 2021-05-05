package com.trainsoft.assessment.repository;


import com.trainsoft.assessment.entity.VirtualAccountAssessment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface IVirtualAccountAssessmentRepository extends JpaRepository<VirtualAccountAssessment, Integer>{
	VirtualAccountAssessment findVirtualAccountAssessmentBySid(byte[] sid);

}
