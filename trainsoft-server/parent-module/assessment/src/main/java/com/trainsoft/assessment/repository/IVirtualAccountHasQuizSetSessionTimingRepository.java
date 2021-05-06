package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Assessment;
import com.trainsoft.assessment.entity.VirtualAccount;
import com.trainsoft.assessment.entity.VirtualAccountHasQuizSetSessionTiming;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IVirtualAccountHasQuizSetSessionTimingRepository extends JpaRepository<VirtualAccountHasQuizSetSessionTiming,Integer> {
    VirtualAccountHasQuizSetSessionTiming findBySid(byte [] sid);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "update virtual_account_has_quiz_set_session_timing set end_time=now() where virtual_account_id=:id",nativeQuery = true)
    int setEndTimeForAssessment(@Param("id") Integer virtualAccountId);

    @Query(value ="select * from virtual_account_has_quiz_set_session_timing where virtual_account_id=:id",nativeQuery = true)
    VirtualAccountHasQuizSetSessionTiming findByVirtualAccountId(@Param("id") Integer id);

    @Query("FROM VirtualAccountHasQuizSetSessionTiming as vaqs WHERE vaqs.quizSetId=:assessment AND vaqs.endTime IS NULL")
    List<VirtualAccountHasQuizSetSessionTiming> findByQuizSetId(Assessment assessment);
}
