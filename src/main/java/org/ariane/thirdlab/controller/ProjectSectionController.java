package org.ariane.thirdlab.controller;

import org.ariane.thirdlab.constvalue.TlResultCode;
import org.ariane.thirdlab.controller.req.ProjectSectionReq;
import org.ariane.thirdlab.resp.LabResp;
import org.ariane.thirdlab.service.ProjectSectionService;
import org.ariane.thirdlab.service.TaskService;
import org.ariane.thirdlab.service.data.ProjectsSectionData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api")
public class ProjectSectionController {

	@Autowired
	private TaskService taskService;

	@Autowired
	private ProjectSectionService projectSectionService;

	@RequestMapping(value = "/projectSections", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<ProjectsSectionData> findSectionsOfSpecProject(long projectId) {
		ProjectsSectionData data = projectSectionService.showSpecProjectSections(projectId);
		LabResp<ProjectsSectionData> resp = new LabResp<>(TlResultCode.SUCCESS);
		resp.data = data;
		return resp;
	}

	@RequestMapping(value = "/projectSections", method = RequestMethod.POST, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<Integer> addProjectSection(@RequestBody ProjectSectionReq projectSectionReq) {
		int rt = projectSectionService.addProjectSection(projectSectionReq);
		LabResp<Integer> resp = new LabResp<>(rt);
		resp.data = 0;
		return resp;
	}

	@RequestMapping(value = "/projectSections/{id}", method = RequestMethod.DELETE, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<Integer> delProjectSection(@PathVariable long id) {
		int rt = projectSectionService.delProjectSection(id);
		LabResp<Integer> resp = new LabResp<>(rt);
		resp.data = 0;
		return resp;
	}

	@RequestMapping(value = "/projectSections/{id}", method = RequestMethod.PUT, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<Integer> updateProjectSection(@PathVariable long id, @RequestBody ProjectSectionReq projectSectionReq) {
		int rt = projectSectionService.updateProjectSection(id, projectSectionReq);
		LabResp<Integer> resp = new LabResp<>(rt);
		resp.data = 0;
		return resp;
	}

}
