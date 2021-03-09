package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.AppUserTO;
import com.trainsoft.instructorled.to.UserTO;
import com.trainsoft.instructorled.to.VirtualAccountTO;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface IBulkUploadService {

     void save(MultipartFile file) ;
     List<AppUserTO> getAllAppUsers();
     UserTO createVirtualAccount(UserTO userTO);

}
