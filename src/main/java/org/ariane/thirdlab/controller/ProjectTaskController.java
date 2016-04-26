package org.ariane.thirdlab.controller;

import org.ariane.thirdlab.domain.Post;
import org.ariane.thirdlab.service.TaskDealService;
import org.ariane.thirdlab.service.data.TasksData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class ProjectTaskController {

	@Autowired
	private TaskDealService taskDealService;

	@RequestMapping(value = "/projecttasks", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public TasksData allTasks() {
		TasksData data = taskDealService.showAllTasks();
		return data;
	}

	@RequestMapping(value = "/addprojectgroup", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public int addGroup(String groupName) {
		int rt = taskDealService.addProjectGroup(groupName);
		return rt;
	}

	@RequestMapping(value = "/addproject", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public int addGroup(String name, long groupId) {
		int rt = taskDealService.addProject(name, groupId);
		return rt;
	}

	@RequestMapping(value = "/addtask", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public int addTask(String taskInfo, long projectId, long parentTaskId) {
		int rt = taskDealService.addTask(taskInfo, projectId, parentTaskId);
		return rt;
	}
}
