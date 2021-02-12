package com.trainsoft.instructorled.entity;

import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "batch")
@Getter @Setter @NoArgsConstructor
public class Batch extends BaseEntity {
	@Column(name = "name")
	private String name;

	@Column(name="status")
	@Enumerated(EnumType.STRING)
	private InstructorEnum.Status status;

	@Column(name="training_type")
	@Enumerated(EnumType.STRING)
	private InstructorEnum.TrainingType trainingType;

	@Column(name="start_date")
	private Date startDate;

	@Column(name="end_date")
	private Date endDate;

	@Column(name="created_on")
	private Date createdOn;

	@Column(name="updated_on")
	private Date updatedOn;

	@ManyToOne
	@JoinColumn(name = "created_by", referencedColumnName = "id")
	private VirtualAccount createdBy;

	@ManyToOne
	@JoinColumn(name = "updated_by", referencedColumnName = "id")
	private VirtualAccount updatedBy;
}
