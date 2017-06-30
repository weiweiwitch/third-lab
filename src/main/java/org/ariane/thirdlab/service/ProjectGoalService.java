package org.ariane.thirdlab.service;

import org.ariane.thirdlab.controller.req.ProjectGoalReq;
import org.ariane.thirdlab.service.data.ProjectsGoalData;

public interface ProjectGoalService {

	/**
	 * 获取特定项目目标信息
	 *
	 * @param projectId
	 * @return
	 */
	public ProjectsGoalData showSpecProjectGoals(long projectId);

	/**
	 * 添加项目目标
	 *
	 * @param projectGoalReq
	 * @return
	 */
	public int addProjectGoal(ProjectGoalReq projectGoalReq);

	/**
	 * 删除项目目标
	 *
	 * @param projectGoalId
	 * @return
	 */
	public int delProjectGoal(long projectGoalId);

	/**
	 * 修改项目目标名
	 *
	 * @param id
	 * @param projectGoalReq
	 * @return
	 */
	public int updateProjectGoal(long id, ProjectGoalReq projectGoalReq);

}
