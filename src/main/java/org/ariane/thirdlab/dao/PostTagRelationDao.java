package org.ariane.thirdlab.dao;

import org.ariane.thirdlab.domain.PostTagRelation;

import java.util.List;

public interface PostTagRelationDao extends AbstractDao<PostTagRelation> {

	public List<PostTagRelation> findRelationsByTagId(long tagId);

	public List<PostTagRelation> findRelationsByPostId(long postId);

}
