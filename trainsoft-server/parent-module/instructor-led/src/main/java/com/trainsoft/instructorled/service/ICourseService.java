package com.trainsoft.instructorled.service;

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
    List<CourseSessionTO> findCourseSessionByCourseSid(String courseSid);
}
