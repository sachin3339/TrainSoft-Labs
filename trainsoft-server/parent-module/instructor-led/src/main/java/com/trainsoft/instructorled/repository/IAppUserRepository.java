package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.AppUser;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IAppUserRepository extends JpaRepository<AppUser, Integer>{
	AppUser findAppUserBySid(byte[] sid);
	@Query(value = "SELECT va.appuser from VirtualAccount va where va.appuser.name like :str% or va.appuser.emailId like :str% or va.appuser.phoneNumber like :str% and va.company.sid=:sid and va.status<>:status")
	List<AppUser> findAppUsersByNameContainingOrEmailIdContainingOrPhoneNumberContaining(@Param("str") String str,@Param("sid")byte[] sid,InstructorEnum.Status status);
	AppUser findAppUsersByEmailIdAndPasswordAndStatus(String email, String password, InstructorEnum.Status status);
	List<AppUser> findAppUserByEmailId(String emailId);
	@Query(value = "select va.appuser from VirtualAccount va where va.company.sid=:companySid and va.status<>:status")
	List<AppUser> findAppUserByCompanySidAndStatus(@Param("companySid") byte[] companySid, @Param("status") InstructorEnum.Status status);


}
