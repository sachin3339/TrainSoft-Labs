package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.BatchTO;
import com.trainsoft.instructorled.to.CourseSessionTO;
import com.trainsoft.instructorled.to.CourseTO;

import java.util.List;

public interface ICourseService {
    CourseTO createCourse(CourseTO courseTO);
    CourseTO updateCourse(CourseTO courseTO);
    CourseTO getCourseBySid(String courseSid);
    List<CourseTO> getCourses(String companySid);
    boolean deleteCourseBySid(String courseSid,String deletedBySid);
    CourseSessionTO createSession(CourseSessionTO courseSessionTO);
    CourseSessionTO updateCourseSession(CourseSessionTO courseSessionTO);
    boolean deleteCourseSessionBySid(String courseSessionSid,String deletedBySid);
    List<CourseSessionTO> findCourseSessionByCourseSid(String courseSid,String companySid);
    List<CourseTO> getCoursesByName(String name,String companySid);
    List<CourseSessionTO> getCourseSessionsByName(String name,String companySid);
    List<CourseSessionTO> findCourseSessionByCourseSidWithPagination(String courseSid,int pageNo, int pageSize,String companySid);
    List<CourseTO> getCoursesWithPagination(int pageNo, int pageSize,String companySid);
}
