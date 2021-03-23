package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.AppUser;
import com.trainsoft.instructorled.entity.Company;
import com.trainsoft.instructorled.entity.VirtualAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IVirtualAccountRepository extends JpaRepository<VirtualAccount, Integer>{
	VirtualAccount findVirtualAccountBySid(byte[] sid);
	List<VirtualAccount> findVirtualAccountByCompany(Company company);
	VirtualAccount findVirtualAccountByAppuser(AppUser user);
}
