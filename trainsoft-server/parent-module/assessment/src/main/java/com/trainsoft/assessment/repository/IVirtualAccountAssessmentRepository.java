package com.trainsoft.assessment.repository;


import com.trainsoft.assessment.entity.Assessment;
import com.trainsoft.assessment.entity.VirtualAccountAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface IVirtualAccountAssessmentRepository extends JpaRepository<VirtualAccountAssessment, Integer>{
	VirtualAccountAssessment findVirtualAccountAssessmentBySid(byte[] sid);

	@Query("SELECT COUNT(vaa) FROM VirtualAccountAssessment AS vaa WHERE vaa.assessment=:assessment")
	Integer getCountByAssessment(Assessment assessment);

}
