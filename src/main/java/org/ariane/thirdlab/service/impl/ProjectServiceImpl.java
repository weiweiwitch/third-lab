package org.ariane.thirdlab.service.impl;

import org.ariane.thirdlab.constvalue.TlResultCode;
import org.ariane.thirdlab.controller.req.ProjectReq;
import org.ariane.thirdlab.controller.resp.AddProjectResp;
import org.ariane.thirdlab.dao.*;
import org.ariane.thirdlab.domain.Project;
import org.ariane.thirdlab.service.ProjectService;
import org.ariane.thirdlab.service.data.ProjectsData;
import org.ariane.thirdlab.service.data.SpecProjectData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	private ProjectSectionDao projectSectionDao;

	@Autowired
	private ProjectGoalDao projectGoalDao;

	@Autowired
	private ProjectTaskDao projectTaskDao;

	@Autowired
	private ProjectDao projectDao;

	@Autowired
	private ProjectGroupDao projectGroupDao;

	@Override
	public ProjectsData showAllProjects() {
		ProjectsData data = new ProjectsData();
		data.groups.addAll(projectGroupDao.findAll());
		data.projects.addAll(projectDao.findAll());
		return data;
	}

	@Override
	public SpecProjectData findSpecProject(long projectId) {
		Project project = projectDao.findById(projectId);
		if (project == null) {
			SpecProjectData specProjectData = new SpecProjectData(TlResultCode.NOT_FOUND_PROJECT);
			return specProjectData;
		}

		SpecProjectData specProjectData = new SpecProjectData(TlResultCode.SUCCESS);
		specProjectData.project = project;
		specProjectData.sections = projectSectionDao.findSectionsByProjectId(projectId);
		specProjectData.goals = projectGoalDao.findGoalsByProjectId(projectId);
		specProjectData.tasks = projectTaskDao.findTasksByProjectId(projectId);
		return specProjectData;
	}

	@Override
	public AddProjectResp addProject(String name, long groupId) {
//		ProjectGroup group = projectGroupDao.findById(groupId);
//		if (group == null) {
//			AddProjectResp rt = new AddProjectResp();
//			rt.rt = TlResultCode.NOT_FOUND_PROJECT_GROUP;
//			return rt;
//		}

		Project project = new Project();
		project.setName(name);
		project.setGroupId(groupId);
		projectDao.save(project);

		AddProjectResp rt = new AddProjectResp();
		rt.rt = TlResultCode.SUCCESS;
		rt.groupId = groupId;
		rt.projectId = project.getId();

		return rt;
	}

	@Override
	public int delProject(long projectId) {
		Project project = projectDao.findById(projectId);
		if (project == null) {
			return TlResultCode.NOT_FOUND_PROJECT;
		}

		projectDao.delete(project);

		return TlResultCode.SUCCESS;
	}

	@Override
	public int updateProject(long id, ProjectReq projectReq) {
		Project project = projectDao.findById(id);
		if (project == null) {
			return TlResultCode.NOT_FOUND_PROJECT;
		}

		project.setName(projectReq.name);
		project.setGroupId(projectReq.groupId);
		return TlResultCode.SUCCESS;
	}

}
