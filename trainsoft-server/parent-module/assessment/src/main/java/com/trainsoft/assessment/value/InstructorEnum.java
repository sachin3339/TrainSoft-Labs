package com.trainsoft.assessment.value;

public class InstructorEnum {

    public enum DepartmentRole {
        INSTRUCTOR,LEARNER,SUPERVISOR;
    }

    public enum VirtualAccountRole {
        ADMIN,USER;
    }

    public enum Status {
        ENABLED, DISABLED, DELETED;
    }

    public enum TrainingType {
        INSTRUCTOR_LED,SELF_PACED,LAB_ONLY;
    }
    public enum AccessType {
        ALL,BATCH_MGMT, COURSE_MGMT, USER_MGMT, INSTRUCTOR_MGMT, TRAINING_MGMT
    }
}
