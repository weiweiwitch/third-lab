package org.ariane.thirdlab.dao.impl;

import java.util.List;

import org.ariane.thirdlab.dao.PostDao;
import org.ariane.thirdlab.domain.Post;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate4.HibernateCallback;
import org.springframework.stereotype.Repository;

@Repository
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

	@Override
	public List<Post> findSpecPost(String postParam) {
		List<Post> posts = (List<Post>) getHibernateTemplate().execute(new HibernateCallback<List<Post>>() {
			public List<Post> doInHibernate(Session session) throws HibernateException {
				Query hqlQuery = session.createQuery("from Post p where p.title like :param");
				hqlQuery.setString("param", "%" + postParam + "%");
				hqlQuery.setMaxResults(10);
				return hqlQuery.list();
			}
		});
		return posts;
	}

	@Override
	public List<Post> findPostsByIds(List<Long> ids) {
		List<Post> posts = (List<Post>) getHibernateTemplate().execute(new HibernateCallback<List<Post>>() {
			public List<Post> doInHibernate(Session session) throws HibernateException {
				Query hqlQuery = session.createQuery("from Post p where p.id in ( :ids )");
				hqlQuery.setParameterList("ids", ids);
				return hqlQuery.list();
			}
		});
		return posts;
	}

	@Override
	public List<Post> findPostsUntagged() {
		List<Post> posts = (List<Post>) getHibernateTemplate().execute(new HibernateCallback<List<Post>>() {
			public List<Post> doInHibernate(Session session) throws HibernateException {
				Query hqlQuery = session.createQuery("from Post p where p.noTags = 0");
				return hqlQuery.list();
			}
		});
		return posts;
	}
}
