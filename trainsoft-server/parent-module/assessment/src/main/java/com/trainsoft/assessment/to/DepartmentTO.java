package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class DepartmentTO extends BaseTO{

    private String name;
    private String description;
    private String emailId;
    private String location;
    private InstructorEnum.Status status;
    private long createdOn;
    private long updatedOn;
    private String companySid;
    private String createdByVASid;
    private String updatedByVASid;
}
