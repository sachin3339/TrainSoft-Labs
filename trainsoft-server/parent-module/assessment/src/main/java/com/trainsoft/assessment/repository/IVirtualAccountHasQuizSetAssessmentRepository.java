package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface IVirtualAccountHasQuizSetAssessmentRepository extends JpaRepository<VirtualAccountHasQuizSetAssessment,Integer> {

    @Query(value = "select * from virtual_account_has_quiz_set_assesment where virtual_account_id=:vid and id=:id",nativeQuery = true)
    VirtualAccountHasQuizSetAssessment findByVirtualAccountId(@Param("vid") Integer vid,@Param("id")Integer id);

    @Query(value = "select * from virtual_account_has_quiz_set_assesment where quiz_set_id=:id order by percentage desc ",nativeQuery = true)
    List<VirtualAccountHasQuizSetAssessment> findByAssessment(@Param("id") Integer assessmentId);

    @Query(value = "select * from virtual_account_has_quiz_set_assesment where quiz_set_id=:id and submitted_on>=current_date() order by percentage desc ",nativeQuery = true)
    List<VirtualAccountHasQuizSetAssessment> findByAssessmentForCurrentDate(@Param("id")Integer assessmentId);

    @Query(value = "SELECT AVG(vs.percentage) FROM VirtualAccountHasQuizSetAssessment AS vs WHERE vs.virtualAccountId=:virtualAccount")
    Integer findAllAssessmentAverageScore(VirtualAccount virtualAccount);

    @Query(value = "SELECT va.categoryId,AVG (va.percentage) AS average FROM VirtualAccountHasQuizSetAssessment AS va " +
                   "WHERE va.virtualAccountId=:virtualAccount GROUP BY va.categoryId")
    List<Object[]> getCategoryAverageScore(VirtualAccount virtualAccount);

    @Query(value = "select * from virtual_account_has_quiz_set_assesment where company_id=:id " +
            "order by percentage desc limit 10",nativeQuery = true)
    List<VirtualAccountHasQuizSetAssessment>getTopTenListForAllCategory(@Param("id") Integer companyId);

    @Query(value = "select * from virtual_account_has_quiz_set_assesment where company_id=:id and category_id=:cid " +
            "order by percentage desc limit 10",nativeQuery = true)
    List<VirtualAccountHasQuizSetAssessment>getTopTenListByCategory(@Param("id") Integer companyId,@Param("cid") Integer categoryId);

    @Query("FROM VirtualAccountHasQuizSetAssessment vaa WHERE vaa.quizSetId=:assessment  AND vaa.virtualAccountId=:virtualAccount ORDER BY vaa.submittedOn DESC")
    List<VirtualAccountHasQuizSetAssessment> findByVirtualAccountAndAssessment(Assessment assessment,VirtualAccount virtualAccount);
}
