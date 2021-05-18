package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.AppUser;
import com.trainsoft.assessment.entity.Company;
import com.trainsoft.assessment.entity.VirtualAccount;
import com.trainsoft.assessment.value.InstructorEnum;
import io.swagger.models.auth.In;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IVirtualAccountRepository extends JpaRepository<VirtualAccount, Integer>{
	@Query("select va FROM VirtualAccount va WHERE va.status='ENABLED' AND va.sid=:sid")
	VirtualAccount findVirtualAccountBySid(byte[] sid);
	Page<VirtualAccount> findVirtualAccountByCompanyAndStatusNotOrderByCreatedOnDesc(Company company, InstructorEnum.Status status, Pageable paging);
	List<VirtualAccount> findVirtualAccountByCompanyAndStatusNot(Company company, InstructorEnum.Status status);
	VirtualAccount findVirtualAccountByAppuser(AppUser user);
	@Query(value = "select va from VirtualAccount va where va.appuser.emailId=:email")
	List<VirtualAccount> findVirtualAccountByEmailId(@Param("email")String email);
	@Query(value = "SELECT va from VirtualAccount va where va.appuser.name like :str% or va.appuser.emailId like :str% or va.appuser.phoneNumber like :str% and va.company.sid=:sid and va.status<>:status")
	List<VirtualAccount> findVirtualAccountByNameContainingOrEmailIdContainingOrPhoneNumberContaining(@Param("str") String str,@Param("sid")byte[] sid,InstructorEnum.Status status);
	VirtualAccount findVirtualAccountBySidAndCompanyAndStatusNot(byte[] sid, Company company, InstructorEnum.Status status);
	List<VirtualAccount> findVirtualAccountByCompanyAndStatus(Company company, InstructorEnum.Status status);

	VirtualAccount findVirtualAccountById(Integer id);
}
