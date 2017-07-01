package org.ariane.thirdlab.controller;

import org.ariane.thirdlab.controller.req.ProjectTaskReq;
import org.ariane.thirdlab.resp.LabResp;
import org.ariane.thirdlab.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api")
public class TaskController {

	@Autowired
	private TaskService taskService;

	@RequestMapping(value = "/projectTasks", method = RequestMethod.POST, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<Integer> addTask(@RequestBody ProjectTaskReq projectTaskReq) {
		int rt = taskService.addTask(projectTaskReq);
		LabResp<Integer> resp = new LabResp<>(rt);
		resp.data = 0;
		return resp;
	}

	@RequestMapping(value = "/projectTasks/{id}", method = RequestMethod.DELETE, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<Integer> delProjectTask(@PathVariable long id) {
		int rt = taskService.delTask(id);
		LabResp<Integer> resp = new LabResp<>(rt);
		resp.data = 0;
		return resp;
	}

	@RequestMapping(value = "/projectTasks/{id}", method = RequestMethod.PUT, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<Integer> updateProjectTask(@PathVariable long id, @RequestBody ProjectTaskReq projectTaskReq) {
		int rt = taskService.updateProjectTask(id, projectTaskReq);
		LabResp<Integer> resp = new LabResp<>(rt);
		resp.data = 0;
		return resp;
	}

}
