package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.AppUser;
import com.trainsoft.assessment.value.InstructorEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IAppUserRepository extends JpaRepository<AppUser,Integer> {
    AppUser findBySid(byte [] sid);
    AppUser findAppUserBySid(byte[] sid);

    AppUser findAppUsersByEmailIdAndPasswordAndStatus(String email, String password, InstructorEnum.Status status);
    List<AppUser> findAppUserByEmailId(String emailId);
    @Query(value = "select va.appuser from VirtualAccount va where va.company.sid=:companySid and va.status<>:status")
    List<AppUser> findAppUserByCompanySidAndStatus(@Param("companySid") byte[] companySid, @Param("status") InstructorEnum.Status status);

    AppUser findAppUsersByTpToken(String tpToken);
    AppUser findAppUserBySidAndTpToken(byte[] appUserSid, String token);
    AppUser findAppUsersByEmailId(String email);
}
