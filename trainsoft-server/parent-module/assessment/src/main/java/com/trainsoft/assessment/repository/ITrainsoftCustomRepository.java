package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.entity.Question;

import java.math.BigInteger;
import java.util.List;

/**
 * This interface containing the generic method .
 */
public interface ITrainsoftCustomRepository
{
    BigInteger noOfCountByClass(String classz, Company company);

    List<Question> searchQuestion(String searchString, Integer companyId);
}
