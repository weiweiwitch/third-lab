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

}
