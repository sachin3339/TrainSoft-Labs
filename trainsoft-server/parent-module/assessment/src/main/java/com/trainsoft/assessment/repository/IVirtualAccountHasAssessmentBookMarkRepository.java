package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Assessment;
import com.trainsoft.assessment.entity.VirtualAccount;
import com.trainsoft.assessment.entity.VirtualAccountHasAssessmentBookMark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IVirtualAccountHasAssessmentBookMarkRepository extends JpaRepository<VirtualAccountHasAssessmentBookMark,Integer>
{
     @Query("FROM VirtualAccountHasAssessmentBookMark  as vabm WHERE vabm.assessment=:assessment AND vabm.virtualAccount=:virtualAccount")
     VirtualAccountHasAssessmentBookMark findByVirtualAccountAndAssessment(Assessment assessment, VirtualAccount virtualAccount);

     @Query("SELECT vabm.assessment FROM VirtualAccountHasAssessmentBookMark  as vabm WHERE vabm.virtualAccount=:virtualAccount")
     List<Assessment> findAssessmentsByVirtualAccount(VirtualAccount virtualAccount);
}