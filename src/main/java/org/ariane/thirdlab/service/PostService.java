package org.ariane.thirdlab.service;

import java.util.ArrayList;
import java.util.List;

import org.ariane.thirdlab.domain.Post;
import org.ariane.thirdlab.domain.PostTag;
import org.ariane.thirdlab.service.data.PostDetailData;

public interface PostService {

	public List<Post> findAllPosts();

	public List<Post> findPostsByTagId(long tagId);
	
	public List<Post> findSpecPost(String postParam);

	public PostDetailData findSpecPost(long id);

	public Post createPost(long parantId, String title, String postData);

	public Post updatePost(long id, long parantId, String title, String postText, List<String> tags);

	public int deletePost(long id);

	public List<PostTag> findAllTags();


}
