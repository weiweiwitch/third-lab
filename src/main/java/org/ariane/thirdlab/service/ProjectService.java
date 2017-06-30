package org.ariane.thirdlab.service;

import org.ariane.thirdlab.controller.req.ProjectReq;
import org.ariane.thirdlab.controller.resp.AddProjectResp;
import org.ariane.thirdlab.service.data.ProjectsData;
import org.ariane.thirdlab.service.data.SpecProjectData;

public interface ProjectService {

	/**
	 * 获取项目信息
	 *
	 * @return
	 */
	public ProjectsData showAllProjects();

	/**
	 * 获取特定项目信息
	 *
	 * @param projectId
	 * @return
	 */
	public SpecProjectData findSpecProject(long projectId);

	/**
	 * 添加项目
	 *
	 * @param name
	 * @param groupId
	 * @return
	 */
	public AddProjectResp addProject(String name, long groupId);

	/**
	 * 删除项目
	 *
	 * @param projectId
	 * @return
	 */
	public int delProject(long projectId);

	/**
	 * 修改项目名
	 *
	 * @param id
	 * @param projectReq
	 * @return
	 */
	public int updateProject(long id, ProjectReq projectReq);

}
