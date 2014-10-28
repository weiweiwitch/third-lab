package org.ariane.thirdlab.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.ariane.thirdlab.domain.Post;
import org.ariane.thirdlab.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostController {

	@Autowired
	private PostService postService;

	@RequestMapping(value = "/posts", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public List<PostData> allPost() {
		List<Post> posts = postService.findAllPosts();

		// 建立临时表
		List<PostData> pDatas = new ArrayList<PostData>();
		Map<String, PostData> pMap = new HashMap<String, PostData>();
		for (Post post : posts) {
			PostData postData = new PostData();
			postData.id = post.getId();
			postData._id = post.getMgId();
			postData.title = post.getTitle();

			postData.parantId = post.getParantId();
			postData.parant = post.getMgParantId();

			pMap.put(postData._id, postData);
			pDatas.add(postData);
		}

		// 整理出根元素
		List<PostData> rootDatas = new ArrayList<PostData>();
		for (PostData postData : pDatas) {
			if ("".equals(postData.parant)) {
				rootDatas.add(postData);
			} else if (pMap.get(postData.parant) == null) {
				rootDatas.add(postData);
			} else {
				PostData parantData = pMap.get(postData.parant);
				if (parantData.nodes == null) {
					parantData.nodes = new ArrayList<PostController.PostData>();
				}
				parantData.nodes.add(postData);
			}
		}

		// 对最上层排序
		Collections.sort(rootDatas, new Comparator<PostData>() {

			@Override
			public int compare(PostData o1, PostData o2) {
				return o1.title.compareTo(o2.title);
			}

		});

		return rootDatas;
	}

	@RequestMapping(value = "/posts/{id}", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public PostDetailData specPost(@PathVariable long id) {
		Post post = postService.findSpecPost(id);
		if (post != null) {
			PostDetailData postDetailData = new PostDetailData(post);
			return postDetailData;

		} else {
			return null;
		}

	}

	@RequestMapping(value = "/posts", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public PostDetailData createPost(@RequestBody PostDetailData needCreatePost) {
		long parantId = needCreatePost.parantId;
		String title = needCreatePost.title;
		String postData = needCreatePost.postText;
		Post post = postService.createPost(parantId, title, postData);
		PostDetailData postDetailData = new PostDetailData(post);
		return postDetailData;
	}

	@RequestMapping(value = "/posts/{id}", method = RequestMethod.PUT, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public PostDetailData updatePost(@PathVariable long id, @RequestBody PostDetailData needUpdatePost) {
		long parantId = needUpdatePost.parantId;
		String title = needUpdatePost.title;
		String postData = needUpdatePost.postText;
		Post post = postService.updatePost(id, parantId, title, postData);
		PostDetailData postDetailData = new PostDetailData(post);
		return postDetailData;
	}

	@RequestMapping(value = "/posts/{id}", method = RequestMethod.DELETE, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public void deletePost(@PathVariable long id) {
		postService.deletePost(id);
	}

	public static class PostData {
		public long id;
		public String _id;
		public String title;

		public long parantId;
		public String parant;

		public List<PostData> nodes;

	}

	public static class PostDetailData {
		public long id;
		public String _id;
		public String user;
		public String title;
		public String postText;

		public long parantId;
		public String parant;

		public PostDetailData() {

		}

		public PostDetailData(Post post) {
			this.id = post.getId();
			this._id = post.getMgId();
			this.user = "";
			this.title = post.getTitle();
			this.postText = post.getPost();

			this.parantId = post.getParantId();
			this.parant = post.getMgParantId();
		}
	}
}
