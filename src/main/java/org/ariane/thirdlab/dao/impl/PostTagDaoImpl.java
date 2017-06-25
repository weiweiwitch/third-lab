package org.ariane.thirdlab.dao.impl;

import org.ariane.thirdlab.dao.PostTagDao;
import org.ariane.thirdlab.domain.Post;
import org.ariane.thirdlab.domain.PostTag;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate4.HibernateCallback;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PostTagDaoImpl extends AbstractDaoImpl<PostTag> implements PostTagDao {

	public PostTagDaoImpl() {
		super(PostTag.class);
	}

	@Override
	public List<PostTag> findTagsByIds(List<Long> ids) {
		List<PostTag> postTags = (List<PostTag>) getHibernateTemplate().execute(new HibernateCallback<List<PostTag>>() {
			public List<PostTag> doInHibernate(Session session) throws HibernateException {
				Query hqlQuery = session.createQuery("from PostTag p where p.id in ( :ids )");
				hqlQuery.setParameterList("ids", ids);
				return hqlQuery.list();
			}
		});
		return postTags;
	}
}
