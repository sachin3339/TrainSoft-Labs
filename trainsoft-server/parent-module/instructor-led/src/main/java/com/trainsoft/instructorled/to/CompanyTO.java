package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CompanyTO extends BaseTO{

    private String name;
    private String emailId;
    private String phoneNumber;
    private long createdOn;
    private long updatedOn;
    private String createdByVASid;
    private String updatedByVASid;
}
