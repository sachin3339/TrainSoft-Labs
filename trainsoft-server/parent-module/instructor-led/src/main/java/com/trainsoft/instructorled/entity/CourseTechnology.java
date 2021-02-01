package com.trainsoft.instructorled.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "course_has_technology")
@Getter @Setter @NoArgsConstructor
public class CourseTechnology extends BaseEntity {
    
    @ManyToOne
    @JoinColumn(name = "technology_id", referencedColumnName = "id",nullable = false)
    private Technology technology;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "id",nullable = false)
    private Course course;
}
