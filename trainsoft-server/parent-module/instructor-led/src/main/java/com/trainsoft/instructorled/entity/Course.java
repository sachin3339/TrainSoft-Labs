package com.trainsoft.instructorled.entity;

import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "course")
@Getter @Setter @NoArgsConstructor
public class Course extends BaseEntity{
	@Column(name = "name")
	private String name;

	@Column(name="start_date")
	private Date startDate;

	@Column(name="end_date")
	private Date endDate;

	@Column(name="status")
	@Enumerated(EnumType.STRING)
	private InstructorEnum.Status status;

	@Column(name="is_lab")
	private boolean lab;

	@Column(name="created_on")
	private Date createdOn;

	@ManyToOne
	@JoinColumn(name = "created_by", referencedColumnName = "id")
	private VirtualAccount createdBy;
}
