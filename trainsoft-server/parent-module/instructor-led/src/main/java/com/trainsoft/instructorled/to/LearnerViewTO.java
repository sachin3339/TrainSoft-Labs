package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class LearnerViewTO extends BaseTO{

    private String name;
    private String employeeId;
    private String emailId;
    private String phoneNumber;
    private String departmentName;
}
