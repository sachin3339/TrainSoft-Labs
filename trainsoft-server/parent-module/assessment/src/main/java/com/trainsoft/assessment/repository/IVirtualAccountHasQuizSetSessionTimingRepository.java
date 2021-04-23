package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.VirtualAccountHasQuizSetSessionTiming;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IVirtualAccountHasQuizSetSessionTimingRepository extends JpaRepository<VirtualAccountHasQuizSetSessionTiming,Integer> {
    VirtualAccountHasQuizSetSessionTiming findBySid(byte [] sid);
}
