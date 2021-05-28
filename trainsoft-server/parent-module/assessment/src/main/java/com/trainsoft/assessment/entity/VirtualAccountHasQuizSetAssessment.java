package com.trainsoft.assessment.entity;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.Date;
@Entity
@Table(name = "virtual_account_has_quiz_set_assesment")
@Setter @Getter
public class VirtualAccountHasQuizSetAssessment extends BaseEntity{
    private static final long serialVersionUID = -3321681434011735096L;

    @ManyToOne
    @JoinColumn(name = "quiz_id",referencedColumnName = "id",nullable = false)
    private Topic quizId;

    @ManyToOne
    @JoinColumn(name = "quiz_set_id",referencedColumnName = "id",nullable = false)
    private Assessment quizSetId;

    @Column(name = "total_marks")
    private Integer totalMarks;

    @Column(name = "gain_marks")
    private Integer gainMarks;

    @Column(name = "total_no_of_questions")
    private Integer totalNumberOfQuestions;

    @Column(name = "total_no_of_correct_answer")
    private Integer totalNumberOfCorrectAnswer;

    @Column(name = "total_no_of_wrong_answer")
    private Integer totalNumberOfWrongAnswer;

    @Column(name = "no_of_attempted_question")
    private Integer numberOfAttemptedQuestion;

    @Column(name = "percentage")
    private Double percentage;

    @Column(name = "submitted_on")
    private Date submittedOn;

    @ManyToOne
    @JoinColumn(name = "company_id",referencedColumnName = "id",nullable = false)
    private Company companyId;

    @OneToOne
    @JoinColumn(name = "created_by",referencedColumnName = "id",nullable = false)
    private VirtualAccount createdBy;

    @Column(name = "created_on")
    private Date createdOn;

    @ManyToOne
    @JoinColumn(name = "updated_by",referencedColumnName = "id")
    private VirtualAccount updatedBy;

    @Column(name = "updated_on")
    private Date updatedOn;

    @ManyToOne
    @JoinColumn(name = "virtual_account_id")
    private VirtualAccount virtualAccountId;

    @ManyToOne
    @JoinColumn(name = "category_id",referencedColumnName = "id")
    private Category categoryId;

    @Column(name = "assessment_question_answer_details")
    private String assessmentQuestionAnswerDtls;
}
