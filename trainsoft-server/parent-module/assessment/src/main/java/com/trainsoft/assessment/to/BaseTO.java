package com.trainsoft.assessment.to;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter @Getter
public abstract class BaseTO implements Serializable {
	private String sid;
}
