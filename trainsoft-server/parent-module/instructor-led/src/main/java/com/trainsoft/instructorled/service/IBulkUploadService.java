package com.trainsoft.instructorled.service;

import com.trainsoft.instructorled.to.AppUserTO;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface IBulkUploadService {

    public void save(MultipartFile file) ;
    public List<AppUserTO> getAllAppUsers();
}
