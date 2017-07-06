package org.ariane.thirdlab.dao;

import org.ariane.thirdlab.domain.Project;
import org.ariane.thirdlab.domain.ProjectTask;

import java.util.List;

/**
 * Created by ariane on 16/4/25.
 */
public interface ProjectTaskDao extends AbstractDao<ProjectTask> {

	public List<ProjectTask> findTasksByProjectId(long projectId);

	/**
	 * 找到最后一个任务
	 *
	 * @param projectId
	 * @param goalId
	 * @return
	 */
	public ProjectTask findLastTask(long projectId, long goalId);

	/**
	 * 根据下一个任务的ID获取任务
	 *
	 * @param nextTaskId
	 * @return
	 */
	public ProjectTask findTaskByNextTaskId(long nextTaskId);

}
