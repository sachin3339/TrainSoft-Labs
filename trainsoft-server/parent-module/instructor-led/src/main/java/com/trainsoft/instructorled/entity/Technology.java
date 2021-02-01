package com.trainsoft.instructorled.entity;

import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "technology")
@Getter @Setter @NoArgsConstructor
public class Technology extends BaseEntity{
	@Column(name = "name")
	private String name;

	@Column(name = "description")
	private String description;

	@Column(name="created_on")
	private Date createdOn;

	@ManyToOne
	@JoinColumn(name = "created_by", referencedColumnName = "id")
	private VirtualAccount createdBy;
}
