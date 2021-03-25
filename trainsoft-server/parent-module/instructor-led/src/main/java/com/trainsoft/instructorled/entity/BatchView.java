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

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    private VirtualAccount createdBy;

    @ManyToOne
    @JoinColumn(name = "updated_by", referencedColumnName = "id")
    private VirtualAccount updatedBy;

}
