package com.trainsoft.instructorled.to;


import com.trainsoft.instructorled.value.InstructorEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ParticipantsTO extends BaseTO{

    private String name;
    private String emailId;
    private String phoneNumber;
    private boolean superAdmin;
    private InstructorEnum.Status status;
    private String employeeId;
    private InstructorEnum.AccessType accessType;
}
