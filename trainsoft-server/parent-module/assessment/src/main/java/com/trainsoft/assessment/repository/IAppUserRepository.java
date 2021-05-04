package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAppUserRepository extends JpaRepository<AppUser, Integer>
{
	AppUser findAppUserBySid(byte[] sid);
	AppUser findAppUserById(Integer id);
}
