package org.ariane.thirdlab.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;

@Controller
public class MainIndexController {

	@RequestMapping(value = "/p/", produces = "text/html; charset=utf-8")
	public String index(HttpServletResponse response) {
		response.setContentType("text/html;charset=UTF-8");
		return "index.html";
	}
}
