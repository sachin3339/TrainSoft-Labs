package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.AppUser;
import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class VirtualAccountTO extends BaseTO{

    private InstructorEnum.VirtualAccountRole role;
    private String designation;
    private InstructorEnum.Status status;
    private String companySid;
    private String appuserSid;
}
