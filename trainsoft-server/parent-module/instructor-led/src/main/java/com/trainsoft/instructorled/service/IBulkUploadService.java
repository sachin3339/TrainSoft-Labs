package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.AppUserTO;
import com.trainsoft.instructorled.to.UserTO;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface IBulkUploadService {

     List<AppUserTO> getAllAppUsers();
     UserTO createVirtualAccount(UserTO userTO);
     UserTO getVirtualAccountByVASid(String virtualAccountSid);
     List<UserTO> getVirtualAccountByCompanySid(String companySid);

     void uploadParticipants(MultipartFile file, String batchName, String instructorName,String companySid);
}
