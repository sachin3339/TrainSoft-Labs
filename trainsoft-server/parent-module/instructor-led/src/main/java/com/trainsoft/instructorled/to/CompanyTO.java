package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.VirtualAccount;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CompanyTO extends BaseTO{

    private String name;
    private String emailId;
    private String phoneNumber;
    private InstructorEnum.Status status;
    private String domain;
    private long createdOn;
    private long updatedOn;
    private String createdByVASid;
    private String updatedByVASid;
    private AppUserTO appuser;
    private DepartmentVirtualAccountTO departmentVA;
    private VirtualAccountTO virtualAccount;
}
