package org.ariane.thirdlab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		// 禁用自动重启
		System.setProperty("spring.devtools.restart.enabled", "false");

		SpringApplication.run(Application.class, args);
	}

}
