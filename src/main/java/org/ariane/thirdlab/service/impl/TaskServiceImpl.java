package org.ariane.thirdlab.service.impl;

import org.ariane.thirdlab.constvalue.TlResultCode;
import org.ariane.thirdlab.controller.req.ProjectTaskReq;
import org.ariane.thirdlab.dao.ProjectDao;
import org.ariane.thirdlab.dao.ProjectTaskDao;
import org.ariane.thirdlab.domain.Project;
import org.ariane.thirdlab.domain.ProjectTask;
import org.ariane.thirdlab.service.TaskService;
import org.ariane.thirdlab.service.data.TasksData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {

	@Autowired
	private ProjectDao projectDao;

	@Autowired
	private ProjectTaskDao projectTaskDao;

	@Override
	public TasksData showSomeTasks(long projectId) {
		TasksData data = new TasksData();
		data.tasks = projectTaskDao.findAll();
		return data;
	}

	@Override
	public int addTask(ProjectTaskReq projectTaskReq) {
		long projectId = projectTaskReq.projectId;
		Project project = projectDao.findById(projectId);
		if (project == null) {
			return TlResultCode.NOT_FOUND_PROJECT;
		}

		// 先找到本项目最后一个任务
		// 这步必须在保存新任务前执行
		ProjectTask lastTask = projectTaskDao.findLastTask(projectId, projectTaskReq.goalId);

		// 创建新任务
		ProjectTask task = new ProjectTask();
		task.setName(projectTaskReq.name);
		task.setNote("");
		task.setCreateTime(new Date());
		task.setPeriod(0);
		task.setNextPeriodTime(new Date());
		task.setStatus(0);
		task.setParentTask(0);
		task.setNextTaskId(projectTaskReq.nextTaskId);
		task.setRelyGoalId(projectTaskReq.relyGoalId);
		task.setProjectId(projectTaskReq.projectId);
		task.setGoalId(projectTaskReq.goalId);
		projectTaskDao.save(task);

		// 建立关联
		if (lastTask != null) {
			lastTask.setNextTaskId(task.getId());
		}

		return TlResultCode.SUCCESS;
	}

	@Override
	public int delTask(long taskId) {
		ProjectTask task = projectTaskDao.findById(taskId);
		if (task == null) {
			return TlResultCode.NOT_FOUND_TASK;
		}

		ProjectTask lastTask = projectTaskDao.findTaskByNextTaskId(taskId);
		if (lastTask != null) {
			if (task.getNextTaskId() != 0) {
				ProjectTask nextTask = projectTaskDao.findById(task.getNextTaskId());
				if (nextTask != null) {
					lastTask.setNextTaskId(nextTask.getId());
				} else {
					lastTask.setNextTaskId(0);
				}
			} else {
				lastTask.setNextTaskId(0);
			}
		}

		// 删除任务
		projectTaskDao.delete(task);

		return TlResultCode.SUCCESS;
	}

	@Override
	public int updateProjectTask(long taskId, ProjectTaskReq projectTaskReq) {
		ProjectTask task = projectTaskDao.findById(taskId);
		if (task == null) {
			return TlResultCode.NOT_FOUND_TASK;
		}

		task.setName(projectTaskReq.name);
		task.setNote("");
		task.setCreateTime(new Date());
		task.setPeriod(0);
		task.setNextPeriodTime(new Date());
		task.setStatus(0);
		task.setParentTask(0);

		// 如果改变了任务的下一个任务的引用，那么调整任务顺序
		long targetNextTaskId = projectTaskReq.nextTaskId;
		if (targetNextTaskId != task.getNextTaskId()) {
			ProjectTask lastTask = projectTaskDao.findTaskByNextTaskId(task.getId());
			ProjectTask nextTask = projectTaskDao.findById(task.getNextTaskId());

			ProjectTask oldLinkTask = projectTaskDao.findTaskByNextTaskId(targetNextTaskId);
			if (oldLinkTask != null) {
				oldLinkTask.setNextTaskId(task.getId());
			}
			task.setNextTaskId(targetNextTaskId);

			if (lastTask != null) {
				if (nextTask != null) {
					lastTask.setNextTaskId(nextTask.getId());
				} else {
					lastTask.setNextTaskId(0);
				}
			}
		}

		task.setRelyGoalId(projectTaskReq.relyGoalId);

		task.setGoalId(projectTaskReq.goalId);

		return TlResultCode.SUCCESS;
	}

}

