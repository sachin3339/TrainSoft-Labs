package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.customexception.RecordNotFoundException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.*;
import com.trainsoft.instructorled.repository.*;
import com.trainsoft.instructorled.service.ICourseService;
import com.trainsoft.instructorled.to.CourseSessionTO;
import com.trainsoft.instructorled.to.CourseTO;
import com.trainsoft.instructorled.to.CourseViewTO;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
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
    private ICourseViewRepository courseViewRepository;
    private ICompanyRepository companyRepository;


    @Override
    public CourseTO createCourse(CourseTO courseTO) {
        try {
            if (courseTO != null) {
                VirtualAccount virtualAccount = virtualAccountRepository.findVirtualAccountBySid
                        (BaseEntity.hexStringToByteArray(courseTO.getCreatedByVASid()));
                Course course = mapper.convert(courseTO, Course.class);
                course.generateUuid();
                course.setCreatedBy(virtualAccount);
                course.setCompany(getCompany(courseTO.getCompanySid()));
                course.setStatus(InstructorEnum.Status.ENABLED);
                course.setUpdatedOn(null);
                course.setTrainingCourses(null);
                course.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                CourseTO savedCourseTO = mapper.convert(courseRepository.save(course), CourseTO.class);
                savedCourseTO.setCreatedByVASid(virtualAccount.getStringSid());
                return savedCourseTO;
            } else
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            log.error("throwing exception while creating the course",e.toString());
            throw new ApplicationException("Something went wrong while creating the course"+e.getMessage());
        }
    }
    private Company getCompany(String companySid){
        Company c=companyRepository.findCompanyBySid(BaseEntity.hexStringToByteArray(companySid));
        Company company=new Company();
        company.setId(c.getId());
        return company;
    }
    @Override
    public CourseTO updateCourse(CourseTO courseTO) {
        try {
            if(StringUtils.isNotEmpty(courseTO.getSid())){
                Course course= courseRepository.findCourseBySid(BaseEntity.hexStringToByteArray(courseTO.getSid()));
                VirtualAccount virtualAccount= virtualAccountRepository.findVirtualAccountBySid(
                        BaseEntity.hexStringToByteArray(courseTO.getUpdatedByVASid()));
                course.setUpdatedBy(virtualAccount);
                course.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
                course.setStatus(courseTO.getStatus());
                course.setName(courseTO.getName());
                course.setDescription(courseTO.getDescription());
                CourseTO savedCourse=mapper.convert(courseRepository.save(course),CourseTO.class);
                savedCourse.setUpdatedByVASid(virtualAccount.getStringSid());
                return savedCourse;
            }else
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            log.error("throwing exception while updating the course",e.toString());
            throw new ApplicationException("Something went wrong while updating the course");
        }
    }

    @Override
    public CourseTO getCourseBySid(String courseSid) {
        Course course = courseRepository.findCourseBySid(BaseEntity.hexStringToByteArray(courseSid));
        try {
            if (course != null)
                return mapper.convert(course, CourseTO.class);
            else
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            log.error("throwing exception while fetching the course details by sid",e.toString());
            throw new ApplicationException("Something went wrong while fetching the course details by sid");
        }
    }

    @Override
    public List<CourseTO> getCourses(String companySid) {
        try {
            List<Course> courses = courseRepository.findAllByCompanyAndStatusNot(getCompany(companySid), InstructorEnum.Status.DELETED);
            return courses.stream().map(course->{
                CourseTO to= mapper.convert(course, CourseTO.class);
                to.setCreatedByVASid(course.getCreatedBy()==null?null:course.getCreatedBy().getStringSid());
                to.setUpdatedByVASid(course.getUpdatedBy()==null?null:course.getUpdatedBy().getStringSid());
                to.setCompanySid(course.getCompany()==null?null:course.getCompany().getStringSid());
                return to;
            }).collect(Collectors.toList());
        }catch (Exception e) {
            log.error("throwing exception while fetching the all course details",e.toString());
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
                log.info(String.format("Course %s is deleted successfully by %s",courseSid, deletedBySid));
                return true;
            } else
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            log.error("throwing exception while deleting the Course details by sid",e.toString());
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
                courseSession.setCompany(getCompany(courseSessionTO.getCompanySid()));
                courseSession.setCreatedOn(new Date(Instant.now().toEpochMilli()));
                courseSession.setUpdatedOn(null);
                CourseSessionTO savedCourseSessionTO= mapper.convert(courseSessionRepository.save(courseSession),CourseSessionTO.class);
                savedCourseSessionTO.setCreatedByVASid(virtualAccount.getStringSid());
                return savedCourseSessionTO;
            } else
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            log.error("throwing exception while updating the Course session details",e.toString());
            throw new ApplicationException("Something went wrong while updating the Course session details");
        }
    }

    @Override
    public CourseSessionTO updateCourseSession(CourseSessionTO courseSessionTO)  {
        try {
            if(StringUtils.isNotEmpty(courseSessionTO.getSid())){
                CourseSession courseSession= courseSessionRepository.findCourseSessionBySid(
                        BaseEntity.hexStringToByteArray(courseSessionTO.getSid()));
                VirtualAccount virtualAccount= virtualAccountRepository.findVirtualAccountBySid(
                        BaseEntity.hexStringToByteArray(courseSessionTO.getUpdatedByVASid()));
                courseSession.setTopicName(courseSessionTO.getTopicName());
                courseSession.setTopicDescription(courseSessionTO.getTopicDescription());
                courseSession.setUpdatedBy(virtualAccount);
                courseSession.setUpdatedOn(new Date(Instant.now().toEpochMilli()));
                CourseSessionTO savedSession=mapper.convert(courseSessionRepository.save(courseSession),CourseSessionTO.class);
                savedSession.setUpdatedByVASid(virtualAccount.getStringSid());
                return savedSession;
            }else
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            log.error("throwing exception while updating the course Session",e.toString());
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
                return true;
            } else
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            log.error("throwing exception while deleting the Course Session details by sid",e.toString());
            throw new ApplicationException("Something went wrong while deleting the Course Session details by sid");
        }
    }

    @Override
    public List<CourseSessionTO> findCourseSessionByCourseSid(String courseSid,String companySid) {
        Course course = courseRepository.findCourseBySidAndCompanyAndStatusNot(BaseEntity.hexStringToByteArray(courseSid),getCompany(companySid), InstructorEnum.Status.DELETED);
        try {
            if (StringUtils.isNotEmpty(course.getStringSid())) {
                List<CourseSession> courseSessions = courseSessionRepository.findCourseSessionByCourseAndStatusNot(course, InstructorEnum.Status.DELETED).
                        stream().filter(c->c.getStatus()!= InstructorEnum.Status.DELETED)
                        .collect(Collectors.toList());
               return courseSessions.stream().map(courseSession -> {
                    CourseSessionTO to = mapper.convert(courseSession, CourseSessionTO.class);
                    to.setCreatedByVASid(courseSession.getCreatedBy() == null ? null : courseSession.getCreatedBy().getStringSid());
                    to.setUpdatedByVASid(courseSession.getUpdatedBy() == null ? null : courseSession.getUpdatedBy().getStringSid());
                    to.setCourseSid(courseSession.getCourse() == null ? null : courseSession.getCourse().getStringSid());
                    return to;
                }).collect(Collectors.toList());
            } else
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            log.info("throwing exception while fetching the Course session details");
            throw new ApplicationException("throwing exception while fetching the all course session details based on courseSid");
        }
    }

    @Override
    public List<CourseTO> getCoursesByName(String name,String companySid) {
        try {
            List<Course> courseList= courseRepository.findCourseByNameContainingAndCompanyAndStatusNot(name,getCompany(companySid), InstructorEnum.Status.DELETED);
            return mapper.convertList(courseList, CourseTO.class);
        }catch (Exception e) {
            log.error("throwing exception while fetching the Courses details by name",e.toString());
            throw new ApplicationException("Something went wrong while fetching the Courses details by name ");
        }
    }

    @Override
    public List<CourseSessionTO> getCourseSessionsByName(String courseSid,String name,String companySid) {
        try {
            Course course= courseRepository.findCourseBySid(BaseEntity.hexStringToByteArray(courseSid));
            List<CourseSession> courseSessionList= courseSessionRepository.
                    findCourseSessionByCourseAndTopicNameContainingAndCompanyAndStatusNot(course,name,getCompany(companySid), InstructorEnum.Status.DELETED);
            return mapper.convertList(courseSessionList, CourseSessionTO.class);
        }catch (Exception e) {
            log.error("throwing exception while fetching the list courseSession details by name",e.toString());
            throw new ApplicationException("Something went wrong while fetching the list courseSession details by name ");
        }
    }

    @Override
    public List<CourseSessionTO> findCourseSessionByCourseSidWithPagination(String courseSid,int pageNo, int pageSize,String companySid) {
        Course course = courseRepository.findCourseBySidAndCompanyAndStatusNot(BaseEntity.hexStringToByteArray(courseSid),getCompany(companySid), InstructorEnum.Status.DELETED);
        try {
            if (StringUtils.isNotEmpty(course.getStringSid())) {
                Pageable paging = PageRequest.of(pageNo, pageSize);
                Page<CourseSession> pagedResult = courseSessionRepository.findCourseSessionByCourseAndStatusNot(course,InstructorEnum.Status.DELETED,paging);
                List<CourseSession> courseSessions = pagedResult.toList();
                return courseSessions.stream().map(courseSession -> {
                    CourseSessionTO to = mapper.convert(courseSession, CourseSessionTO.class);
                    to.setCreatedByVASid(courseSession.getCreatedBy() == null ? null : courseSession.getCreatedBy().getStringSid());
                    to.setUpdatedByVASid(courseSession.getUpdatedBy() == null ? null : courseSession.getUpdatedBy().getStringSid());
                    to.setCourseSid(courseSession.getCourse() == null ? null : courseSession.getCourse().getStringSid());
                    return to;
                }).collect(Collectors.toList());
            } else
                throw new RecordNotFoundException("No record found");
        } catch (Exception e) {
            log.error("throwing exception while fetching the Course session details",e.toString());
            throw new ApplicationException("throwing exception while fetching the all course session details based on courseSid");
        }
    }

    @Override
    public List<CourseViewTO> getCoursesWithPagination(int pageNo, int pageSize, String companySid) {
        try {
            Pageable paging = PageRequest.of(pageNo, pageSize);
            Page<CourseView> pagedResult = courseViewRepository.findAllByCompanySidAndStatusNot(
                    companySid,InstructorEnum.Status.DELETED,paging);
            List<CourseView> CourseViews = pagedResult.toList();
            return CourseViews.stream().map(course->{
                CourseViewTO to= mapper.convert(course, CourseViewTO.class);
                to.setCreatedByVASid(course.getCreatedBy()==null?null:course.getCreatedBy());
                to.setUpdatedByVASid(course.getUpdatedBy()==null?null:course.getUpdatedBy());
                return to;
            }).collect(Collectors.toList());
        }catch (Exception e) {
            log.error("throwing exception while fetching the all course details",e.toString());
            throw new ApplicationException("Something went wrong while fetching the course details");
        }
    }

}
