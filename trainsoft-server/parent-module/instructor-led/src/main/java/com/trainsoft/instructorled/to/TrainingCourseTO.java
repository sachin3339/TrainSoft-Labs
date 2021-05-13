package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.Course;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class TrainingCourseTO extends BaseTO{

    private static final long serialVersionUID = 6540801706195460194L;
    private String trainingSid;
    private String courseSid;
}
