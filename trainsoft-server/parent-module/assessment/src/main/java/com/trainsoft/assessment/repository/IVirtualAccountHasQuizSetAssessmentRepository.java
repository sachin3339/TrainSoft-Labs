package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.VirtualAccount;
import com.trainsoft.assessment.entity.VirtualAccountHasQuizSetAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface IVirtualAccountHasQuizSetAssessmentRepository extends JpaRepository<VirtualAccountHasQuizSetAssessment,Integer> {

    @Query(value = "select * from virtual_account_has_quiz_set_assesment where virtual_account_id=:id",nativeQuery = true)
    VirtualAccountHasQuizSetAssessment findByVirtualAccountId(@Param("id") Integer id);

    @Query(value = "select * from virtual_account_has_quiz_set_assesment where quiz_set_id=:id order by percentage desc ",nativeQuery = true)
    List<VirtualAccountHasQuizSetAssessment> findByAssessment(@Param("id") Integer assessmentId);

    @Query(value = "select * from virtual_account_has_quiz_set_assesment where quiz_set_id=:id and submitted_on>=current_date() order by percentage desc ",nativeQuery = true)
    List<VirtualAccountHasQuizSetAssessment> findByAssessmentForCurrentDate(@Param("id")Integer assessmentId);

    @Query(value = "SELECT AVG(vs.percentage) FROM VirtualAccountHasQuizSetAssessment AS vs WHERE vs.virtualAccountId=:virtualAccount")
    Integer findAllAssessmentAverageScore(VirtualAccount virtualAccount);

}
