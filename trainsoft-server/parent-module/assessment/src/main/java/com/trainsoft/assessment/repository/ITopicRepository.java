package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITopicRepository extends JpaRepository<Topic,Integer> {

    Topic findTopicBySid(byte[] sid);
}
