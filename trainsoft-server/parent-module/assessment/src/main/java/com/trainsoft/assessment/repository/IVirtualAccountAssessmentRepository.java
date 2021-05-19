package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Assessment;
import com.trainsoft.assessment.entity.VirtualAccount;
import com.trainsoft.assessment.entity.VirtualAccountAssessment;
import com.trainsoft.assessment.enums.QuizStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface IVirtualAccountAssessmentRepository extends JpaRepository<VirtualAccountAssessment, Integer>{
	VirtualAccountAssessment findVirtualAccountAssessmentBySid(byte[] sid);

	@Query("SELECT COUNT(vaa) FROM VirtualAccountAssessment AS vaa WHERE vaa.assessment=:assessment")
	Integer getCountByAssessment(Assessment assessment);

	List<VirtualAccountAssessment> findVirtualAccountAssessmentByAssessment(Assessment assessment);

	@Modifying
	@Transactional
	@Query(value = "UPDATE VirtualAccountAssessment VA SET VA.status=:status WHERE VA.virtualAccount=:id AND VA.assessment=:qid")
	void updateStatus(@Param("status") QuizStatus status, @Param("id") VirtualAccount virtualAccount,@Param("qid") Assessment assessment);

	VirtualAccountAssessment findByAssessmentAndVirtualAccount(Assessment assessment,VirtualAccount virtualAccount);

	@Query(value = "SELECT COUNT(vs) FROM VirtualAccountAssessment AS vs WHERE vs.virtualAccount=:virtualAccount")
	Integer findCountOfAssessmentTaken( VirtualAccount virtualAccount);

	@Query(value = "SELECT COUNT(va) FROM VirtualAccountAssessment AS va WHERE va.virtualAccount=:virtualAccount AND va.status='STARTED'")
	Integer findCountOfOnGoingAssessments(VirtualAccount virtualAccount);

	@Query(value = "SELECT COUNT(va) FROM VirtualAccountAssessment  AS va WHERE va.virtualAccount=:virtualAccount AND va.status='COMPLETED'")
	Integer findCountOfCompletedAssessments(VirtualAccount virtualAccount);

	@Query(value = "SELECT COUNT(va) FROM VirtualAccountAssessment AS va WHERE va.virtualAccount=:virtualAccount AND va.status='QUIT'")
	Integer findCountOfQuitAssessments(VirtualAccount virtualAccount);

	@Query(value = "SELECT qs.id,qs.title,qs.description,qs.difficulty,qs.duration,qs.tagId.id,qs.url,\n" +
			"vs.percentage,vt.status,vt.virtualAccount.id\n" +
			"FROM Assessment  qs\n" +
			"INNER JOIN VirtualAccountAssessment vt ON qs.id=vt.assessment.id AND qs.status='ENABLED'\n" +
			"LEFT OUTER JOIN VirtualAccountHasQuizSetAssessment vs ON\n" +
			"vt.virtualAccount=vs.virtualAccountId AND vt.assessment=vs.quizSetId\n" +
			"WHERE vt.virtualAccount=:virtualAccount")
	List<Object[]> getAllMyAssessmentsAndCounts(VirtualAccount virtualAccount, Pageable pageable);

	@Query(value = "SELECT qs.id,qs.title,qs.description,qs.difficulty,qs.duration,qs.tagId.id,qs.url,\n" +
			"vs.percentage,vt.status,vt.virtualAccount.id\n" +
			"FROM Assessment  qs\n" +
			"INNER JOIN VirtualAccountAssessment vt ON qs.id=vt.assessment.id AND qs.status='ENABLED'\n" +
			"LEFT OUTER JOIN VirtualAccountHasQuizSetAssessment vs ON\n" +
			"vt.virtualAccount=vs.virtualAccountId AND vt.assessment=vs.quizSetId\n" +
			"WHERE vt.virtualAccount=:virtualAccount AND vt.status=:status")
	List<Object[]> getAllMyAssessmentsAndStatusAndCounts(QuizStatus status,VirtualAccount virtualAccount,Pageable pageable);

	@Query(value = "SELECT COUNT(qs) FROM Assessment  qs\n" +
			"INNER JOIN VirtualAccountAssessment vt ON qs.id=vt.assessment.id AND qs.status='ENABLED'\n" +
			"LEFT OUTER JOIN VirtualAccountHasQuizSetAssessment vs ON\n" +
			"vt.virtualAccount=vs.virtualAccountId AND vt.assessment=vs.quizSetId\n" +
			"WHERE vt.virtualAccount=:virtualAccount")
	Integer getCountsForAllMyAssessments(VirtualAccount virtualAccount);

	@Query(value = "SELECT COUNT(qs) FROM Assessment  qs\n" +
			"INNER JOIN VirtualAccountAssessment vt ON qs.id=vt.assessment.id AND qs.status='ENABLED'\n" +
			"LEFT OUTER JOIN VirtualAccountHasQuizSetAssessment vs ON\n" +
			"vt.virtualAccount=vs.virtualAccountId AND vt.assessment=vs.quizSetId\n" +
			"WHERE vt.virtualAccount=:virtualAccount AND vt.status=:status")
	Integer getStatusBasedCountForMyAssessment(QuizStatus status,VirtualAccount virtualAccount);

	@Query("SELECT vaa FROM VirtualAccountAssessment  vaa WHERE vaa.virtualAccount=:virtualAccount AND vaa.assessment=:assessment AND vaa.status <> 'COMPLETED' ")
    List<VirtualAccountAssessment> checkVirtualAccountAndAssessmentAndStatus(VirtualAccount virtualAccount,Assessment assessment);

}