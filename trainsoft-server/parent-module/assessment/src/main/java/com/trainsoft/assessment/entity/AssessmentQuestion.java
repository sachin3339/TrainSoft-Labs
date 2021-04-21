package com.trainsoft.assessment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "quiz_set_has_question")
@Getter
@Setter
@NoArgsConstructor
public class AssessmentQuestion extends BaseEntity
{
    @Column(name = "status")
    private String status;

    @Column(name = "question_number")
    private int questionNumber;

    @Column(name = "is_answer_randomize")
    private boolean isAnswerRandomize;

    @Column(name = "question_point")
    private int questionPoint;

    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private Company company;

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    private VirtualAccount createdBy;

    @ManyToOne
    @JoinColumn(name = "updated_by", referencedColumnName = "id")
    private VirtualAccount updatedBy;

    @ManyToOne
    @JoinColumn(name = "question_id", referencedColumnName = "id")
    private Question questionId;

    @ManyToOne
    @JoinColumn(name = "quiz_set_id", referencedColumnName = "id")
    private Topic topicId;

    @Column(name = "created_on")
    private Date createdOn;

    @Column(name = "updated_on")
    private Date updatedOn;
}
