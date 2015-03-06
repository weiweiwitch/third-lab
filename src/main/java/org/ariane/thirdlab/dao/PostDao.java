package org.ariane.thirdlab.dao;

import java.util.List;

import org.ariane.thirdlab.domain.Post;

public interface PostDao extends AbstractDao<Post> {

	public Post findSpecMgId(String mgId);

	public List<Post> findSpecPost(String postParam);

}
