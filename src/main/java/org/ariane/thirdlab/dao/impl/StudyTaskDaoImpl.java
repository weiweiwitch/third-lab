package org.ariane.thirdlab.dao.impl;

import org.ariane.thirdlab.dao.StudyTaskDao;
import org.ariane.thirdlab.domain.StudyTask;
import org.springframework.stereotype.Repository;

@Repository
public class StudyTaskDaoImpl extends AbstractDaoImpl<StudyTask> implements StudyTaskDao {

	public StudyTaskDaoImpl() {
		super(StudyTask.class);
	}

}
