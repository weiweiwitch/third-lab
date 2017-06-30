package org.ariane.thirdlab.dao.impl;

import org.ariane.thirdlab.dao.ProjectSectionDao;
import org.ariane.thirdlab.domain.Post;
import org.ariane.thirdlab.domain.PostTag;
import org.ariane.thirdlab.domain.ProjectSection;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate4.HibernateCallback;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by ariane on 16/4/25.
 */
@Repository
public class ProjectSectionDaoImpl extends AbstractDaoImpl<ProjectSection> implements ProjectSectionDao {

	protected ProjectSectionDaoImpl() {
		super(ProjectSection.class);
	}

	@Override
	public List<ProjectSection> findSectionsByProjectId(long projectId) {
		List<ProjectSection> projectSections = (List<ProjectSection>) getHibernateTemplate().execute(new HibernateCallback<List<ProjectSection>>() {
			public List<ProjectSection> doInHibernate(Session session) throws HibernateException {
				Query hqlQuery = session.createQuery("from ProjectSection p where p.projectId = :projectId");
				hqlQuery.setLong("projectId", projectId);
				return hqlQuery.list();
			}
		});
		return projectSections;
	}
}
