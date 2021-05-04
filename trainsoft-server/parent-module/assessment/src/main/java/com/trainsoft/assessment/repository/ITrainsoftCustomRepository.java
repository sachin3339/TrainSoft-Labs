package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Company;
import java.math.BigInteger;

/**
 * This interface containing the generic method .
 */
public interface ITrainsoftCustomRepository
{
    BigInteger noOfCountByClass(String classz, Company company);
}
