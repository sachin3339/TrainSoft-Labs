package com.trainsoft.assessment.entity;

import com.trainsoft.assessment.value.AssessmentEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "question")
@Getter
@Setter
@NoArgsConstructor
public class Question extends BaseEntity{

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "created_on")
    private Date createdOn;

    @Column(name = "technology_name")
    private String technologyName;

    @Column(name = "question_point")
    private Integer questionPoint;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private AssessmentEnum.Status status;

    @Column(name = "question_type")
    @Enumerated(EnumType.STRING)
    private AssessmentEnum.QuestionType questionType;

    @Column(name = "difficulty")
    @Enumerated(EnumType.STRING)
    private AssessmentEnum.QuestionDifficulty difficulty;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "questionId")
    private List<Answer> answers = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    private VirtualAccount createdBy;

    @ManyToOne
    @JoinColumn(name = "company_id", referencedColumnName = "id")
    private Company company;

    @Column(name = "answer_explanation")
    private String answerExplanation;

    @Column(name = "negative_point")
    private Integer negativeQuestionPoint;

    @Column(name = "is_alphabet")
    private boolean isAlphabet;

}
