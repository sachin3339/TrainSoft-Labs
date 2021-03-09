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
@Table(name = "course")
@Getter @Setter @NoArgsConstructor
public class Course extends BaseEntity {
    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name="status")
    @Enumerated(EnumType.STRING)
    private InstructorEnum.Status status;

    @Column(name="created_on")
    private Date createdOn;

    @Column(name="updated_on")
    private Date updatedOn;

/*    @OneToOne(mappedBy = "course")
    private TrainingSession trainingSession;*/

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<TrainingCourse> trainingCourses = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    private VirtualAccount createdBy;

    @ManyToOne
    @JoinColumn(name = "updated_by", referencedColumnName = "id")
    private VirtualAccount updatedBy;
}
