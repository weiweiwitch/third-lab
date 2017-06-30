package org.ariane.thirdlab.dao;

import org.ariane.thirdlab.domain.ProjectGoal;
import org.ariane.thirdlab.domain.ProjectSection;

import java.util.List;

/**
 * Created by ariane on 16/4/25.
 */
public interface ProjectGoalDao extends AbstractDao<ProjectGoal> {

	public List<ProjectGoal> findGoalsByProjectId(long projectId);

}
