package com.trainsoft.instructorled.commons;

import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.entity.Training;
import com.trainsoft.instructorled.entity.TrainingView;
import com.trainsoft.instructorled.entity.VirtualAccount;
import com.trainsoft.instructorled.repository.ITrainsoftCustomRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
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
    public BigInteger noOfCountByClass(String classz, Company company) {
        String customQuery = "SELECT count(a.id) as noOfCount from "+classz+" a where a.status <> 'DELETED' and company_id=:company_id";
        Query query = entitymangager.createNativeQuery(customQuery);
        query.setParameter("company_id",company.id);
        return (BigInteger)query.getSingleResult();
    }

    @Override
    public List<VirtualAccount> findActiveVirtualAccountWithBatch(String batchSid,String companySid) {
        String customQuery ="select v from VirtualAccount v " +
                "inner join DepartmentVirtualAccount dv " +
                "on dv.virtualAccount.id=v.id where dv.departmentRole='LEARNER' and v.company.sid=unhex(:companySid)\n" +
                "and v.id not in (select  v.id from VirtualAccount v \n" +
                "inner  join BatchParticipant  bhp on bhp.virtualAccount.id=v.id\n" +
                "inner  join Batch b on b.id=bhp.batch.id\n" +
                "inner join Company c on c.id=v.company.id\n"+
                "inner  join DepartmentVirtualAccount dv on dv.virtualAccount.id=v.id where v.status='ENABLED' and dv.departmentRole='LEARNER'\n" +
                "and b.sid=unhex(:batchSid) and c.sid=unhex(:companySid))";
        Query query = entitymangager.createQuery(customQuery);
        query.setParameter("batchSid",batchSid);
        query.setParameter("companySid",companySid);
        return query.getResultList();
    }

    @Override
   // public Page<Training> findTrainingsForLeaner(String vASid)
    public List<TrainingView> findTrainingsForLeaner(String vASid,String companySid) {
        String customQuery ="select distinct (t) from TrainingView  t \n" +
                "inner  join TrainingBatch thb on thb.training.id=t.id\n" +
                "inner  join BatchParticipant bhp on bhp.batch.id=thb.batch.id\n" +
                "inner  join VirtualAccount v on v.id=bhp.virtualAccount.id\n" +
                "inner  join DepartmentVirtualAccount dhva on dhva.virtualAccount.id=v.id\n" +
                "inner join Company c on c.id=v.company.id\n"+
                "where dhva.departmentRole='LEARNER' and v.sid=unhex(:vASid) and c.sid=unhex(:companySid)";
        Query query = entitymangager.createQuery(customQuery);
        query.setParameter("vASid",vASid);
        query.setParameter("companySid",companySid);
        return  query.getResultList();
    }
}
