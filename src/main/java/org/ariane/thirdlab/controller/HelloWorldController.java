package org.ariane.thirdlab.controller;

import java.net.UnknownHostException;

import org.ariane.thirdlab.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

	@Autowired
	private PostService postService;

	@RequestMapping(value = "/helloworld")
	public String helloWorld() throws UnknownHostException {
//		postService.upgrade();

		return "d";
	}

	public static class PD {
		public String id;
		public String parant;
		public String title;
		public String post;
	}
}
