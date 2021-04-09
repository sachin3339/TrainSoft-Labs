package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.AppUserTO;
import com.trainsoft.instructorled.to.UserTO;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.math.BigInteger;
import java.util.List;

public interface IBulkUploadService {

     List<AppUserTO> getAllAppUsers(String companySid);
     UserTO createVirtualAccount(UserTO userTO,HttpServletRequest request);
     UserTO getVirtualAccountByVASid(String virtualAccountSid);
     List<UserTO> getVirtualAccountByCompanySid(String companySid,String type,int pageNo,int record);
     void uploadParticipantsWithBatch(MultipartFile file, String batchName, String instructorName,String companySid,
                                      HttpServletRequest request,String vASid);
     void uploadParticipants(MultipartFile file,String companySid, HttpServletRequest request);
     UserTO updateUserDetails(UserTO userTO);
     int getUserCount(String companySid, String type);
}
