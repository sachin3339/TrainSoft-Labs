package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.entity.Topic;
import com.trainsoft.assessment.value.AssessmentEnum;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigInteger;
import java.util.List;

public interface ITopicRepository extends JpaRepository<Topic,Integer> {

    @Query("FROM Topic  as tp WHERE tp.sid =?1 AND tp.status ='ENABLED'")
    Topic findTopicBySid(byte[] sid);
    @Query("From Topic as tp WHERE tp.company=?1 AND tp.status ='ENABLED' order by tp.createdOn desc")
    List<Topic> findTopicByCompany(Company company, Pageable pageable);
    @Query(value = "SELECT COUNT(*) FROM quiz as qz WHERE qz.company_id=:company AND qz.status='ENABLED'",nativeQuery = true)
    Integer findTopicCountByCompany(Company company);

    @Query("SELECT tp from Topic as tp where ( tp.name like :searchString OR tp.description like :searchString ) And tp.company=:company And tp.status ='ENABLED' ")
    List<Topic> searchTopic(String searchString,Company company,Pageable pageable);

    @Query("SELECT count (tp) from Topic as tp where ( tp.name like :searchString OR tp.description like :searchString ) And tp.company=:company And tp.status ='ENABLED' ")
    BigInteger pageableTopicCount(String searchString, Company company);

    @Query("SELECT tp FROM Topic as tp WHERE tp.name=:name AND tp.status='ENABLED' AND tp.company=:company")
    Topic findTopicByName(String name ,Company company);
}
