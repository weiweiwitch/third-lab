package org.ariane.thirdlab.service;

import org.ariane.thirdlab.controller.resp.AddProjectResp;
import org.ariane.thirdlab.service.data.ProjectsData;
import org.ariane.thirdlab.service.data.TasksData;
import org.ariane.thirdlab.service.impl.TaskDealServiceImpl.AddGroupRt;

/**
 * Created by ariane on 16/4/25.
 */
public interface TaskDealService {

	/**
	 * 获取项目信息
	 *
	 * @return
	 */
	public ProjectsData showAllProjects();

	/**
	 * @param projectId
	 * @return
	 */
	public TasksData showSomeTasks(long projectId);

	/**
	 * 添加项目组
	 *
	 * @param name
	 * @return
	 */
	public AddGroupRt addProjectGroup(String name);

	/**
	 * 添加项目
	 *
	 * @param name
	 * @param groupId
	 * @return
	 */
	public AddProjectResp addProject(String name, long groupId);

	/**
	 * 添加任务
	 *
	 * @param taskInfo
	 * @param projectId
	 * @param parentTaskId
	 * @return
	 */
	public int addTask(String taskInfo, long projectId, long parentTaskId);

	/**
	 * 修改组名
	 *
	 * @param groupId
	 * @param name
	 * @return
	 */
	public int changeGroupName(long groupId, String name);

	/**
	 * 修改项目名
	 *
	 * @param projectId
	 * @param name
	 * @return
	 */
	public int changeProjectName(long projectId, String name);

	/**
	 * 删除项目组
	 *
	 * @param groupId
	 * @return
	 */
	public int delGroup(long groupId);

	/**
	 * 删除项目
	 *
	 * @param projectId
	 * @return
	 */
	public int delProject(long projectId);
}
