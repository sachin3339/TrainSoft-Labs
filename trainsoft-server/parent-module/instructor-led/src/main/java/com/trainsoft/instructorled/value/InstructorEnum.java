package com.trainsoft.instructorled.value;

public class InstructorEnum {

    public enum DepartmentRole {
        PROJECT_ADMIN,INSTRUCTOR,LEARNER;
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
        BATCH_MGMT, COURSE_MGMT, USER_MGMT, INSTRUCTOR_MGMT, TRAINING_MGMT
    }
}
