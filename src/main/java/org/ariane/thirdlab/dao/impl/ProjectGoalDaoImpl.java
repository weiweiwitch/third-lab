package org.ariane.thirdlab.dao.impl;

import org.ariane.thirdlab.dao.ProjectGoalDao;
import org.ariane.thirdlab.domain.ProjectGoal;
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
public class ProjectGoalDaoImpl extends AbstractDaoImpl<ProjectGoal> implements ProjectGoalDao {

	protected ProjectGoalDaoImpl() {
		super(ProjectGoal.class);
	}

	@Override
	public List<ProjectGoal> findGoalsByProjectId(long projectId) {
		List<ProjectGoal> projectGoals = (List<ProjectGoal>) getHibernateTemplate().execute(new HibernateCallback<List<ProjectGoal>>() {
			public List<ProjectGoal> doInHibernate(Session session) throws HibernateException {
				Query hqlQuery = session.createQuery("from ProjectGoal p where p.projectId = :projectId");
				hqlQuery.setLong("projectId", projectId);
				return hqlQuery.list();
			}
		});
		return projectGoals;
	}
}
