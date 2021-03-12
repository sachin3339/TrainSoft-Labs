package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.value.InstructorEnum;
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

}