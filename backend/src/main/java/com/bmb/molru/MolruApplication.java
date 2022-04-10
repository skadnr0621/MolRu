package com.bmb.molru;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MolruApplication {

	public static void main(String[] args) {
		SpringApplication.run(MolruApplication.class, args);
	}

}
