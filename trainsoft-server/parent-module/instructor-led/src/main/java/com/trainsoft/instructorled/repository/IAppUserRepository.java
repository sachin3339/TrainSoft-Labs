package com.trainsoft.instructorled.repository;

import com.trainsoft.instructorled.entity.AppUser;
import com.trainsoft.instructorled.value.InstructorEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IAppUserRepository extends JpaRepository<AppUser, Integer>{
	AppUser findAppUserBySid(byte[] sid);
	@Query(value = "SELECT * from appusers where name like :str% or email like :str% or phone_number like :str% ",nativeQuery = true)
	List<AppUser> findAppUsersByNameContainingOrEmailIdContainingOrPhoneNumberContaining(String str);
	AppUser findAppUsersByEmailIdAndPasswordAndStatus(String email, String password, InstructorEnum.Status status);

}
