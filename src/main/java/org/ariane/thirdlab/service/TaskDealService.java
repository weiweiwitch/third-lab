package org.ariane.thirdlab.service;

import org.ariane.thirdlab.service.data.ProjectsData;
import org.ariane.thirdlab.service.data.TasksData;

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
	 *
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
	public int addProjectGroup(String name);

	/**
	 * 添加项目
	 *
	 * @param name
	 * @param groupId
	 * @return
	 */
	public int addProject(String name, long groupId);

	/**
	 * 添加任务
	 *
	 * @param taskInfo
	 * @param projectId
	 * @param parentTaskId
	 * @return
	 */
	public int addTask(String taskInfo, long projectId, long parentTaskId);
}
