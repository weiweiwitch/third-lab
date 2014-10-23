package org.ariane.thirdlab.service.impl;

import java.util.Date;

import javax.transaction.Transactional;

import org.ariane.thirdlab.dao.PostDao;
import org.ariane.thirdlab.domain.Post;
import org.ariane.thirdlab.service.PostService;

@Transactional
public class PostServiceImpl implements PostService {

	private PostDao postDao;

	public PostDao getPostDao() {
		return postDao;
	}

	public void setPostDao(PostDao postDao) {
		this.postDao = postDao;
	}

	@Override
	public void createNewPost() {
		Post post = new Post();
		post.setTitle("1");
		post.setPost("1");
		post.setCreateTime(new Date());
		post.setLastModifiedTime(new Date());
		postDao.save(post);
	}

}
