package org.ariane.thirdlab.service.impl;

import java.net.UnknownHostException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.ariane.thirdlab.controller.HelloWorldController.PD;
import org.ariane.thirdlab.dao.PostDao;
import org.ariane.thirdlab.domain.Post;
import org.ariane.thirdlab.service.PostService;
import org.bson.types.ObjectId;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoClient;

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

	@Override
	public void upgrade() throws UnknownHostException {
		// 创建一个MongoDB的数据库连接对象
		Mongo mg = new MongoClient("localhost", 27017);
		// 验证模式登录(如果不设置验证模块，可直接登录)
		// 想要登录验证模块生效,需在命令行下输入1->mongo 2->use admin
		// 3->db.addUser("root","root123"); 4->db.auth("root","root123");
		// login success
		// 获得一个test的数据库，如果该数据库不存在，会自动创建
		DB db = mg.getDB("mylab");
		// 获取一个聚集集合DBCollection,相当于我们的数据库表
		DBCollection posts = db.getCollection("posts");
		System.out.println(posts.count());

		Map<String, PD> oldPostMap = new HashMap<String, PD>();

		DBCursor cur = posts.find();
		while (cur.hasNext()) {
			DBObject dbo = cur.next();
			System.out.println(dbo);
			ObjectId oid = (ObjectId) dbo.get("_id");
			String idStr = oid.toString();
			System.out.println(oid.toString());
			String parant = (String) dbo.get("parant");
			System.out.println(parant.getClass());

			String title = (String) dbo.get("title");
			String postText = (String) dbo.get("post");
			PD pd = new PD();
			pd.id = idStr;
			pd.parant = parant;
			pd.title = title;
			pd.post = postText;

			oldPostMap.put(idStr, pd);

			Post post = new Post();
			post.setMgId(idStr);
			post.setMgParantId(parant);
			post.setTitle(title);
			post.setPost(postText);
			post.setCreateTime(new Date());
			post.setLastModifiedTime(new Date());

			postDao.save(post);
		}

		List<Post> allPosts = postDao.findAll();
		for (Post allPost : allPosts) {
			String parantStr = allPost.getMgParantId();
			if ("".equals(parantStr)) {
				continue;
			}
			Post parantPost = postDao.findSpecMgId(parantStr);
			allPost.setParantId(parantPost.getId());
		}
	}
}
