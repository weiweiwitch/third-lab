package org.ariane.thirdlab.dao.impl;

import org.ariane.thirdlab.dao.StudyProjectDao;
import org.ariane.thirdlab.domain.StudyProject;
import org.springframework.stereotype.Repository;

@Repository
public class StudyProjectDaoImpl extends AbstractDaoImpl<StudyProject> implements StudyProjectDao {

	public StudyProjectDaoImpl() {
		super(StudyProject.class);
	}

}
