package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.BatchView;
import com.trainsoft.instructorled.entity.TrainingView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ITrainingViewRepository extends JpaRepository<TrainingView,Integer>, PagingAndSortingRepository<TrainingView, Integer> {
    TrainingView findTrainingViewBySid(byte[] sid);
}
