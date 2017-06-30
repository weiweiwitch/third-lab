package org.ariane.thirdlab.controller;

import org.ariane.thirdlab.constvalue.TlResultCode;
import org.ariane.thirdlab.controller.req.ProjectGoalReq;
import org.ariane.thirdlab.resp.LabResp;
import org.ariane.thirdlab.service.ProjectGoalService;
import org.ariane.thirdlab.service.TaskService;
import org.ariane.thirdlab.service.data.ProjectsGoalData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api")
public class ProjectGoalController {

	@Autowired
	private TaskService taskService;

	@Autowired
	private ProjectGoalService projectGoalService;

	@RequestMapping(value = "/projectGoals", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<ProjectsGoalData> findGoalsOfSpecProject(long projectId) {
		ProjectsGoalData data = projectGoalService.showSpecProjectGoals(projectId);
		LabResp<ProjectsGoalData> resp = new LabResp<>(TlResultCode.SUCCESS);
		resp.data = data;
		return resp;
	}

	@RequestMapping(value = "/projectGoals", method = RequestMethod.POST, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<Integer> addProjectGoal(@RequestBody ProjectGoalReq projectGoalReq) {
		int rt = projectGoalService.addProjectGoal(projectGoalReq);
		LabResp<Integer> resp = new LabResp<>(rt);
		resp.data = 0;
		return resp;
	}

	@RequestMapping(value = "/projectGoals/{id}", method = RequestMethod.DELETE, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<Integer> delProjectGoal(@PathVariable long id) {
		int rt = projectGoalService.delProjectGoal(id);
		LabResp<Integer> resp = new LabResp<>(rt);
		resp.data = 0;
		return resp;
	}

	@RequestMapping(value = "/projectGoals/{id}", method = RequestMethod.PUT, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<Integer> updateProjectGoal(@PathVariable long id, @RequestBody ProjectGoalReq projectGoalReq) {
		int rt = projectGoalService.updateProjectGoal(id, projectGoalReq);
		LabResp<Integer> resp = new LabResp<>(rt);
		resp.data = 0;
		return resp;
	}

}
