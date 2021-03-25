package com.trainsoft.instructorled.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "training_has_batch")
@Getter @Setter @NoArgsConstructor
public class TrainingBatch extends BaseEntity {
    
    @ManyToOne
    @JoinColumn(name = "batch_id", referencedColumnName = "id",nullable = false)
    private Batch batch;

    @ManyToOne
    @JoinColumn(name = "training_id", referencedColumnName = "id",nullable = false)
    private Training training;

    @Column(name="created_on")
    private Date createdOn;

}
