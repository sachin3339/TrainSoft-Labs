package com.trainsoft.instructorled.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.instructorled.entity.BaseEntity;
import com.trainsoft.instructorled.entity.VirtualAccount;
import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter @Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class BatchViewTO extends BaseTO {
    private String name;
    private int noOfLearners;
    private InstructorEnum.Status status;
    private Date createdOn;
    private Date updatedOn;
    private String createdByVASid;
    private String updatedByVASid;

}
