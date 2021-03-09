package com.trainsoft.instructorled.entity;

import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "vw_training")
@Getter
@Setter
@NoArgsConstructor
public class TrainingView extends BaseEntity {
    @Column(name = "name")
    private String name;

    @Column(name = "no_of_batches")
    private int noOfBatches;

    @Column(name = "course_name")
    private String course;

    @Column(name = "instructor_name")
    private String instructor;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private InstructorEnum.Status status;

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    private VirtualAccount createdBy;

    @ManyToOne
    @JoinColumn(name = "updated_by", referencedColumnName = "id")
    private VirtualAccount updatedBy;

}
