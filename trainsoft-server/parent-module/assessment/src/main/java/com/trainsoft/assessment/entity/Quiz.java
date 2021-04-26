package com.trainsoft.assessment.entity;

import com.trainsoft.assessment.enums.Status;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.websocket.server.ServerEndpoint;
import java.time.Instant;
@Entity
@Table(name = "quiz")
@Setter @Getter
public class Quiz extends BaseEntity{
    private static final long serialVersionUID = -5905462939433510470L;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @ManyToOne
    @JoinColumn(name = "created_by",referencedColumnName = "id")
    private VirtualAccount createdBy;

    @Column(name = "created_on")
    private Instant createdOn;

    @ManyToOne
    @JoinColumn(name = "updated_by",referencedColumnName = "id")
    private VirtualAccount updatedBy;

    @Column(name = "updated_on")
    private Instant updatedOn;

    @ManyToOne
    @JoinColumn(name = "company_id",referencedColumnName = "id")
    private Company companyId;

    @Column(name = "is_payment_received")
    private  boolean isPaymentReceived;

    @Column(name = "price")
    private Double price;
}
