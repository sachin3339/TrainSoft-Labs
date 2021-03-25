package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.AppUser;
import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.entity.VirtualAccount;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IVirtualAccountRepository extends JpaRepository<VirtualAccount, Integer>{
	VirtualAccount findVirtualAccountBySid(byte[] sid);
	Page<VirtualAccount> findVirtualAccountByCompanyAndStatusNot(Company company, InstructorEnum.Status status, Pageable paging);
	List<VirtualAccount> findVirtualAccountByCompanyAndStatusNot(Company company, InstructorEnum.Status status);
	VirtualAccount findVirtualAccountByAppuser(AppUser user);
	@Query(value = "select va from VirtualAccount va where va.appuser.emailId=:email")
	List<VirtualAccount> findVirtualAccountByEmailId(@Param("email")String email);
	@Query(value = "SELECT va from VirtualAccount va where va.appuser.name like :str% or va.appuser.emailId like :str% or va.appuser.phoneNumber like :str% and va.company.sid=:sid and va.status<>:status")
	List<VirtualAccount> findVirtualAccountByNameContainingOrEmailIdContainingOrPhoneNumberContaining(@Param("str") String str,@Param("sid")byte[] sid,InstructorEnum.Status status);

}
