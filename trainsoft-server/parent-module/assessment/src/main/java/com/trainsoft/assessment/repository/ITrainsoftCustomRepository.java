package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.Assessment;
import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.entity.Question;
import com.trainsoft.assessment.entity.Topic;
import org.springframework.data.domain.Pageable;

import java.math.BigInteger;
import java.util.List;

/**
 * This interface containing the generic method .
 */
public interface ITrainsoftCustomRepository
{
    BigInteger noOfCountByClass(String classz, Company company);

    List<Question> searchQuestion(String searchString, Company company);

    List<Assessment> searchAssessment(String searchString,Company company,Topic topic);

    List<Topic> searchTopic(String searchString,Company company);
}
