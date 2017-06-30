package org.ariane.thirdlab.controller;

import org.ariane.thirdlab.constvalue.TlResultCode;
import org.ariane.thirdlab.controller.req.ProjectReq;
import org.ariane.thirdlab.controller.resp.AddProjectResp;
import org.ariane.thirdlab.resp.LabResp;
import org.ariane.thirdlab.service.ProjectService;
import org.ariane.thirdlab.service.TaskService;
import org.ariane.thirdlab.service.data.ProjectsData;
import org.ariane.thirdlab.service.impl.TaskServiceImpl.AddGroupRt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api")
public class ProjectGroupController {

	@Autowired
	private TaskService taskService;

	@RequestMapping(value = "/addprojectgroup", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public AddGroupRt addGroup(String groupName) {
		AddGroupRt rt = taskService.addProjectGroup(groupName);
		return rt;
	}

	@RequestMapping(value = "/chggroupname", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public int changeGroupName(long groupId, String name) {
		int rt = taskService.changeGroupName(groupId, name);
		return rt;
	}

	@RequestMapping(value = "/delgroup", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public int delGroup(long groupId) {
		int rt = taskService.delGroup(groupId);
		return rt;
	}

}
