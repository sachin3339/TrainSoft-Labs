package com.trainsoft.instructorled.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "training_has_course")
@Getter @Setter @NoArgsConstructor
public class TrainingCourse extends BaseEntity {
    
    @ManyToOne
    @JoinColumn(name = "training_id", referencedColumnName = "id",nullable = false)
    private Training training;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "id",nullable = false)
    private Course course;
}
