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
public class AppUserTO extends BaseTO{

    private String name;
    private String emailId;
    private String phoneNumber;
    private boolean superAdmin;
    private InstructorEnum.Status status;
}
