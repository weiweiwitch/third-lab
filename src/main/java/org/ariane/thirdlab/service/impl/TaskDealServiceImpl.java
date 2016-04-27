package org.ariane.thirdlab.service.impl;

import org.ariane.thirdlab.constvalue.TlResultCode;
import org.ariane.thirdlab.dao.ProjectDao;
import org.ariane.thirdlab.dao.ProjectGroupDao;
import org.ariane.thirdlab.dao.ProjectTaskDao;
import org.ariane.thirdlab.domain.Project;
import org.ariane.thirdlab.domain.ProjectGroup;
import org.ariane.thirdlab.domain.ProjectTask;
import org.ariane.thirdlab.service.TaskDealService;
import org.ariane.thirdlab.service.data.ProjectsData;
import org.ariane.thirdlab.service.data.TasksData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
@Transactional
public class TaskDealServiceImpl implements TaskDealService {

	@Autowired
	private ProjectGroupDao projectGroupDao;

	@Autowired
	private ProjectDao projectDao;

	@Autowired
	private ProjectTaskDao projectTaskDao;

	@Override
	public ProjectsData showAllProjects() {
		ProjectsData data = new ProjectsData();
		data.groups.addAll(projectGroupDao.findAll());
		data.projects.addAll(projectDao.findAll());
		return data;
	}

	@Override
	public TasksData showSomeTasks(long projectId) {
		TasksData data = new TasksData();
		data.tasks = projectTaskDao.findAll();
		return data;
	}

	@Override
	public int addProjectGroup(String name) {
		ProjectGroup group = new ProjectGroup();
		group.setName(name);
		projectGroupDao.save(group);

		return TlResultCode.SUCCESS;
	}

	@Override
	public int addProject(String name, long groupId) {
		ProjectGroup group = projectGroupDao.findById(groupId);
		if (group == null) {
			return TlResultCode.NOT_FOUND_PROJECT_GROUP;
		}

		Project project = new Project();
		project.setName(name);
		project.setGroupId(groupId);
		projectDao.save(project);

		return TlResultCode.SUCCESS;
	}

	@Override
	public int addTask(String taskInfo, long projectId, long parentTaskId) {
		Project project = projectDao.findById(projectId);
		if (project == null) {
			return TlResultCode.NOT_FOUND_PROJECT;
		}

		if (parentTaskId != 0L) {
			ProjectTask parentTask = projectTaskDao.findById(parentTaskId);
			if (parentTask == null) {
				return TlResultCode.NOT_FOUND_TASK;
			}
			if (parentTask.getProjectId() != projectId) {
				return TlResultCode.NOT_SAME_PROJECT_AND_TASK;
			}
		}

		ProjectTask task = new ProjectTask();
		task.setName(taskInfo);
		task.setNote("");
		task.setCreateTime(new Date());
		task.setPeriod(0);
		task.setNextPeriodTime(new Date());
		task.setStatus(0);
		task.setProjectId(projectId);
		task.setParentTask(parentTaskId);
		projectTaskDao.save(task);

		return TlResultCode.SUCCESS;
	}

}
