package com.trainsoft.assessment.service;


import com.trainsoft.assessment.to.UserTO;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

public interface IUserBulkUploadService {

    UserTO createVirtualAccountWithAssessmentUser(HttpServletRequest request, UserTO userTO, String assessmentSid);
    void uploadAssessementParticipants(MultipartFile file, HttpServletRequest request,String assessmentSid,String assessUrl);
}
