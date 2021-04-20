package com.trainsoft.assessment.entity;

import com.trainsoft.assessment.enums.Difficulty;
import com.trainsoft.assessment.enums.Status;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;
@Entity
@Table(name = "quiz_set")
@Setter @Getter
public class QuizSet extends BaseEntity{
    private static final long serialVersionUID = -7425172744833280146L;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private VirtualAccount createdBy;

    @Column(name = "created_on")
    private Instant createdOn;

    @ManyToOne
    @JoinColumn(name = "updated_by")
    private  VirtualAccount updatedBy;

    @Column(name = "updated_on")
    private  Instant updatedOn;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company companyId;

    @OneToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quizId;

    @Column(name = "is_question_randomize")
    private boolean isQuestionRandomize;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "is_pause_enable")
    private boolean isPauseEnable;

    @Column(name = "is_payment_received")
    private  boolean isPaymentReceived;

    @Column(name = "price")
    private Double price;

    @Column(name = "is_negative")
    private boolean isNegative;

    @Column(name = "reduce_marks")
    private boolean reduceMarks;

    @Column(name = "is_previous_enabled")
    private boolean isPreviousEnabled;

    @Column(name = "is_multiple_attempts")
    private  boolean isMultipleAttempts;

    @Column(name = "is_auto_submitted")
    private boolean isAutoSubmitted;

    @Column(name = "is_next_enabled")
    private boolean isNextEnabled;

    @Enumerated(EnumType.STRING)
    @Column(name = "difficulty")
    private Difficulty difficulty;

    @Column(name = "is_premium")
    private  boolean isPremium;

    @Column(name = "is_mandatory")
    private boolean isMandatory;

    @Column(name = "is_multiple_sitting")
    private  boolean isMultipleSitting;

    @Column(name = "valid_upto")
    private Instant validUpTo;

    @ManyToOne
    @JoinColumn(name = "category")
    private Category category;
}
