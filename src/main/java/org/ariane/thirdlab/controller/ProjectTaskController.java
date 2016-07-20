package org.ariane.thirdlab.controller;

import org.ariane.thirdlab.service.TaskDealService;
import org.ariane.thirdlab.service.data.ProjectsData;
import org.ariane.thirdlab.service.impl.TaskDealServiceImpl.AddGroupRt;
import org.ariane.thirdlab.service.impl.TaskDealServiceImpl.AddProjectRt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectTaskController {

	@Autowired
	private TaskDealService taskDealService;

	@RequestMapping(value = "/projects", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public ProjectsData allTasks() {
		ProjectsData data = taskDealService.showAllProjects();
		return data;
	}

	@RequestMapping(value = "/addprojectgroup", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public AddGroupRt addGroup(String groupName) {
		AddGroupRt rt = taskDealService.addProjectGroup(groupName);
		return rt;
	}

	@RequestMapping(value = "/addproject", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public AddProjectRt addGroup(String name, long groupId) {
		AddProjectRt rt = taskDealService.addProject(name, groupId);
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

	@RequestMapping(value = "/delname", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public int delProject(long projectId) {
		int rt = taskDealService.delProject(projectId);
		return rt;
	}
}
