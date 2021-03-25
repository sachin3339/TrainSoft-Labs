package com.trainsoft.instructorled.controller;

import com.trainsoft.instructorled.commons.JWTDecode;
import com.trainsoft.instructorled.commons.JWTTokenTO;
import com.trainsoft.instructorled.service.ICourseService;
import com.trainsoft.instructorled.to.CourseSessionTO;
import com.trainsoft.instructorled.to.CourseTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@AllArgsConstructor
@RestController
@Api(value = "Course and Course Session related API's")
@RequestMapping("/v1")
public class CourseController {

    ICourseService courseService;

    @PostMapping("course/create")
    @ApiOperation(value = "createCourse", notes = "API to create new Course.")
    public ResponseEntity<?> createCourse(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create Course payload", required = true) @RequestBody CourseTO courseTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        courseTO.setCreatedByVASid(jwt.getVirtualAccountSid());
        courseTO.setCompanySid(jwt.getCompanySid());
        CourseTO createCourse = courseService.createCourse(courseTO);
        return ResponseEntity.ok(createCourse);
    }

    @GetMapping("/course/{courseSid}")
    @ApiOperation(value = "getCourseBySid", notes = "Get Course by Sid")
    public ResponseEntity<?> getCourseBySid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Course Sid", required = true) @PathVariable("courseSid") String courseSid) {
        return ResponseEntity.ok(courseService.getCourseBySid(courseSid));
    }

    @GetMapping("/courses")
    @ApiOperation(value = "getCourses", notes = "Get list of Course")
    public ResponseEntity<?> getCourses(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(courseService.getCourses(jwt.getCompanySid()));
    }

    @PostMapping("/create/coursesession")
    @ApiOperation(value = "createCourSession", notes = "API to add new session in course.")
    public ResponseEntity<?> createCourSession(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Create Course Session payload", required = true) @RequestBody CourseSessionTO courseSessionTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        courseSessionTO.setCreatedByVASid(jwt.getVirtualAccountSid());
        courseSessionTO.setCompanySid(jwt.getCompanySid());
        CourseSessionTO createSession = courseService.createSession(courseSessionTO);
        return ResponseEntity.ok(createSession);
    }

    @GetMapping("/coursesession/course/{courseSid}")
    @ApiOperation(value = "getCourseSessionByCourseSid ", notes = "Get list of Course session")
    public ResponseEntity<?> getCourseSessionByCourseSid(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Course Sid", required = true) @PathVariable("courseSid") String courseSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(courseService.findCourseSessionByCourseSid(courseSid,jwt.getCompanySid()));
    }

    @GetMapping("courses/{name}")
    @ApiOperation(value = "getCoursesByName", notes = "Get list of course by course name")
    public ResponseEntity<?> getCoursesByName(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Course name", required = true) @PathVariable("name") String name) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(courseService.getCoursesByName(name,jwt.getCompanySid()));
    }

    @PutMapping("update/course")
    @ApiOperation(value = "updateCourse", notes = "API to update existing course.")
    public ResponseEntity<?> updateCourse(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Update Course payload", required = true) @RequestBody CourseTO courseTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        courseTO.setUpdatedByVASid(jwt.getVirtualAccountSid());
        CourseTO updateCourse = courseService.updateCourse(courseTO);
        return ResponseEntity.ok(updateCourse);
    }

    @DeleteMapping("delete/course/{courseSid}")
    @ApiOperation(value = "deleteCourse", notes = "API to delete course")
    public ResponseEntity<?> deleteCourse(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Course sid", required = true) @PathVariable("courseSid") String courseSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(courseService.deleteCourseBySid(courseSid, jwt.getVirtualAccountSid()));
    }

    @GetMapping("coursesessions/course/{courseSid}/{name}")
    @ApiOperation(value = "getCourseSessionsByName", notes = "Get list of course session by session name")
    public ResponseEntity<?> getCourseSessionsByName(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Course  sid", required = true) @PathVariable("courseSid") String courseSid,
            @ApiParam(value = "Course session name", required = true) @PathVariable("name") String name) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(courseService.getCourseSessionsByName(courseSid,name,jwt.getCompanySid()));

    }

    @PutMapping("update/coursesession")
    @ApiOperation(value = "updateCourseSession", notes = "API to update existing course session.")
    public ResponseEntity<?> updateCourseSession(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Update Course session payload", required = true) @RequestBody CourseSessionTO courseSessionTO) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        courseSessionTO.setUpdatedByVASid(jwt.getVirtualAccountSid());
        CourseSessionTO updateCourseSession = courseService.updateCourseSession(courseSessionTO);
        return ResponseEntity.ok(updateCourseSession);
    }

    @DeleteMapping("delete/coursesession/{coursesessionSid}")
    @ApiOperation(value = "deleteCourseSession", notes = "API to delete course")
    public ResponseEntity<?> deleteCourseSession(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Course session sid", required = true) @PathVariable("coursesessionSid") String coursesessionSid) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(courseService.deleteCourseSessionBySid(coursesessionSid, jwt.getVirtualAccountSid()));
    }

    @GetMapping("/coursesession/course/{courseSid}/{pageNo}/{pageSize}")
    @ApiOperation(value = "getCourseSessionWithPagination", notes = "Get list of Course Session")
    public ResponseEntity<?> getCourseSessionWithPagination(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "Course session sid", required = true) @PathVariable("courseSid") String courseSid,
            @ApiParam(value = "pageNo", required = true) @PathVariable("pageNo") int pageNo,
            @ApiParam(value = "pageSize", required = true) @PathVariable("pageSize") int pageSize) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(courseService.findCourseSessionByCourseSidWithPagination(courseSid,pageNo-1,pageSize,jwt.getCompanySid()));
    }

    @GetMapping("/course/{pageNo}/{pageSize}")
    @ApiOperation(value = "getCourseWithPagination", notes = "Get list of Course")
    public ResponseEntity<?> getCourseWithPagination(
            @ApiParam(value = "Authorization token", required = true) @RequestHeader(value = "Authorization") String token,
            @ApiParam(value = "pageNo", required = true) @PathVariable("pageNo") int pageNo,
            @ApiParam(value = "pageSize", required = true) @PathVariable("pageSize") int pageSize) {
        JWTTokenTO jwt = JWTDecode.parseJWT(token);
        return ResponseEntity.ok(courseService.getCoursesWithPagination(pageNo-1,pageSize,jwt.getCompanySid()));
    }
}
