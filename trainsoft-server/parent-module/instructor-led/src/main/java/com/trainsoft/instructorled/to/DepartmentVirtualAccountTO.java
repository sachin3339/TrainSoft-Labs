package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.Department;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class DepartmentVirtualAccountTO extends BaseTO{

    private InstructorEnum.DepartmentRole departmentRole;
    private String departmentSid;
    private String virtualAccountSid;
}
