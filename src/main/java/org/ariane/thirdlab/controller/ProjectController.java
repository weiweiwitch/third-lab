package org.ariane.thirdlab.controller;

import org.ariane.thirdlab.constvalue.TlResultCode;
import org.ariane.thirdlab.controller.req.PostDetailReq;
import org.ariane.thirdlab.controller.req.ProjectReq;
import org.ariane.thirdlab.controller.resp.AddProjectResp;
import org.ariane.thirdlab.resp.LabResp;
import org.ariane.thirdlab.service.ProjectService;
import org.ariane.thirdlab.service.TaskService;
import org.ariane.thirdlab.service.data.ProjectsData;
import org.ariane.thirdlab.service.data.SpecProjectData;
import org.ariane.thirdlab.service.impl.TaskServiceImpl.AddGroupRt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api")
public class ProjectController {

	@Autowired
	private ProjectService projectService;

	@RequestMapping(value = "/projects", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<ProjectsData> allProjects() {
		ProjectsData data = projectService.showAllProjects();
		LabResp<ProjectsData> resp = new LabResp<>(TlResultCode.SUCCESS);
		resp.data = data;
		return resp;
	}

	@RequestMapping(value = "/projects/{projectId}", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<SpecProjectData> findSpecProject(@PathVariable long projectId) {
		SpecProjectData data = projectService.findSpecProject(projectId);
		LabResp<SpecProjectData> resp = new LabResp<>(TlResultCode.SUCCESS);
		resp.data = data;
		return resp;
	}

	@RequestMapping(value = "/projects", method = RequestMethod.POST, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<AddProjectResp> addProject(@RequestBody ProjectReq projectReq) {
		AddProjectResp addProjectResp = projectService.addProject(projectReq.name, projectReq.groupId);

		LabResp<AddProjectResp> resp = new LabResp<>(addProjectResp.rt);
		resp.data = addProjectResp;
		return resp;
	}

	@RequestMapping(value = "/projects/{id}", method = RequestMethod.DELETE, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<Integer> delProject(@PathVariable long id) {
		int rt = projectService.delProject(id);
		LabResp<Integer> resp = new LabResp<>(rt);
		resp.data = 0;
		return resp;
	}

	@RequestMapping(value = "/projects/{id}", method = RequestMethod.PUT, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<Integer> updateProject(@PathVariable long id, @RequestBody ProjectReq projectReq) {
		int rt = projectService.updateProject(id, projectReq);
		LabResp<Integer> resp = new LabResp<>(rt);
		resp.data = 0;
		return resp;
	}

}
