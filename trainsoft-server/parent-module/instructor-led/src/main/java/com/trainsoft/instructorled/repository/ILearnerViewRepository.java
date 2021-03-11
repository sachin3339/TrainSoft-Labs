package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.AppUser;
import com.trainsoft.instructorled.entity.LearnerView;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ILearnerViewRepository extends JpaRepository<LearnerView, Integer>{
	LearnerView findLearnerViewBySid(byte[] sid);
}
