package org.ariane.thirdlab.service.impl;

import java.util.Date;

import javax.transaction.Transactional;

import org.ariane.thirdlab.constvalue.TlResultCode;
import org.ariane.thirdlab.dao.StudyProjectDao;
import org.ariane.thirdlab.dao.StudyTaskDao;
import org.ariane.thirdlab.domain.StudyProject;
import org.ariane.thirdlab.domain.StudyTask;
import org.ariane.thirdlab.service.StudyProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class StudyProjectServiceImpl implements StudyProjectService {

	@Autowired
	private StudyProjectDao studyProjectDao;

	@Autowired
	private StudyTaskDao studyTaskDao;

	public StudyProjectDao getStudyProjectDao() {
		return studyProjectDao;
	}

	public void setStudyProjectDao(StudyProjectDao studyProjectDao) {
		this.studyProjectDao = studyProjectDao;
	}

	@Override
	public int addStudyProject(String name, Date finishDate) {
		StudyProject studyProject = new StudyProject();
		studyProject.setName(name);
		studyProject.setFinishDate(finishDate);

		studyProjectDao.save(studyProject);

		return TlResultCode.SUCCESS;
	}

	@Override
	public int addStudyTask(long projectId, long preTask, String name) {

		StudyTask preStudyTask = studyTaskDao.findById(preTask);
		if (preStudyTask != null) {
			return TlResultCode.NOT_FOUND_PRE_TASK;
		}

		StudyProject studyProject = studyProjectDao.findById(projectId);
		if (studyProject == null) {
			return TlResultCode.NOT_FOUND_STUDY_PROJECT;
		}

		StudyTask studyTask = new StudyTask();
		studyTask.setProjectId(projectId);
		studyTask.setPreTask(preTask);
		studyTask.setTaskName(name);

		studyTaskDao.save(studyTask);

		return TlResultCode.SUCCESS;
	}

}
