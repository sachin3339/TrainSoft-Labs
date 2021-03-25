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
    List<CourseTO> getCoursesByName(String name);
    boolean deleteCourseBySid(String courseSid,String deletedBySid);
    List<CourseTO> getCoursesWithPagination(int pageNo, int pageSize);


    CourseSessionTO createSession(CourseSessionTO courseSessionTO);
    CourseSessionTO updateCourseSession(CourseSessionTO courseSessionTO);
    List<CourseSessionTO> findCourseSessionByCourseSid(String courseSid);
    List<CourseSessionTO> getCourseSessionsByName(String courseSid,String name);
    boolean deleteCourseSessionBySid(String courseSessionSid,String deletedBySid);
    List<CourseSessionTO> findCourseSessionByCourseSidWithPagination(String courseSid,int pageNo, int pageSize);

}
