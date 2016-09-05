package org.ariane.thirdlab.dao.impl;

import org.ariane.thirdlab.dao.ExamQuestionDao;
import org.ariane.thirdlab.domain.ExamQuestion;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate4.HibernateCallback;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ExamQuestionDaoImpl extends AbstractDaoImpl<ExamQuestion> implements ExamQuestionDao {

	public ExamQuestionDaoImpl() {
		super(ExamQuestion.class);
	}

	@Override
	public List<Object[]> calCategoryQuestionNum() {
		List<Object[]> cals = (List<Object[]>) getHibernateTemplate().execute(new HibernateCallback<List<Object[]>>() {
			public List<Object[]> doInHibernate(Session session) throws HibernateException {
				List<Object[]> results = (List<Object[]>) session.createCriteria(ExamQuestion.class)
						.setProjection(Projections.projectionList()
								.add(Projections.rowCount())
								.add(Projections.groupProperty("categoryId"))
						)
						.list();
				return results;
			}
		});

		return cals;
	}

	@Override
	public Integer calSpecCategoryQuestionNum(long categoryId) {
		Integer cals = (Integer) getHibernateTemplate().execute(new HibernateCallback<Integer>() {
			public Integer doInHibernate(Session session) throws HibernateException {
				Integer totalResult = ((Number) session.createCriteria(ExamQuestion.class)
						.add(Restrictions.eq("categoryId", categoryId))
						.setProjection(Projections.rowCount()).uniqueResult()).intValue();
				return totalResult;
			}
		});

		return cals;
	}

	@Override
	public List<ExamQuestion> findQuestions(long categoryId) {
		List<ExamQuestion> questions = (List<ExamQuestion>) getHibernateTemplate().execute(new HibernateCallback<List<ExamQuestion>>() {
			public List<ExamQuestion> doInHibernate(Session session) throws HibernateException {
				Query hqlQuery = session.createQuery("FROM ExamQuestion p WHERE p.categoryId = :categoryId");
				hqlQuery.setLong("categoryId", categoryId);
				return hqlQuery.list();
			}
		});
		return questions;
	}

	@Override
	public List<ExamQuestion> findQuestionsLimit(long categoryId, int num) {
		List<ExamQuestion> questions = (List<ExamQuestion>) getHibernateTemplate().execute(new HibernateCallback<List<ExamQuestion>>() {
			public List<ExamQuestion> doInHibernate(Session session) throws HibernateException {
				Query hqlQuery = session.createQuery("FROM ExamQuestion p WHERE p.categoryId = :categoryId");
				hqlQuery.setLong("categoryId", categoryId);
				hqlQuery.setMaxResults(num);
				return hqlQuery.list();
			}
		});
		return questions;
	}
}
