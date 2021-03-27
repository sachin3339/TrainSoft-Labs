package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.BatchView;
import com.trainsoft.instructorled.entity.CourseView;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ICourseViewRepository extends JpaRepository<CourseView,Integer>, PagingAndSortingRepository<CourseView, Integer> {
    CourseView findCourseViewBySid(byte[] sid);
    Page<CourseView>  findAllByCompanySidAndStatusNot(String companySid,InstructorEnum.Status status, Pageable paging);
}
