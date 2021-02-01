package com.trainsoft.instructorled.entity;

import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "batch_has_participants")
@Getter @Setter @NoArgsConstructor
public class BatchParticipant extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "batch_id", referencedColumnName = "id",nullable = false)
    private Batch batch;

    @ManyToOne
    @JoinColumn(name = "virtual_account_id", referencedColumnName = "id",nullable = false)
    private VirtualAccount virtualAccount;
}
