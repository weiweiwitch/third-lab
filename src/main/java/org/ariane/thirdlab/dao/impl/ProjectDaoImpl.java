package org.ariane.thirdlab.dao.impl;

import org.ariane.thirdlab.dao.ProjectDao;
import org.ariane.thirdlab.dao.ProjectGroupDao;
import org.ariane.thirdlab.domain.Project;
import org.ariane.thirdlab.domain.ProjectGroup;
import org.springframework.stereotype.Repository;

/**
 * Created by ariane on 16/4/25.
 */
@Repository
public class ProjectDaoImpl extends AbstractDaoImpl<Project> implements ProjectDao {
	protected ProjectDaoImpl() {
		super(Project.class);
	}
}
