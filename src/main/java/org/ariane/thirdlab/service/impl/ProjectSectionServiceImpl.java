package org.ariane.thirdlab.service.impl;

import org.ariane.thirdlab.constvalue.TlResultCode;
import org.ariane.thirdlab.controller.req.ProjectReq;
import org.ariane.thirdlab.controller.req.ProjectSectionReq;
import org.ariane.thirdlab.controller.resp.AddProjectResp;
import org.ariane.thirdlab.dao.ProjectDao;
import org.ariane.thirdlab.dao.ProjectGroupDao;
import org.ariane.thirdlab.dao.ProjectSectionDao;
import org.ariane.thirdlab.dao.ProjectTaskDao;
import org.ariane.thirdlab.domain.Project;
import org.ariane.thirdlab.domain.ProjectSection;
import org.ariane.thirdlab.service.ProjectSectionService;
import org.ariane.thirdlab.service.ProjectService;
import org.ariane.thirdlab.service.data.ProjectsData;
import org.ariane.thirdlab.service.data.ProjectsSectionData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProjectSectionServiceImpl implements ProjectSectionService {

	@Autowired
	private ProjectDao projectDao;

	@Autowired
	private ProjectSectionDao projectSectionDao;

	@Override
	public ProjectsSectionData showSpecProjectSections(long projectId) {
		List<ProjectSection> sections = projectSectionDao.findSectionsByProjectId(projectId);
		ProjectsSectionData projectsSectionData = new ProjectsSectionData();
		projectsSectionData.sections = sections;
		projectsSectionData.projectId = projectId;
		return projectsSectionData;
	}

	@Override
	public int addProjectSection(ProjectSectionReq projectSectionReq) {
		Project project = projectDao.findById(projectSectionReq.projectId);
		if (project == null) {
			return TlResultCode.NOT_FOUND_PROJECT;
		}

		ProjectSection projectSection = new ProjectSection();
		projectSection.setName(projectSectionReq.name);
		projectSection.setProjectId(projectSectionReq.projectId);
		projectSectionDao.save(projectSection);
		return TlResultCode.SUCCESS;
	}

	@Override
	public int delProjectSection(long projectSectionId) {
		ProjectSection projectSection = projectSectionDao.findById(projectSectionId);
		if (projectSection == null) {
			return TlResultCode.NOT_FOUND_SPEC_PROJECT_SECTION;
		}

		projectSectionDao.delete(projectSection);
		return TlResultCode.SUCCESS;
	}

	@Override
	public int updateProjectSection(long id, ProjectSectionReq projectSectionReq) {
		ProjectSection projectSection = projectSectionDao.findById(id);
		if (projectSection == null) {
			return TlResultCode.NOT_FOUND_SPEC_PROJECT_SECTION;
		}

		Project project = projectDao.findById(projectSectionReq.projectId);
		if (project == null) {
			return TlResultCode.NOT_FOUND_PROJECT;
		}

		projectSection.setName(projectSectionReq.name);
		projectSection.setProjectId(projectSectionReq.projectId);
		projectSectionDao.save(projectSection);
		return TlResultCode.SUCCESS;
	}
}
