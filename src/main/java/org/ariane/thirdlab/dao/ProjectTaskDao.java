package org.ariane.thirdlab.dao;

import org.ariane.thirdlab.domain.Project;
import org.ariane.thirdlab.domain.ProjectTask;

import java.util.List;

/**
 * Created by ariane on 16/4/25.
 */
public interface ProjectTaskDao extends AbstractDao<ProjectTask> {

	public List<ProjectTask> findTasksByProjectId(long projectId);

}
