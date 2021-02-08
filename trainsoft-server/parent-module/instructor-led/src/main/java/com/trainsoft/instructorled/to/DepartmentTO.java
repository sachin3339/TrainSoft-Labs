package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.entity.VirtualAccount;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class DepartmentTO extends BaseTO{

    private String name;
    private String description;
    private String emailId;
    private String location;
    private String active;
    private long createdOn;
    private long updatedOn;
    private String companySid;
    private String createdByVASid;
    private String updatedByVASid;
}
