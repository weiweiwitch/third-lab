package org.ariane.thirdlab.service;

import java.util.List;

import org.ariane.thirdlab.domain.Post;

public interface PostService {

	public List<Post> findAllPosts();

	public Post findSpecPost(long id);

	public Post createPost(long parantId, String title, String postData);

	public Post updatePost(long id, long parantId, String title, String postData);

	public int deletePost(long id);

}
