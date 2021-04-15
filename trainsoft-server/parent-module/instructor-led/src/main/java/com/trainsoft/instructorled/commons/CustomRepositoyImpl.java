package com.trainsoft.instructorled.commons;

import com.trainsoft.instructorled.entity.VirtualAccount;
import com.trainsoft.instructorled.repository.ITrainsoftCustomRepository;
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
public class CustomRepositoyImpl implements ITrainsoftCustomRepository {

    private final Logger logger = LoggerFactory.getLogger(CustomRepositoyImpl.class);
    @PersistenceContext
    EntityManager entitymangager;

    @Override
    public Integer findIdBySid(String classz, String sid) {
        String customQuery = "SELECT a.id from "+classz+" a where hex(a.sid)='"+sid+"'";
        Query query = entitymangager.createQuery(customQuery);
        return (Integer)query.getSingleResult();
    }

    @Override
    public BigInteger noOfCountByClass(String classz,String companySid) {
        String customQuery = "SELECT count(a.id) as noOfCount from "+classz+" a where a.status <> 'DELETED' and company_sid=:companySid";
        Query query = entitymangager.createNativeQuery(customQuery);
        query.setParameter("companySid",companySid);
        return (BigInteger)query.getSingleResult();
    }

    @Override
    public List<VirtualAccount> findActiveVA() {
        String customQuery ="select  v from VirtualAccount v left join BatchParticipant bhp on v.id=bhp.virtualAccount.id \n" +
                "left join Company  c on c.id=v.company.id \n" +
                "where v.status='ENABLED' and bhp.id is null";
        Query query = entitymangager.createQuery(customQuery);
        return query.getResultList();

    }

}
