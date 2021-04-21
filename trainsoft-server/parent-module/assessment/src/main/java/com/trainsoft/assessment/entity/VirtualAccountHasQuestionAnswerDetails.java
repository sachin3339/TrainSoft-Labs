package com.trainsoft.assessment.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
@Entity
@Table(name = "virtual_account_has_question_answer_details")
@Setter @Getter
public class VirtualAccountHasQuestionAnswerDetails extends BaseEntity{
    private static final long serialVersionUID = -6768532644962530863L;

    @ManyToOne
    @JoinColumn(name = "virtual_account_id")
    private VirtualAccount virtualAccountId;

    @OneToOne
    @JoinColumn(name = "question_id")
    private Question questionId;

    @Column(name = "answer")
    private String answer;

    @Column(name = "is_correct")
    private boolean isCorrect;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company companyId;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private VirtualAccount createdBy;

    @Column(name = "created_on")
    private Date  createdOn;

}
