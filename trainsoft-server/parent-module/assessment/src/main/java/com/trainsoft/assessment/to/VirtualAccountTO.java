package com.trainsoft.assessment.to;

import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Setter @Getter
public class VirtualAccountTO extends BaseTO{
    private static final long serialVersionUID = 7597388045603877311L;

    private InstructorEnum.VirtualAccountRole role;

    private String designation;

    private InstructorEnum.Status status;

    private Company company;

    private AppUserTO appuser;

    private Date createdOn;
    private String categoryTopicValue;
}
