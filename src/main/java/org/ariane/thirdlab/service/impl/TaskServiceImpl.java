package org.ariane.thirdlab.service.impl;

import org.ariane.thirdlab.constvalue.TlResultCode;
import org.ariane.thirdlab.controller.req.ProjectTaskReq;
import org.ariane.thirdlab.dao.ProjectDao;
import org.ariane.thirdlab.dao.ProjectGroupDao;
import org.ariane.thirdlab.dao.ProjectTaskDao;
import org.ariane.thirdlab.domain.Project;
import org.ariane.thirdlab.domain.ProjectGroup;
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
	private ProjectGroupDao projectGroupDao;

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
	public AddGroupRt addProjectGroup(String name) {
		ProjectGroup group = new ProjectGroup();
		group.setName(name);
		projectGroupDao.save(group);

		AddGroupRt rt = new AddGroupRt();
		rt.rt = TlResultCode.SUCCESS;
		rt.groupId = group.getId();
		return rt;
	}

	public static class AddGroupRt {
		public int rt;
		public long groupId;
	}

	@Override
	public int addTask(ProjectTaskReq projectTaskReq) {
		Project project = projectDao.findById(projectTaskReq.projectId);
		if (project == null) {
			return TlResultCode.NOT_FOUND_PROJECT;
		}

		ProjectTask task = new ProjectTask();
		task.setName(projectTaskReq.name);
		task.setNote("");
		task.setCreateTime(new Date());
		task.setPeriod(0);
		task.setNextPeriodTime(new Date());
		task.setStatus(0);
		task.setParentTask(0);

		task.setProjectId(projectTaskReq.projectId);
		task.setGoalId(projectTaskReq.goalId);
		projectTaskDao.save(task);

		return TlResultCode.SUCCESS;
	}

	@Override
	public int changeGroupName(long groupId, String name) {
		ProjectGroup group = projectGroupDao.findById(groupId);
		if (group == null) {
			return TlResultCode.NOT_FOUND_PROJECT_GROUP;
		}

		group.setName(name);

		return TlResultCode.SUCCESS;
	}



	@Override
	public int delGroup(long groupId) {
		ProjectGroup group = projectGroupDao.findById(groupId);
		if (group == null) {
			return TlResultCode.NOT_FOUND_PROJECT_GROUP;
		}

		projectGroupDao.delete(group);

		return TlResultCode.SUCCESS;
	}

}

