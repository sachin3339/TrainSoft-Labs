package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Answer;
import com.trainsoft.assessment.entity.Assessment;
import com.trainsoft.assessment.entity.VirtualAccount;
import com.trainsoft.assessment.entity.VirtualAccountHasQuestionAnswerDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

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
    @Query(value = "select * from virtual_account_has_question_answer_details where virtual_account_id=:id",nativeQuery = true)
    List<VirtualAccountHasQuestionAnswerDetails> findVirtualAccountHasQuestionAnswerDetailsByVirtualAccount(@Param("id") Integer virtualAccountId);

    @Modifying(clearAutomatically = true)
    @Transactional
    void deleteVirtualAccountHasQuestionAnswerDetailsByVirtualAccountIdAndQuiz(VirtualAccount virtualAccount, Assessment assessment);
    List<VirtualAccountHasQuestionAnswerDetails> findVirtualAccountHasQuestionAnswerDetailsByVirtualAccountIdAndQuiz(VirtualAccount virtualAccount, Assessment assessment);

    @Query(value = "UPDATE VirtualAccountHasQuestionAnswerDetails SET answer=:answer , isCorrect=:res WHERE hex(sid)=:sid")
    void updateAnswer(String sid, Answer answer,boolean res);


}
