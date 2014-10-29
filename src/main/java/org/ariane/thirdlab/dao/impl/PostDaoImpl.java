package org.ariane.thirdlab.dao.impl;

import java.util.List;

import org.ariane.thirdlab.dao.PostDao;
import org.ariane.thirdlab.domain.Post;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate4.HibernateCallback;

//@Repository
public class PostDaoImpl extends AbstractDaoImpl<Post> implements PostDao {

	public PostDaoImpl() {
		super(Post.class);
	}

	@Override
	public Post findSpecMgId(final String mgId) {
		List<Post> posts = (List<Post>) getHibernateTemplate().execute(new HibernateCallback<List<Post>>() {
			public List<Post> doInHibernate(Session session) throws HibernateException {
				Query hqlQuery = session.createQuery("from Post p where p.mgId = :mgId");
				hqlQuery.setString("mgId", mgId);
				return hqlQuery.list();
			}
		});
		if (posts.size() > 0) {
			return posts.get(0);
		} else {
			return null;
		}
	}
}
