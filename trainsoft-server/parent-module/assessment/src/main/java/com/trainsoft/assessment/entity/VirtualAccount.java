package com.trainsoft.assessment.entity;

import com.trainsoft.assessment.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "virtual_account")
@Getter @Setter @NoArgsConstructor
public class VirtualAccount extends BaseEntity {

	@Column(name= "roles")
	@Enumerated(EnumType.STRING)
	private InstructorEnum.VirtualAccountRole role;

	@Column(name= "designation")
	private String designation;

	@Column(name="status")
	@Enumerated(EnumType.STRING)
	private InstructorEnum.Status status;

	@ManyToOne
	@JoinColumn(name = "company_id", referencedColumnName = "id", nullable = false)
	private Company company;

	@ManyToOne
	@JoinColumn(name = "appuser_id", referencedColumnName = "id", nullable = false)
	private AppUser appuser;

	@Column(name="created_on")
	private Date createdOn;

	@Column(name= "assessment_values")
	private String categoryTopicValue;
}
