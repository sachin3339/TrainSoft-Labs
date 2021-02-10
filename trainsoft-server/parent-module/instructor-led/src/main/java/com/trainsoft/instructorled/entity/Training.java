package com.trainsoft.instructorled.entity;

import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "training")
@Getter @Setter @NoArgsConstructor
public class Training extends BaseEntity{
    @Column(name = "name")
    private String name;

    @Column(name="start_date")
    private Date startDate;

    @Column(name="end_date")
    private Date endDate;

    @Column(name="status")
    @Enumerated(EnumType.STRING)
    private InstructorEnum.Status status;

    @Column(name="lab")
    private String lab;

    @Column(name="created_on")
    private Date createdOn;

    @Column(name="updated_on")
    private Date updatedOn;

    @Column(name = "instructor_name")
    private String instructorName;

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    private VirtualAccount createdBy;

    @ManyToOne
    @JoinColumn(name = "updated_by", referencedColumnName = "id")
    private VirtualAccount updatedBy;

    @OneToMany
    @JoinColumn(name = "batch_id", referencedColumnName = "id")
    private List<Batch> batches;

    @OneToOne
    @JoinColumn(name = "course_id", referencedColumnName = "id")
    private Course course;

    @OneToOne
    @JoinColumn(name = "appuser_id", referencedColumnName = "id")
    private AppUser appUser;

}
