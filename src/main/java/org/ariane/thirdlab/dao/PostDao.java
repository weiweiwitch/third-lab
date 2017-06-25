package org.ariane.thirdlab.dao;

import java.util.List;

import org.ariane.thirdlab.domain.Post;
import org.ariane.thirdlab.domain.PostTagRelation;

public interface PostDao extends AbstractDao<Post> {

	public Post findSpecMgId(String mgId);

	public List<Post> findSpecPost(String postParam);

	public List<Post> findPostsByIds(List<Long> ids);

	public List<Post> findPostsUntagged();
}
