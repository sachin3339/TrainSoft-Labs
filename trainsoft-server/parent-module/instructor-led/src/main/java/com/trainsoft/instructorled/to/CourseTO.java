package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.Training;
import com.trainsoft.instructorled.entity.VirtualAccount;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CourseTO extends BaseTO{

    private static final long serialVersionUID = -1606626022778856355L;
    private String name;
    private String description;
    private InstructorEnum.Status status;
    private long createdOn;
    private String createdByVASid;
    private long updatedOn;
    private String updatedByVASid;
    private String companySid;
}
