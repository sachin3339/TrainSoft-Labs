package com.trainsoft.assessment.value;

public class AssessmentEnum
{
    public enum Status {
        ENABLED, DISABLED, DELETED,APPROVAL_RECEIVED;
    }

    public enum QuestionType {
        MCQ,SINGLE_VALUE,DESCRIPTIVE,FILL_IN_THE_BLANKS;
    }

    public enum QuestionDifficulty {
        BEGINNER,INTERMEDIATE,EXPERT;
    }

    public enum QuizSetDifficulty {
        BEGINNER,INTERMEDIATE,EXPERT;
    }

    public enum AnswerOperationType {
        CREATE,UPDATE,DELETE,NONE;
    }

}
