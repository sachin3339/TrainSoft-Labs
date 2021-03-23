package com.trainsoft.instructorled.commons;

import com.trainsoft.instructorled.repository.ITrainsoftCustomRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.math.BigInteger;

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
    public BigInteger noOfCountByClass(String classz) {
        String customQuery = "SELECT count(a.id) as noOfCount from "+classz+" a where a.status <> 'DELETED'";
        Query query = entitymangager.createNativeQuery(customQuery);
        return (BigInteger)query.getSingleResult();
    }


}
