package org.ariane.thirdlab.service.impl;

import java.util.Date;
import java.util.List;

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
	public List<Post> findAllPosts() {
		return postDao.findAll();
	}

	@Override
	public Post findSpecPost(long id) {
		Post post = postDao.findById(id);
		return post;
	}

	@Override
	public Post updatePost(long id, long parantId, String title, String postData) {
		Post post = postDao.findById(id);
		if (post != null) {
			post.setParantId(parantId);
			post.setTitle(title);
			post.setPost(postData);
			post.setLastModifiedTime(new Date());
		}
		return post;
	}

	@Override
	public Post createPost(long parantId, String title, String postData) {
		Post post = new Post();
		post.setMgId("" + System.currentTimeMillis());
		post.setMgParantId("");
		post.setParantId(parantId);
		post.setTitle(title);
		post.setPost(postData);
		post.setCreateTime(new Date());
		post.setLastModifiedTime(new Date());
		postDao.save(post);

		return post;
	}

	@Override
	public int deletePost(long id) {
		Post post = postDao.findById(id);
		if (post != null) {
			postDao.delete(post);
		}
		return 0;
	}

}
