package com.trainsoft.instructorled.entity;

import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "department")
@Getter @Setter @NoArgsConstructor
public class Department extends BaseEntity {
	@Column(name = "name")
	private String name;

	@Column(name = "description")
	private String description;

	@Column(name = "email")
	private String emailId;

	@Column(name = "location")
	private String location;

	@Column(name="status")
	@Enumerated(EnumType.STRING)
	private InstructorEnum.Status status;

	@Column(name="created_on")
	private Date createdOn;

	@Column(name="updated_on")
	private Date updatedOn;

	@ManyToOne
	@JoinColumn(name = "company_id", referencedColumnName = "id", nullable = false)
	private Company company;

	@ManyToOne
	@JoinColumn(name = "created_by", referencedColumnName = "id")
	private VirtualAccount createdBy;

	@ManyToOne
	@JoinColumn(name = "updated_by", referencedColumnName = "id")
	private VirtualAccount updatedBy;
}
