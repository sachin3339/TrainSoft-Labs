package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.Course;
import com.trainsoft.instructorled.entity.Technology;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CourseTechnologyTO extends BaseTO{

    private String technologySid;
    private String courseSid;
}
