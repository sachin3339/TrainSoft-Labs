package com.trainsoft.assessment.entity;

import com.trainsoft.assessment.value.AssessmentEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "quiz_set")
@Getter
@Setter
@NoArgsConstructor
public class Assessment extends BaseEntity{


    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private AssessmentEnum.Status status;

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    private VirtualAccount createdBy;

    @Column(name="created_on")
    private Date createdOn;

    @ManyToOne
    @JoinColumn(name = "updated_by", referencedColumnName = "id")
    private VirtualAccount updatedBy;

    @Column(name="updated_on")
    private Date updatedOn;

    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private Company company;

    @Column(name ="is_question_randomize")
    private boolean isQuestionRandomize;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "is_pause_enable")
    private boolean isPauseEnable;

    @Column(name="is_payment_received")
    private boolean isPaymentReceived;

    @Column(name="price")
    private double price;

    @Column(name = "is_negative")
    private boolean isNegative;

    @Column(name = "reduce_marks")
    private boolean reduceMarks;

    @Column(name ="is_previous_enabled")
    private boolean isPreviousEnabled;

    @Column(name ="is_multiple_attempts")
    private boolean isMultipleAttempts;

    @Column(name ="is_auto_submitted")
    private boolean isAutoSubmitted;

    @Column(name ="is_next_enabled")
    private boolean isNextEnabled;

    @Column(name = "difficulty")
    @Enumerated(EnumType.STRING)
    private AssessmentEnum.QuizSetDifficulty difficulty;

    @Column(name = "is_premium")
    private boolean isPremium;

    @Column(name = "is_mandatory")
    private boolean isMandatory;

    @Column(name = "is_multiple_sitting")
    private boolean isMultipleSitting;

    @Column(name = "valid_upto")
    private Date validUpto;

    @Column(name = "category")
    private String category;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "quiz_id", referencedColumnName = "id")
    private Topic topicId;

    @Column(name = "url")
    private String url;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "tag", referencedColumnName = "id")
    private Tag tagId;


}
