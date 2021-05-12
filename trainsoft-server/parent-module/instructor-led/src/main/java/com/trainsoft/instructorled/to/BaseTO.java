package com.trainsoft.instructorled.to;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter @Getter
public abstract class BaseTO implements Serializable {
	private static final long serialVersionUID = -822390303855893415L;
	private String sid;
}
