package com.trainsoft.assessment.entity;

import com.trainsoft.assessment.value.AssessmentEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "answer")
@Getter
@Setter
@NoArgsConstructor
public class Answer extends BaseEntity{

    @Column(name = "answer_option")
    private String answerOption;

    @Column(name = "answer_option_value")
    private String answerOptionValue;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private AssessmentEnum.Status status;

    @Column(name = "created_on")
    private Date createdOn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", referencedColumnName = "id",nullable = false)
    private Question questionId;

    @Column(name = "is_correct")
    private boolean isCorrect;

    @Column(name = "answer_explanation")
    private String answerExplanation;

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    private VirtualAccount createdBy;

}
