package com.trainsoft.instructorled.jwttoken;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.io.Serializable;

@Setter
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class JWTTokenTO implements Serializable {

    private static final long serialVersionUID = 8084246161578674999L;
    private String companySid;
    private String virtualAccountSid;
    private String userSid;
    private String departmentSid;
    private String departmentRole;
    private String companyRole;
    private String emailId;

}
