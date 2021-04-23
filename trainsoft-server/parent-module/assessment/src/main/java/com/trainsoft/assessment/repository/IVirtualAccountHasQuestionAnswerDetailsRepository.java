package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.VirtualAccountHasQuestionAnswerDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface IVirtualAccountHasQuestionAnswerDetailsRepository extends JpaRepository<VirtualAccountHasQuestionAnswerDetails,Integer> {
    @Query(value = "select * from virtual_account_has_question_answer_details where virtual_account_id=:id",nativeQuery = true)
    List<VirtualAccountHasQuestionAnswerDetails> findByVirtualAccountId(@Param("id") Integer id);

    @Query(value = "select count(*) correct_answer from virtual_account_has_question_answer_details where is_correct=true and virtual_account_id=:id",nativeQuery = true)
    Integer findCountOfCorrectAnswers(@Param("id") Integer virtualAccountId);

    @Query(value = "select count(*) wrong_answer from virtual_account_has_question_answer_details where is_correct=false and virtual_account_id=:id",nativeQuery = true)
    Integer findCountOfWrongAnswers(@Param("id") Integer virtualAccountId);

    @Query(value = "select count(*) attempted_questions from virtual_account_has_question_answer_details where virtual_account_id=:id",nativeQuery = true)
    Integer findCountsOfAttemptedQuestions(@Param("id")Integer virtualAccountId);

    @Query(value = "select * from virtual_account_has_question_answer_details where is_correct=true and virtual_account_id=:id",nativeQuery = true)
    List<VirtualAccountHasQuestionAnswerDetails> findListOfCorrectResponse(@Param("id") Integer virtualAccountId);
}
