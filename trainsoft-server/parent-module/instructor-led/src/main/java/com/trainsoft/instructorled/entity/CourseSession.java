package com.trainsoft.instructorled.entity;

import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "course_session")
@Getter @Setter @NoArgsConstructor
public class CourseSession extends BaseEntity{

    private static final long serialVersionUID = -7097426876314130179L;
    @Column(name = "topic_name")
    private String topicName;

    @Column(name = "topic_description")
    private String topicDescription;

    @Column(name="status")
    @Enumerated(EnumType.STRING)
    private InstructorEnum.Status status;

    @Column(name="created_on")
    private Date createdOn;

    @Column(name="updated_on")
    private Date updatedOn;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "id")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    private VirtualAccount createdBy;

    @ManyToOne
    @JoinColumn(name = "updated_by", referencedColumnName = "id")
    private VirtualAccount updatedBy;

    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private Company company;
}
