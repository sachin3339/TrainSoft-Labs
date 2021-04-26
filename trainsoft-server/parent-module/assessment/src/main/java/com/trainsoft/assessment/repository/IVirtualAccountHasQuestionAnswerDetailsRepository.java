package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.VirtualAccountHasQuestionAnswerDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IVirtualAccountHasQuestionAnswerDetailsRepository extends JpaRepository<VirtualAccountHasQuestionAnswerDetails,Integer> {
    @Query(value = "select * from virtual_account_has_question_answer_details where virtual_account_id=:id",nativeQuery = true)
    List<VirtualAccountHasQuestionAnswerDetails> findByVirtualAccountId(@Param("id") Integer id);
}
