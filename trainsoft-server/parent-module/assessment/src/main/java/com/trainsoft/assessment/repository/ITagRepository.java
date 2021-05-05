package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ITagRepository extends JpaRepository<Tag,Integer>
{
    @Query("FROM Tag as tg WHERE tg.status<>'DELETED' AND tg.sid=:tagSid")
    Tag findBySid(byte[] tagSid);
}
