package com.trainsoft.instructorled.service.impl;

import com.trainsoft.instructorled.commons.ExcelHelper;
import com.trainsoft.instructorled.customexception.ApplicationException;
import com.trainsoft.instructorled.customexception.RecordNotFoundException;
import com.trainsoft.instructorled.dozer.DozerUtils;
import com.trainsoft.instructorled.entity.AppUser;
import com.trainsoft.instructorled.repository.IAppUserRepository;
import com.trainsoft.instructorled.service.IBulkUploadService;
import com.trainsoft.instructorled.to.AppUserTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@Service
public class BulkUploadServiceImpl implements IBulkUploadService {

    IAppUserRepository appUserRepository;
    DozerUtils mapper;

    @Override
    public void save(MultipartFile file) {
        if (ExcelHelper.hasExcelFormat(file)) {
            try {
                List<AppUser> appUserList = ExcelHelper.excelToAppUsers(file.getInputStream());
                appUserRepository.saveAll(appUserList);

            } catch (IOException e) {
                throw new ApplicationException("fail to store excel data: " + e.getMessage());
            }
        }
    }

    @Override
    public List<AppUserTO> getAllAppUsers() {
        List<AppUser> appUserList= appUserRepository.findAll();
        if (!appUserList.isEmpty())
          throw new RecordNotFoundException();
        else
           return mapper.convertList(appUserList,AppUserTO.class);
    }
}
