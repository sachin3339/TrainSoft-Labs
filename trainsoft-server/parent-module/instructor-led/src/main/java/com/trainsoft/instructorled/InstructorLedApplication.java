package com.trainsoft.instructorled;

import com.trainsoft.instructorled.commons.JWTTokenGen;
import com.trainsoft.instructorled.commons.JWTTokenTO;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InstructorLedApplication implements CommandLineRunner {
	public static void main(String[] args) {
		SpringApplication.run(InstructorLedApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		JWTTokenTO tokenTO = new JWTTokenTO();
		tokenTO.setCompanyRole("USER");
		tokenTO.setCompanySid("5D66EAB00B4446C9A7ADB898C43C2C119456C5E6CA4D4499AE237822E3A41CB7");
		tokenTO.setDepartmentSid("C23FC402F27A4A689092F1F4CA4417C7277483AF6EC746C9ACE51FA8196C205D");
		tokenTO.setUserSid("103D08EB692A4D898D54E06C4575A095C51BAAA0662A487CAB56E3F1CE97FE84");
		tokenTO.setDepartmentRole("INSTRUCTOR");
		tokenTO.setEmailId("kumarkanhiya21@gmail.com");
		tokenTO.setVirtualAccountSid("083DC9411AD54B89AA94C4A0A7A8743F383CDDBA2ACC4A17A84B2BD011F5012B");
		String abc = JWTTokenGen.generateGWTToken(tokenTO);
		System.out.println(abc);
	}
}
