package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.Batch;
import com.trainsoft.instructorled.entity.BatchView;
import com.trainsoft.instructorled.entity.Course;
import com.trainsoft.instructorled.entity.TrainingView;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ITrainingViewRepository extends JpaRepository<TrainingView,Integer>, PagingAndSortingRepository<TrainingView, Integer> {
    TrainingView findTrainingViewBySid(byte[] sid);
    List<TrainingView> findTrainingViewsByNameContainingAndCompanySidAndStatusNot(String name,String companySid,InstructorEnum.Status status);
    Page<TrainingView> findAllByStatusNotAndCompanySid(InstructorEnum.Status status,String companySid, Pageable paging);
    Page<TrainingView> findAllByStatusNotAndCompanySidAndVirtualAccountSid(InstructorEnum.Status status,String companySid,String vASid, Pageable paging);
    //Page<TrainingView> findAllByStatusNotAndCompanySidAndBatchParticipantsSid(InstructorEnum.Status status,String companySid,String vASid, Pageable paging);
}
