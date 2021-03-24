package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.AppUser;
import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.entity.VirtualAccount;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IVirtualAccountRepository extends JpaRepository<VirtualAccount, Integer>{
	VirtualAccount findVirtualAccountBySid(byte[] sid);
	List<VirtualAccount> findVirtualAccountByCompanyAndStatusNot(Company company, InstructorEnum.Status status);
	VirtualAccount findVirtualAccountByAppuser(AppUser user);
}
