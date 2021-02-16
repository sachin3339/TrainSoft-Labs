package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAppUserRepository extends JpaRepository<AppUser, Integer>{
	AppUser findAppUserBySid(byte[] sid);
}
