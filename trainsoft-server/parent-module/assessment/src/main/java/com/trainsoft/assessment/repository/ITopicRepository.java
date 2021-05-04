package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.entity.Topic;
import com.trainsoft.assessment.value.AssessmentEnum;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ITopicRepository extends JpaRepository<Topic,Integer> {

    @Query("FROM Topic  as tp WHERE tp.sid =?1 AND tp.status <> 'DELETED'")
    Topic findTopicBySid(byte[] sid);
    @Query("From Topic as tp WHERE tp.company=?1 AND tp.status <> 'DELETED' order by tp.createdOn desc")
    List<Topic> findTopicByCompany(Company company, Pageable pageable);
    @Query(value = "SELECT COUNT(*) FROM quiz as qz WHERE qz.company_id=:company AND qz.status<>'DELETED'",nativeQuery = true)
    Integer findTopicCountByCompany(Company company);
}
