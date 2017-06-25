package org.ariane.thirdlab.dao.impl;

import org.ariane.thirdlab.dao.PostTagRelationDao;
import org.ariane.thirdlab.domain.PostTagRelation;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate4.HibernateCallback;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PostTagRelationDaoImpl extends AbstractDaoImpl<PostTagRelation> implements PostTagRelationDao {

	public PostTagRelationDaoImpl() {
		super(PostTagRelation.class);
	}

	@Override
	public List<PostTagRelation> findRelationsByTagId(long tagId) {
		List<PostTagRelation> postTagRelations = (List<PostTagRelation>) getHibernateTemplate().execute(new HibernateCallback<List<PostTagRelation>>() {
			public List<PostTagRelation> doInHibernate(Session session) throws HibernateException {
				Query hqlQuery = session.createQuery("from PostTagRelation p where p.tagId = :param");
				hqlQuery.setLong("param", tagId);
				return hqlQuery.list();
			}
		});
		return postTagRelations;
	}

	@Override
	public List<PostTagRelation> findRelationsByPostId(long postId) {
		List<PostTagRelation> postTagRelations = (List<PostTagRelation>) getHibernateTemplate().execute(new HibernateCallback<List<PostTagRelation>>() {
			public List<PostTagRelation> doInHibernate(Session session) throws HibernateException {
				Query hqlQuery = session.createQuery("from PostTagRelation p where p.postId = :param");
				hqlQuery.setLong("param", postId);
				return hqlQuery.list();
			}
		});
		return postTagRelations;
	}
}
