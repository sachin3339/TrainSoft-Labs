package com.trainsoft.instructorled.repository;

import java.math.BigInteger;

/**
 * This interface containing the generic method .
 */
public interface ITrainsoftCustomRepository {

    Integer findIdBySid(String classz, String sid);
    BigInteger noOfCountByClass(String classz,String companySid);
}
