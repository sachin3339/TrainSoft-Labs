package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserTO extends BaseTO{

    private InstructorEnum.VirtualAccountRole role;
    private  String companySid;
    private String designation;
    private InstructorEnum.Status status;
    private AppUserTO appuser;
    private  DepartmentVirtualAccountTO departmentVA;
    private  String jwtToken;
    private String categoryTopicValue;
}
