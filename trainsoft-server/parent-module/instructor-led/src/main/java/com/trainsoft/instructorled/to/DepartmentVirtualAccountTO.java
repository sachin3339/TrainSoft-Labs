package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.Department;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class DepartmentVirtualAccountTO extends BaseTO{

    private static final long serialVersionUID = 8823309537303991629L;
    private InstructorEnum.DepartmentRole departmentRole;
    private DepartmentTO department;
    private String virtualAccountSid;
}
