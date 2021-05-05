package com.trainsoft.assessment.commons;

import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.entity.Question;
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
    public List<Question> searchQuestion(String searchString, Integer companyId){
//        String customQuery="select * from question where name like "+searchString+"%"+"or description like"+searchString+"%"
//                +"or technology_name like"+searchString+"%"+"or answer_explanation like"+searchString+"%"+
//                "and status='ENABLED' and company_id="+companyId;

        String customQuery="select * from question where name like :str or description like :str " +
                "or technology_name like :str or answer_explanation like :str and company_id=:companyId " +
                "and status='ENABLED'";

        Query query = entitymangager.createNativeQuery(customQuery);
        query.setParameter("str", "%"+searchString + "%");
        query.setParameter("companyId", companyId);
       return (List<Question>) query.getResultList();
    }

}
