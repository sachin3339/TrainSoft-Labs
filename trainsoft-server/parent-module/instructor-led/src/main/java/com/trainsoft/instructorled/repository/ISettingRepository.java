package com.trainsoft.instructorled.repository;
import com.trainsoft.instructorled.entity.Settings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISettingRepository extends JpaRepository<Settings, Integer>{
	Settings findSettingBySid(byte[] sid);
}
