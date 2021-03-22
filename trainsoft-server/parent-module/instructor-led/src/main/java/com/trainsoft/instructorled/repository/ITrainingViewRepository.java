package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.Batch;
import com.trainsoft.instructorled.entity.BatchView;
import com.trainsoft.instructorled.entity.TrainingView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ITrainingViewRepository extends JpaRepository<TrainingView,Integer>, PagingAndSortingRepository<TrainingView, Integer> {
    TrainingView findTrainingViewBySid(byte[] sid);
    List<TrainingView> findTrainingViewsByNameContaining(String name);

}
