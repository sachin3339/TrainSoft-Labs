package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.VirtualAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VirtualAccountRepository extends JpaRepository<VirtualAccount, Integer>{
	VirtualAccount findVirtualAccountBySid(byte[] sid);
}
