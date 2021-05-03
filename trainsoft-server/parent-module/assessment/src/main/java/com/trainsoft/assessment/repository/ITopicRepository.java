package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.entity.Topic;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ITopicRepository extends JpaRepository<Topic,Integer> {

    Topic findTopicBySid(byte[] sid);
    List<Topic> findTopicByCompany(Company company, Pageable pageable);

    @Query(value = "SELECT COUNT(*) FROM quiz as qz WHERE qz.company_id=:company",nativeQuery = true)
    Integer findTopicCountByCompany(Company company);
}
