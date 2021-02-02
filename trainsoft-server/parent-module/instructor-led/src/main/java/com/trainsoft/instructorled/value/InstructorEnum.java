package com.trainsoft.instructorled.value;

public class InstructorEnum {

    public enum DepartmentRole {
        PROJECT_ADMIN,INSTRUCTOR,PARTICIPANT;
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
}
