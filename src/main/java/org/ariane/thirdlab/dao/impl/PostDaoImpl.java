package org.ariane.thirdlab.dao.impl;

import org.ariane.thirdlab.dao.PostDao;
import org.ariane.thirdlab.domain.Post;
import org.springframework.stereotype.Repository;

//@Repository
public class PostDaoImpl extends AbstractDaoImpl<Post> implements PostDao {

	public PostDaoImpl() {
		super(Post.class);
	}

}
