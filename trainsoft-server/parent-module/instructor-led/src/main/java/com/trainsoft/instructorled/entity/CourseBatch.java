package com.trainsoft.instructorled.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "course_has_batch")
@Getter @Setter @NoArgsConstructor
public class CourseBatch extends BaseEntity {
    
    @ManyToOne
    @JoinColumn(name = "batch_id", referencedColumnName = "id",nullable = false)
    private Batch batch;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "id",nullable = false)
    private Course course;

    @Column(name="created_on")
    private Date createdOn;
}
