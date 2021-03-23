package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.BatchView;
import com.trainsoft.instructorled.entity.TrainingView;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface IBatchViewRepository extends JpaRepository<BatchView,Integer>, PagingAndSortingRepository<BatchView, Integer> {
    BatchView findBatchViewBySid(byte[] sid);
    Page<BatchView> findAllByStatusNot(InstructorEnum.Status status, Pageable paging);
}
