package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.customexception.InstructorException;
import com.trainsoft.instructorled.customexception.RecordNotFoundException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.*;
import com.trainsoft.instructorled.repository.ICourseRepository;
import com.trainsoft.instructorled.repository.ICourseSessionRepository;
import com.trainsoft.instructorled.repository.IVirtualAccountRepository;
import com.trainsoft.instructorled.service.ICourseService;
import com.trainsoft.instructorled.to.BatchTO;
import com.trainsoft.instructorled.to.CourseSessionTO;
import com.trainsoft.instructorled.to.CourseTO;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
@Service
public class CourseServiceImpl implements ICourseService {
    private IVirtualAccountRepository virtualAccountRepository;
    private ICourseRepository courseRepository;
    private ICourseSessionRepository courseSessionRepository;
    private DozerUtils mapper;


    @Override
    public CourseTO createCourse(CourseTO courseTO) {
        try {
            if (courseTO != null) {
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                        (BaseEntity.hexStringToByteArray(courseTO.getCreatedByVASid()));
                Course course = mapper.convert(courseTO, Course.class);
                course.generateUuid();
                course.setCreatedBy(virtualAccount);
                course.setStatus(InstructorEnum.Status.ENABLED);
                course.setUpdatedOn(null);
                course.setTrainingCourses(null);
                course.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                CourseTO savedCourseTO = mapper.convert(courseRepository.save(course), CourseTO.class);
                savedCourseTO.setCreatedByVASid(virtualAccount.getStringSid());
                return savedCourseTO;
            } else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.info("throwing exception while creating the course");
            throw new ApplicationException("Something went wrong while creating the course");
        }
    }

    @Override
    public CourseTO updateCourse(CourseTO courseTO) {
        try {
            if(StringUtils.isNotEmpty(courseTO.getSid())){
                Course course= courseRepository.findCourseBySid(BaseEntity.hexStringToByteArray(courseTO.getSid()));
                VirtualAccount virtualAccount= virtualAccountRepository.findVirtualAccountBySid(
                        BaseEntity.hexStringToByteArray(courseTO.getCreatedByVASid()));
                course.setUpdatedBy(virtualAccount);
                course.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
                CourseTO savedCourse=mapper.convert(courseRepository.save(course),CourseTO.class);
                savedCourse.setUpdatedByVASid(virtualAccount.getStringSid());
                return savedCourse;
            }else
                throw new RecordNotFoundException();
        } catch (Exception e)
        {
            log.info("throwing exception while updating the course");
            throw new ApplicationException("Something went wrong while updating the course");
        }
    }

    @Override
    public CourseTO getCourseBySid(String courseSid) {
        Course course = courseRepository.findCourseBySid(BaseEntity.hexStringToByteArray(courseSid));
        try {
            if (!StringUtils.isEmpty(courseSid) && course != null)
                return mapper.convert(course, CourseTO.class);
            else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.info("throwing exception while fetching the course details by sid");
            throw new ApplicationException("Something went wrong while fetching the course details by sid");
        }
    }

    @Override
    public List<CourseTO> getCourses() {
        try {
            List<Course> courses = courseRepository.findAll();
            return courses.stream().map(course->{
                CourseTO to= mapper.convert(course, CourseTO.class);
                to.setCreatedByVASid(course.getCreatedBy()==null?null:course.getCreatedBy().getStringSid());
                to.setUpdatedByVASid(course.getUpdatedBy()==null?null:course.getUpdatedBy().getStringSid());
                return to;
            }).collect(Collectors.toList());
        }catch (Exception e) {
            log.info("throwing exception while fetching the all course details");
            throw new ApplicationException("Something went wrong while fetching the course details");
        }
    }

    @Override
    public boolean deleteCourseBySid(String courseSid, String deletedBySid) {
        Course course = courseRepository.findCourseBySid(BaseEntity.hexStringToByteArray(courseSid));
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                (BaseEntity.hexStringToByteArray(deletedBySid));
        try {
            if (!StringUtils.isEmpty(courseSid) && course != null) {
                course.setStatus(InstructorEnum.Status.DELETED);
                course.setUpdatedBy(virtualAccount);
                course.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
                courseRepository.save(course);
                log.info(String.format("Course %s is deleted successfully by %s", deletedBySid));
                return true;
            } else
               throw new RecordNotFoundException();
        } catch (Exception e) {
            log.info("throwing exception while deleting the Course details by sid");
            throw new ApplicationException("Something went wrong while deleting the Course details by sid");
        }
    }

    @Override
    public CourseSessionTO createSession(CourseSessionTO courseSessionTO) {
        Course course = courseRepository.findCourseBySid(BaseEntity.hexStringToByteArray(courseSessionTO.getCourseSid()));
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid(
                BaseEntity.hexStringToByteArray(courseSessionTO.getCreatedByVASid()));
        try {
            if (StringUtils.isNotEmpty(course.getStringSid())) {
                CourseSession courseSession = mapper.convert(courseSessionTO, CourseSession.class);
                courseSession.generateUuid();
                courseSession.setStatus(InstructorEnum.Status.ENABLED);
                courseSession.setCourse(course);
                courseSession.setCreatedBy(virtualAccount);
                courseSession.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                courseSession.setUpdatedOn(null);
                CourseSessionTO savedCourseSessionTO= mapper.convert(courseSessionRepository.save(courseSession),CourseSessionTO.class);
                savedCourseSessionTO.setCreatedByVASid(virtualAccount.getStringSid());
                return savedCourseSessionTO;
            } else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.info("throwing exception while updating the Course session details");
            throw new ApplicationException("Something went wrong while updating the Course session details");
        }
    }

    @Override
    public CourseSessionTO updateCourseSession(CourseSessionTO courseSessionTO) {
        try {
            if(StringUtils.isNotEmpty(courseSessionTO.getSid())){
                CourseSession courseSession= courseSessionRepository.findCourseSessionBySid(
                        BaseEntity.hexStringToByteArray(courseSessionTO.getSid()));
                VirtualAccount virtualAccount= virtualAccountRepository.findVirtualAccountBySid(
                        BaseEntity.hexStringToByteArray(courseSessionTO.getCreatedByVASid()));
                courseSession.setUpdatedBy(virtualAccount);
                courseSession.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
                CourseSessionTO savedSession=mapper.convert(courseSessionRepository.save(courseSession),CourseSessionTO.class);
                savedSession.setUpdatedByVASid(virtualAccount.getStringSid());
                return savedSession;
            }else
                throw new RecordNotFoundException();
        } catch (Exception e)
        {
            log.info("throwing exception while updating the course Session");
            throw new ApplicationException("Something went wrong while updating the course Session");
        }
    }

    @Override
    public boolean deleteCourseSessionBySid(String courseSessionSid, String deletedBySid) {
        CourseSession courseSession = courseSessionRepository.findCourseSessionBySid(BaseEntity.hexStringToByteArray(courseSessionSid));
        VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                (BaseEntity.hexStringToByteArray(deletedBySid));
        try {
            if (!StringUtils.isEmpty(courseSessionSid) && courseSession != null) {
                courseSession.setStatus(InstructorEnum.Status.DELETED);
                courseSession.setUpdatedBy(virtualAccount);
                courseSession.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
                courseSessionRepository.save(courseSession);
                log.info(String.format("Course Session %s is deleted successfully by %s", deletedBySid));
                return true;
            } else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.info("throwing exception while deleting the Course Session details by sid");
            throw new ApplicationException("Something went wrong while deleting the Course Session details by sid");
        }
    }

    @Override
    public List<CourseSessionTO> findCourseSessionByCourseSid(String courseSid) {
        Course course = courseRepository.findCourseBySid(BaseEntity.hexStringToByteArray(courseSid));
        try {
            if (StringUtils.isNotEmpty(course.getStringSid())) {
                List<CourseSession> courseSessions = courseSessionRepository.findCourseSessionByCourse(course);
               return courseSessions.stream().map(courseSession -> {
                    CourseSessionTO to = mapper.convert(courseSession, CourseSessionTO.class);
                    to.setCreatedByVASid(courseSession.getCreatedBy() == null ? null : courseSession.getCreatedBy().getStringSid());
                    to.setUpdatedByVASid(courseSession.getUpdatedBy() == null ? null : courseSession.getUpdatedBy().getStringSid());
                    to.setCourseSid(courseSession.getCourse() == null ? null : courseSession.getCourse().getStringSid());
                    return to;
                }).collect(Collectors.toList());
            } else
                throw new RecordNotFoundException();
        } catch (Exception e) {
            log.info("throwing exception while fetching the Course session details");
            throw new ApplicationException("throwing exception while fetching the all course session details based on courseSid");
        }
    }

    @Override
    public List<CourseTO> getCoursesByName(String name) {
        try {
            List<Course> courseList= courseRepository.findCourseByNameContaining(name);
            return mapper.convertList(courseList, CourseTO.class);
        }catch (Exception e)
        {
            log.info("throwing exception while fetching the Courses details by name");
            throw new ApplicationException("Something went wrong while fetching the Courses details by name ");
        }
    }

    @Override
    public List<CourseSessionTO> getCourseSessionsByName(String name) {
        try {
            List<CourseSession> courseSessionList= courseSessionRepository.findCourseSessionByTopicNameContaining(name);
            return mapper.convertList(courseSessionList, CourseSessionTO.class);
        }catch (Exception e)
        {
            log.info("throwing exception while fetching the list courseSession details by name");
            throw new ApplicationException("Something went wrong while fetching the list courseSession details by name ");
        }
    }
}
