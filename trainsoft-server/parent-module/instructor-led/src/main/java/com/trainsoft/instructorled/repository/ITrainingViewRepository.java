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
    List<TrainingView> findTrainingViewsByNameContaining(String name);
    Page<TrainingView> findAllByStatusNot(InstructorEnum.Status status, Pageable paging);

}
