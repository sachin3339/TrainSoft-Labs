package com.trainsoft.instructorled.entity;

import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "vw_batch")
@Getter
@Setter
@NoArgsConstructor
public class BatchView extends BaseEntity {

    private static final long serialVersionUID = -5890781831298179767L;
    @Column(name = "name")
    private String name;

    @Column(name = "no_of_learners")
    private int noOfLearners;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private InstructorEnum.Status status;

    @Column(name="created_on")
    private Date createdOn;

    @Column(name="updated_on")
    private Date updatedOn;

    @Column(name = "company_sid")
    private String companySid;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_by")
    private String updatedBy;

}
