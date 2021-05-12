package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AppUserTO extends BaseTO{

    private static final long serialVersionUID = -2110408160709237919L;
    private String name;
    private String emailId;
    private String employeeId;
    private String phoneNumber;
    private boolean superAdmin;
    private InstructorEnum.Status status;
    private InstructorEnum.AccessType accessType;
    private String password;
    private String tpToken;
    private long expiryDate;
    private boolean resetPassword;
}
