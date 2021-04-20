package com.trainsoft.assessment.repository;

import com.trainsoft.assessment.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAppUserRepository extends JpaRepository<AppUser,Integer> {
    AppUser findBySid(byte [] sid);
}
