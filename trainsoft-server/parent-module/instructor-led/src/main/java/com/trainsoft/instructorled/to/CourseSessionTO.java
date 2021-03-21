package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CourseSessionTO extends BaseTO{
    private String topicName;
    private String topicDescription;
    private InstructorEnum.Status status;
    private long createdOn;
    private String createdByVASid;
    private long updatedOn;
    private String updatedByVASid;
    private String courseSid;
}
