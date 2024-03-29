package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.entity.Training;
import com.trainsoft.instructorled.entity.TrainingView;
import com.trainsoft.instructorled.entity.VirtualAccount;
import org.springframework.data.domain.Page;

import java.math.BigInteger;
import java.util.List;

/**
 * This interface containing the generic method .
 */
public interface ITrainsoftCustomRepository {

    Integer findIdBySid(String classz, String sid);
    BigInteger noOfCountByClass(String classz, String companySid);
    List<VirtualAccount> findActiveVirtualAccountWithBatch(String batchSid,String companySid);
   // Page<Training> findTrainingsForLeaner(String vASid);
    List<TrainingView> findTrainingsForLeaner(String vASid,String companySid);
}
