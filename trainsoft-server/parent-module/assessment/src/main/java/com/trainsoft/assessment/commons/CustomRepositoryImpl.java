package com.trainsoft.assessment.commons;

import com.trainsoft.assessment.entity.Assessment;
import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.entity.Question;
import com.trainsoft.assessment.entity.Topic;
import com.trainsoft.assessment.repository.ITrainsoftCustomRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.List;

@Repository
@Transactional
public class CustomRepositoryImpl implements ITrainsoftCustomRepository
{
    private final Logger logger = LoggerFactory.getLogger(CustomRepositoryImpl.class);
    @PersistenceContext
    EntityManager entitymangager;

    @Override
    public BigInteger noOfCountByClass(String classz, Company company) {
        String customQuery = "SELECT count(a.id) as noOfCount from "+classz+" a where a.status <> 'DELETED' and company_id=:company_id";
        Query query = entitymangager.createNativeQuery(customQuery);
        query.setParameter("company_id",company.id);
        return (BigInteger)query.getSingleResult();
    }

    @Override
    public List<Question> searchQuestion(String searchString, Company company){
        String  customQuery = "SELECT ques FROM Question as ques WHERE ( ques.name like :str OR ques.description like :str "
                +"OR ques.technologyName like :str ) AND ques.company =:company AND ques.status<>'DELETED'";
        Query query = entitymangager.createQuery(customQuery);
        query.setParameter("str", "%"+searchString + "%");
        query.setParameter("company", company);
        return query.getResultList();
    }

    @Override
    public List<Assessment> searchAssessment(String searchString, Company company,Topic topic) {
        String customQuery="SELECT assess FROM Assessment as assess WHERE ( assess.title like :str  " +
                "OR assess.description like :str OR assess.category like :str) AND " +
                "assess.company =:company AND assess.topicId =:topic AND assess.status <> 'DELETED'";
        Query query = entitymangager.createQuery(customQuery);
        query.setParameter("str","%"+searchString+"%");
        query.setParameter("company",company);
        query.setParameter("topic",topic);
        return query.getResultList();
    }

    @Override
    public List<Topic> searchTopic(String searchString, Company company) {
        String customQuery="SELECT tp from Topic as tp where ( tp.name like :str OR tp.description like :str ) " +
                "And tp.company=:company And tp.status <>'DELETED'";
        Query query = entitymangager.createQuery(customQuery);
        query.setParameter("str","%"+searchString+"%");
        query.setParameter("company",company);
        return query.getResultList();
    }

}
