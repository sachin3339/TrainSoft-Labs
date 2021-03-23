package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.BatchTO;
import com.trainsoft.instructorled.to.CourseSessionTO;
import com.trainsoft.instructorled.to.CourseTO;

import java.util.List;

public interface ICourseService {
    CourseTO createCourse(CourseTO courseTO);
    CourseTO updateCourse(CourseTO courseTO);
    CourseTO getCourseBySid(String courseSid);
    List<CourseTO> getCourses();
    boolean deleteCourseBySid(String courseSid,String deletedBySid);
    CourseSessionTO createSession(CourseSessionTO courseSessionTO);
    CourseSessionTO updateCourseSession(CourseSessionTO courseSessionTO);
    boolean deleteCourseSessionBySid(String courseSessionSid,String deletedBySid);
    List<CourseSessionTO> findCourseSessionByCourseSid(String courseSid);
    List<CourseTO> getCoursesByName(String name);
    List<CourseSessionTO> getCourseSessionsByName(String name);
    List<CourseSessionTO> findCourseSessionByCourseSidWithPagination(String courseSid,int pageNo, int pageSize);
    List<CourseTO> getCoursesWithPagination(int pageNo, int pageSize);
}
