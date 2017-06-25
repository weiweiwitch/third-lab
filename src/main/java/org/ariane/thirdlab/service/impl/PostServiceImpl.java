package org.ariane.thirdlab.service.impl;

import org.ariane.thirdlab.constvalue.PostStatus;
import org.ariane.thirdlab.constvalue.TlResultCode;
import org.ariane.thirdlab.dao.PostDao;
import org.ariane.thirdlab.dao.PostTagDao;
import org.ariane.thirdlab.dao.PostTagRelationDao;
import org.ariane.thirdlab.domain.Post;
import org.ariane.thirdlab.domain.PostTag;
import org.ariane.thirdlab.domain.PostTagRelation;
import org.ariane.thirdlab.service.PostService;
import org.ariane.thirdlab.service.data.PostDetailData;
import org.ariane.thirdlab.service.data.PostTagData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class PostServiceImpl implements PostService {

	@Autowired
	private PostDao postDao;

	@Autowired
	private PostTagDao postTagDao;

	@Autowired
	private PostTagRelationDao postTagRelationDao;

	@Override
	public List<Post> findAllPosts() {
		return postDao.findAll();
	}

	@Override
	public List<Post> findPostsByTagId(long tagId) {
		if (tagId != 0L) {
			List<PostTagRelation> postTagRelations = postTagRelationDao.findRelationsByTagId(tagId);
			List<Long> ids = new ArrayList<>();
			for (PostTagRelation relation : postTagRelations) {
				ids.add(relation.getPostId());
			}
			if (ids.size() == 0) {
				return new ArrayList<>();
			}

			List<Post> posts = postDao.findPostsByIds(ids);
			return posts;

		} else {
			List<Post> allPosts = postDao.findPostsUntagged();
			return allPosts;
		}
	}

	@Override
	public List<Post> findSpecPost(String postParam) {
		List<Post> posts = postDao.findSpecPost(postParam);
		return posts;
	}

	@Override
	public PostDetailData findSpecPost(long id) {
		Post post = postDao.findById(id);
		if (post == null) {
			return null;
		}

		PostDetailData postDetailData = new PostDetailData(post);

		List<PostTagRelation> postTagRelations = postTagRelationDao.findRelationsByPostId(id);
		List<Long> ids = new ArrayList<>();
		for (PostTagRelation relation : postTagRelations) {
			ids.add(relation.getTagId());
		}
		if (ids.size() > 0) {
			List<PostTag> tags = postTagDao.findTagsByIds(ids);
			if (tags.size() > 0) {
				for (PostTag tag : tags) {
					PostTagData postTagData = new PostTagData(tag);
					postDetailData.tags.add(postTagData);
				}
			}
		}

		return postDetailData;
	}

	@Override
	public Post updatePost(long id, long parantId, String title, String postText, List<String> tags) {
		Post post = postDao.findById(id);
		if (post != null) {
			post.setParantId(parantId);
			post.setTitle(title);
			post.setPost(postText);
			post.setLastModifiedTime(new Date());

			// 更新tag
			// 确定tag存在。
			List<PostTag> allTags = postTagDao.findAll(); // 所有的tags
			Map<String, PostTag> existTagStringMap = new HashMap<>(); // 以tag为key的tag表
			Map<Long, PostTag> existTagIdMap = new HashMap<>(); // 以tag的id为key的tag表
			for (PostTag tag : allTags) {
				existTagStringMap.put(tag.getTag(), tag);
				existTagIdMap.put(tag.getId(), tag);
			}

			Map<Long, PostTag> tagIdByPostMap = new HashMap<>(); // 以tagId为key的新tag表
			for (String tag : tags) {
				PostTag existTag = existTagStringMap.get(tag);
				if (existTag == null) {
					// 新建tag
					existTag = new PostTag(tag);
					postTagDao.save(existTag);
					existTagStringMap.put(tag, existTag);
					existTagIdMap.put(existTag.getId(), existTag);
				}
				tagIdByPostMap.put(existTag.getId(), existTag);
			}

			// 更新关系
			Map<Long, PostTagRelation> ownTagRelationMap = new HashMap<>();
			List<PostTagRelation> existRelations = postTagRelationDao.findRelationsByPostId(id);
			Iterator<PostTagRelation> relationIt = existRelations.iterator();
			while (relationIt.hasNext()) {
				PostTagRelation existRelation = relationIt.next();
				long ownTagId = existRelation.getTagId();
				if (tagIdByPostMap.get(ownTagId) == null) {
					// 删除无效关系
					postTagRelationDao.delete(existRelation);
					relationIt.remove();
				} else {
					ownTagRelationMap.put(ownTagId, existRelation);
				}
			}
			for (PostTag postTag : tagIdByPostMap.values()) {
				if (ownTagRelationMap.get(postTag.getId()) == null) {
					// 新建关系
					PostTagRelation newRelation = new PostTagRelation(postTag.getId(), id);
					postTagRelationDao.save(newRelation);
					ownTagRelationMap.put(postTag.getId(), newRelation);
				}
			}
			if (ownTagRelationMap.size() == 0) {
				post.setNoTags(0);
			} else {
				System.out.println("size " + ownTagRelationMap.size());
				post.setNoTags(1);
			}
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
		post.setStatus(PostStatus.PREPARE);

		postDao.save(post);

		return post;
	}

	@Override
	public int deletePost(long id) {
		Post post = postDao.findById(id);
		if (post != null) {
			postDao.delete(post);
		}
		return TlResultCode.SUCCESS;
	}

	@Override
	public List<PostTag> findAllTags() {
		return postTagDao.findAll();
	}

}
