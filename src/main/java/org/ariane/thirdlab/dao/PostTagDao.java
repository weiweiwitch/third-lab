package org.ariane.thirdlab.dao;

import org.ariane.thirdlab.domain.Post;
import org.ariane.thirdlab.domain.PostTag;

import java.util.List;

public interface PostTagDao extends AbstractDao<PostTag> {

	public List<PostTag> findTagsByIds(List<Long> ids);

}
