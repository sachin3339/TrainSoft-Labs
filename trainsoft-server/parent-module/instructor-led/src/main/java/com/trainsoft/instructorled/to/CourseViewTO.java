package com.trainsoft.instructorled.to;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CourseViewTO extends BaseTO{

    private String name;
    private int noOfTrainings;
    private InstructorEnum.Status status;
    private long createdOn;
    private long updatedOn;
    private String createdByVASid;
    private String updatedByVASid;
    private String companySid;
}
