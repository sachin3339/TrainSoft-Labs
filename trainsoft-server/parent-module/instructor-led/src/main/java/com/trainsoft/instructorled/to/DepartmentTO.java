package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.Company;
import lombok.Getter;
import lombok.Setter;

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
