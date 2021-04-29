package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ITopicRepository extends JpaRepository<Topic,Integer> {

    Topic findTopicBySid(byte[] sid);
    List<Topic> findTopicByCompany(Company company);
}
