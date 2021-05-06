package com.trainsoft.assessment.to;



import com.trainsoft.assessment.value.InstructorEnum;

import java.util.Date;

public class CompanyTO extends BaseTO{
    private static final long serialVersionUID = 8417806553160269661L;

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
