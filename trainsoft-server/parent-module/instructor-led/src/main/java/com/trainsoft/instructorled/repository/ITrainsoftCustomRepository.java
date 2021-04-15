package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.VirtualAccount;

import java.math.BigInteger;
import java.util.List;

/**
 * This interface containing the generic method .
 */
public interface ITrainsoftCustomRepository {

    Integer findIdBySid(String classz, String sid);
    BigInteger noOfCountByClass(String classz,String companySid);
    public List<VirtualAccount> findActiveVA();
}
