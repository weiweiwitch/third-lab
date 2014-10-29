package org.ariane.thirdlab.dao;

import org.ariane.thirdlab.domain.Post;

public interface PostDao extends AbstractDao<Post> {

	public Post findSpecMgId(String mgId);

}
