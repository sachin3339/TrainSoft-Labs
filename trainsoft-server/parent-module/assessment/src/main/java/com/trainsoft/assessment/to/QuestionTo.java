package com.trainsoft.assessment.to;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trainsoft.assessment.value.AssessmentEnum;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class QuestionTo  extends BaseTO
{
   private String name;
   private String description;
   private String createdByVirtualAccountSid;
   private String technologyName;
   private int questionPoint;
   private AssessmentEnum.Status status;
   private AssessmentEnum.QuestionType questionType;
   private String CompanySid;
   private AssessmentEnum.QuestionDifficulty difficulty;
   private List<AnswerTo> answer;
   private String answerExplanation;
   private int negativeQuestionPoint;
}