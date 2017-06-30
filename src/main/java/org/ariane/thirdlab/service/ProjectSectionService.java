package org.ariane.thirdlab.service;

import org.ariane.thirdlab.controller.req.ProjectReq;
import org.ariane.thirdlab.controller.req.ProjectSectionReq;
import org.ariane.thirdlab.controller.resp.AddProjectResp;
import org.ariane.thirdlab.service.data.ProjectsData;
import org.ariane.thirdlab.service.data.ProjectsSectionData;

public interface ProjectSectionService {

	/**
	 * 获取特定项目信息
	 *
	 * @param projectId
	 * @return
	 */
	public ProjectsSectionData showSpecProjectSections(long projectId);

	/**
	 * 添加项目部分
	 *
	 * @param projectSectionReq
	 * @return
	 */
	public int addProjectSection(ProjectSectionReq projectSectionReq);

	/**
	 * 删除项目
	 *
	 * @param projectSectionId
	 * @return
	 */
	public int delProjectSection(long projectSectionId);

	/**
	 * 修改项目名
	 *
	 * @param id
	 * @param projectSectionReq
	 * @return
	 */
	public int updateProjectSection(long id, ProjectSectionReq projectSectionReq);

}
