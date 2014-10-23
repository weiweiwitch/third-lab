package org.ariane.thirdlab.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

	@RequestMapping(value = "/helloworld")
	public String helloWorld() {
		return "d";
	}
}
