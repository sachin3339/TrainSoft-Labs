package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.DepartmentVirtualAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDepartmentVirtualAccountRepository extends JpaRepository<DepartmentVirtualAccount, Integer>{
	DepartmentVirtualAccount findDepartmentVirtualAccountBySid(byte[] sid);
}
