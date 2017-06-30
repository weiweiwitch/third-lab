package org.ariane.thirdlab.dao.impl;

import org.ariane.thirdlab.dao.ProjectTaskDao;
import org.ariane.thirdlab.domain.ProjectSection;
import org.ariane.thirdlab.domain.ProjectTask;
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
public class ProjectTaskDaoImpl extends AbstractDaoImpl<ProjectTask> implements ProjectTaskDao {
	protected ProjectTaskDaoImpl() {
		super(ProjectTask.class);
	}

	@Override
	public List<ProjectTask> findTasksByProjectId(long projectId) {
		List<ProjectTask> tasks = (List<ProjectTask>) getHibernateTemplate().execute(new HibernateCallback<List<ProjectTask>>() {
			public List<ProjectTask> doInHibernate(Session session) throws HibernateException {
				Query hqlQuery = session.createQuery("from ProjectTask p where p.projectId = :projectId");
				hqlQuery.setLong("projectId", projectId);
				return hqlQuery.list();
			}
		});
		return tasks;
	}
}
