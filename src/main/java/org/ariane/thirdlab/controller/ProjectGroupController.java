package org.ariane.thirdlab.controller;

import org.ariane.thirdlab.controller.resp.AddGroupRt;
import org.ariane.thirdlab.service.ProjectGroupService;
import org.ariane.thirdlab.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
public class ProjectGroupController {

	@Autowired
	private ProjectGroupService projectGroupService;

	@Autowired
	private TaskService taskService;

	@RequestMapping(value = "/addprojectgroup", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public AddGroupRt addGroup(String groupName) {
		AddGroupRt rt = projectGroupService.addProjectGroup(groupName);
		return rt;
	}

	@RequestMapping(value = "/chggroupname", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public int changeGroupName(long groupId, String name) {
		int rt = projectGroupService.changeGroupName(groupId, name);
		return rt;
	}

	@RequestMapping(value = "/delgroup", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public int delGroup(long groupId) {
		int rt = projectGroupService.delGroup(groupId);
		return rt;
	}

}
