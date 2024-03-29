package com.trainsoft.assessment.entity;

import com.trainsoft.assessment.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "company")
@Getter @Setter @NoArgsConstructor
public class Company extends BaseEntity {
	@Column(name = "name")
	private String name;

	@Column(name = "email")
	private String emailId;

	@Column(name = "phone_number")
	private String phoneNumber;

	@Column(name="status")
	@Enumerated(EnumType.STRING)
	private InstructorEnum.Status status;

	@Column(name = "domain")
	private String domain;

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
