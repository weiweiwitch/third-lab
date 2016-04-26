package org.ariane.thirdlab.dao.impl;

import org.ariane.thirdlab.dao.ProjectTaskDao;
import org.ariane.thirdlab.domain.ProjectTask;
import org.springframework.stereotype.Repository;

/**
 * Created by ariane on 16/4/25.
 */
@Repository
public class ProjectTaskDaoImpl extends AbstractDaoImpl<ProjectTask> implements ProjectTaskDao {
	protected ProjectTaskDaoImpl() {
		super(ProjectTask.class);
	}
}
