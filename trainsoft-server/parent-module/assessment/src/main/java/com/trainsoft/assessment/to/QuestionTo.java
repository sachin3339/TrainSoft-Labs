package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.value.AssessmentEnum;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class QuestionTo  extends BaseTO
{
   private String name;
   private String description;
   private long createdOn;
   private String createdByVirtualAccountSid;
   private String technologyName;
   private int questionPoint;
   private AssessmentEnum.Status status;
   private AssessmentEnum.QuestionType questionType;
   private String CompanySid;
}