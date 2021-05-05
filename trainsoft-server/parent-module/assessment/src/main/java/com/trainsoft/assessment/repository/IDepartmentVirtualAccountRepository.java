package com.trainsoft.assessment.repository;


import com.trainsoft.assessment.entity.DepartmentVirtualAccount;
import com.trainsoft.assessment.entity.VirtualAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDepartmentVirtualAccountRepository extends JpaRepository<DepartmentVirtualAccount, Integer>{
	DepartmentVirtualAccount findDepartmentVirtualAccountBySid(byte[] sid);
	DepartmentVirtualAccount findDepartmentVirtualAccountByVirtualAccount(VirtualAccount virtualAccount);
}
