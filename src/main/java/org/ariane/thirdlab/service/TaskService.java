package org.ariane.thirdlab.service;

import org.ariane.thirdlab.controller.req.ProjectTaskReq;
import org.ariane.thirdlab.service.data.TasksData;

public interface TaskService {

	/**
	 * @param projectId
	 * @return
	 */
	public TasksData showSomeTasks(long projectId);

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

}
