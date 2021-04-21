package com.trainsoft.assessment.entity;

import lombok.Cleanup;

import javax.persistence.*;
import java.time.Instant;
@Entity
@Table(name = "quiz_set_has_question")
public class QuizSetHasQuestion extends BaseEntity{
    private static final long serialVersionUID = -1099118610599906385L;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question questionId;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private VirtualAccount createdBy;

    @Column(name = "created_on")
    private Instant createdOn;

    @ManyToOne
    @JoinColumn(name = "updated_by")
    private VirtualAccount updatedBy;

    @Column(name = "updated_on")
    private Instant updatedOn;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company companyId;

    @Column(name = "question_number")
    private Integer questionNumber;

    @Column(name = "is_answer_randamize")
    private boolean isAnswerRandomize;

    @Column(name = "question_point")
    private Integer questionPoint;

    @ManyToOne
    @JoinColumn(name = "quiz_set_id")
    private QuizSet quizSetId;

}
