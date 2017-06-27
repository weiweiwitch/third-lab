package org.ariane.thirdlab.controller;

import org.ariane.thirdlab.constvalue.RtCode;
import org.ariane.thirdlab.controller.req.ProjectReq;
import org.ariane.thirdlab.controller.resp.AddProjectResp;
import org.ariane.thirdlab.resp.LabResp;
import org.ariane.thirdlab.service.TaskDealService;
import org.ariane.thirdlab.service.data.ProjectsData;
import org.ariane.thirdlab.service.impl.TaskDealServiceImpl.AddGroupRt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProjectTaskController {

	@Autowired
	private TaskDealService taskDealService;

	@RequestMapping(value = "/projects", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<ProjectsData> allProjects() {
		ProjectsData data = taskDealService.showAllProjects();
		LabResp<ProjectsData> resp = new LabResp<>(RtCode.SUCCESS);
		resp.data = data;
		return resp;
	}

	@RequestMapping(value = "/projects", method = RequestMethod.POST, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<AddProjectResp> addProject(@RequestBody ProjectReq projectReq) {
		AddProjectResp addProjectResp = taskDealService.addProject(projectReq.name, projectReq.groupId);

		LabResp<AddProjectResp> resp = new LabResp<>(addProjectResp.rt);
		resp.data = addProjectResp;
		return resp;
	}

	@RequestMapping(value = "/projects/{id}", method = RequestMethod.DELETE, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<Integer> delProject(@PathVariable long id) {
		int rt = taskDealService.delProject(id);
		LabResp<Integer> resp = new LabResp<>(rt);
		resp.data = 0;
		return resp;
	}

	@RequestMapping(value = "/addprojectgroup", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public AddGroupRt addGroup(String groupName) {
		AddGroupRt rt = taskDealService.addProjectGroup(groupName);
		return rt;
	}

	@RequestMapping(value = "/addtask", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public int addTask(String taskInfo, long projectId, long parentTaskId) {
		int rt = taskDealService.addTask(taskInfo, projectId, parentTaskId);
		return rt;
	}

	@RequestMapping(value = "/chggroupname", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public int changeGroupName(long groupId, String name) {
		int rt = taskDealService.changeGroupName(groupId, name);
		return rt;
	}

	@RequestMapping(value = "/chgproectname", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public int changeProjectName(long projectId, String name) {
		int rt = taskDealService.changeProjectName(projectId, name);
		return rt;
	}

	@RequestMapping(value = "/delgroup", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public int delGroup(long groupId) {
		int rt = taskDealService.delGroup(groupId);
		return rt;
	}

}
