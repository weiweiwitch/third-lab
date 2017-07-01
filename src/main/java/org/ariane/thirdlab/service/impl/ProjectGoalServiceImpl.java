package org.ariane.thirdlab.service.impl;

import org.ariane.thirdlab.constvalue.TlResultCode;
import org.ariane.thirdlab.controller.req.ProjectGoalReq;
import org.ariane.thirdlab.controller.req.ProjectSectionReq;
import org.ariane.thirdlab.dao.ProjectDao;
import org.ariane.thirdlab.dao.ProjectGoalDao;
import org.ariane.thirdlab.dao.ProjectSectionDao;
import org.ariane.thirdlab.domain.ProjectGoal;
import org.ariane.thirdlab.domain.ProjectSection;
import org.ariane.thirdlab.service.ProjectGoalService;
import org.ariane.thirdlab.service.ProjectSectionService;
import org.ariane.thirdlab.service.data.ProjectsGoalData;
import org.ariane.thirdlab.service.data.ProjectsSectionData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProjectGoalServiceImpl implements ProjectGoalService {

	@Autowired
	private ProjectGoalDao projectGoalDao;

	@Autowired
	private ProjectSectionDao projectSectionDao;

	@Override
	public ProjectsGoalData showSpecProjectGoals(long projectId) {
		List<ProjectGoal> sections = projectGoalDao.findGoalsByProjectId(projectId);
		ProjectsGoalData projectsGoalData = new ProjectsGoalData();
		projectsGoalData.sections = sections;
		projectsGoalData.projectId = projectId;
		return projectsGoalData;
	}

	@Override
	public int addProjectGoal(ProjectGoalReq projectGoalReq) {
		ProjectGoal projectGoal = new ProjectGoal();
		projectGoal.setName(projectGoalReq.name);
		projectGoal.setProjectId(projectGoalReq.projectId);
		projectGoal.setSectionId(projectGoalReq.sectionId);
		projectGoalDao.save(projectGoal);
		return TlResultCode.SUCCESS;
	}

	@Override
	public int delProjectGoal(long projectGoalId) {
		ProjectGoal projectGoal = projectGoalDao.findById(projectGoalId);
		if (projectGoal == null) {
			return TlResultCode.NOT_FOUND_SPEC_PROJECT_SECTION;
		}

		projectGoalDao.delete(projectGoal);
		return TlResultCode.SUCCESS;
	}

	@Override
	public int updateProjectGoal(long id, ProjectGoalReq projectGoalReq) {
		ProjectGoal projectGoal = projectGoalDao.findById(id);
		if (projectGoal == null) {
			return TlResultCode.NOT_FOUND_SPEC_PROJECT_GOAL;
		}

		projectGoal.setName(projectGoalReq.name);
		projectGoal.setProjectId(projectGoalReq.projectId);
		projectGoal.setSectionId(projectGoalReq.sectionId);
		projectGoalDao.save(projectGoal);
		return TlResultCode.SUCCESS;
	}
}
