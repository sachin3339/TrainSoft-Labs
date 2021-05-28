package com.trainsoft.assessment.entity;

import com.trainsoft.assessment.value.InstructorEnum;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
@Entity
@Table(name = "virtual_account_has_quiz_set_session_timing")
@Setter @Getter
public class VirtualAccountHasQuizSetSessionTiming extends BaseEntity{
    private static final long serialVersionUID = -9032138339953451027L;
    @OneToOne
    @JoinColumn(name = "virtual_account_id",referencedColumnName = "id")
    private VirtualAccount virtualAccountId;

    @OneToOne
    @JoinColumn(name = "quiz_set_id",referencedColumnName = "id",nullable = false)
    private Assessment quizSetId;

    @OneToOne
    @JoinColumn(name = "quiz_id",nullable = false)
    private Topic quizId;

    @Column(name = "start_time",nullable = false)
    private Date startTime;

    @Column(name = "end_time")
    private Date endTime;

    @OneToOne
    @JoinColumn(name = "company_id",referencedColumnName = "id",nullable = false)
    private Company companyId;

    @Column(name="status")
    @Enumerated(EnumType.STRING)
    private InstructorEnum.Status status;
}
