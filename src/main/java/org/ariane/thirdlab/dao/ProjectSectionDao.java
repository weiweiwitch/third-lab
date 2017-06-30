package org.ariane.thirdlab.dao;

import org.ariane.thirdlab.domain.ProjectSection;

import java.util.List;

/**
 * Created by ariane on 16/4/25.
 */
public interface ProjectSectionDao extends AbstractDao<ProjectSection> {

	public List<ProjectSection> findSectionsByProjectId(long projectId);

}
