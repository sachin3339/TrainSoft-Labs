package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class DepartmentVirtualAccountTO extends BaseTO{

    private InstructorEnum.DepartmentRole departmentRole;
    private DepartmentTO department;
    private String virtualAccountSid;
}
