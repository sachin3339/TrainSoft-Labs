package com.trainsoft.assessment.commons;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class JWTTokenTO implements Serializable {

    private static final long serialVersionUID = 8084246161578674999L;
    private String companySid;
    private String virtualAccountSid;
    private String virtualAccountRole;
    private String emailId;
    private String userSid;
}
