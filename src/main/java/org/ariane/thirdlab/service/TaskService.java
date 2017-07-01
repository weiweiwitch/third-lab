package org.ariane.thirdlab.service;

import org.ariane.thirdlab.controller.req.ProjectTaskReq;
import org.ariane.thirdlab.service.data.TasksData;
import org.ariane.thirdlab.service.impl.TaskServiceImpl.AddGroupRt;

public interface TaskService {

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
	 * 添加任务
	 *
	 * @param projectTaskReq
	 * @return
	 */
	public int addTask(ProjectTaskReq projectTaskReq);

	/**
	 * 删除任务
	 *
	 * @param taskId
	 * @return
	 */
	public int delTask(long taskId);

	/**
	 * 修改任务
	 *
	 * @param taskId
	 * @param projectTaskReq
	 * @return
	 */
	public int updateProjectTask(long taskId, ProjectTaskReq projectTaskReq);

	/**
	 * 修改组名
	 *
	 * @param groupId
	 * @param name
	 * @return
	 */
	public int changeGroupName(long groupId, String name);

	/**
	 * 删除项目组
	 *
	 * @param groupId
	 * @return
	 */
	public int delGroup(long groupId);

}
