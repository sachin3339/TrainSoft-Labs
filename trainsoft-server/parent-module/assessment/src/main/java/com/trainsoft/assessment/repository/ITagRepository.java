package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Category;
import com.trainsoft.assessment.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ITagRepository extends JpaRepository<Tag,Integer>
{
    @Query("FROM Tag as tg WHERE tg.status='ENABLED' AND tg.sid=:tagSid")
    Tag findBySid(byte[] tagSid);

    @Query("FROM Tag as tg WHERE tg.categoryId=:category AND tg.status='ENABLED'")
    List<Tag> findTagsByStatus(Category category);
}
