package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.TrainingView;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITrainingViewRepository extends JpaRepository<TrainingView,Integer> {
    TrainingView findTrainingViewBySid(byte[] sid);
}
