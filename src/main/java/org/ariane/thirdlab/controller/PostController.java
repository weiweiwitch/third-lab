package org.ariane.thirdlab.controller;

import org.ariane.thirdlab.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostController {

	@Autowired
	private PostService postService;

	@RequestMapping(value = "/newpost")
	public String newPost() {
		postService.createNewPost();
		return "{\"rt\" : 1}";
	}

}
