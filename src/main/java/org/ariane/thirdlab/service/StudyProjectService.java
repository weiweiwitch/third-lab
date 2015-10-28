package org.ariane.thirdlab.service;

import java.util.Date;

public interface StudyProjectService {

	/**
	 * 添加学习计划
	 * 
	 * @param name
	 * @param finishDate
	 * @return
	 */
	public int addStudyProject(String name, Date finishDate);

	/**
	 * 添加学习任务
	 * 
	 * @param projectId
	 * @param preTask
	 * @param name
	 * @return
	 */
	public int addStudyTask(long projectId, long preTask, String name);

}
