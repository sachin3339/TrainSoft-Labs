package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.BatchView;
import com.trainsoft.instructorled.entity.TrainingView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface IBatchViewRepository extends JpaRepository<BatchView,Integer>, PagingAndSortingRepository<BatchView, Integer> {
    BatchView findBatchViewBySid(byte[] sid);
}
