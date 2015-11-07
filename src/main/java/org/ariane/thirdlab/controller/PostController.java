package org.ariane.thirdlab.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class PostController {

	@Autowired
	private PostService postService;

	/**
	 * 获取所有文章
	 * 
	 * @return
	 */
	@RequestMapping(value = "/posts", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public List<PostData> allPost() {
		List<Post> posts = postService.findAllPosts();

		// 建立临时表
		List<PostData> pDatas = new ArrayList<PostData>();
		Map<Long, PostData> pMap = new HashMap<Long, PostData>();
		for (Post post : posts) {
			PostData postData = new PostData();
			postData.id = post.getId();
			postData._id = post.getMgId();
			postData.title = post.getTitle();

			postData.parantId = post.getParantId();
			postData.parant = post.getMgParantId();
			postData.status = post.getStatus();

			pMap.put(postData.id, postData);
			pDatas.add(postData);
		}

		// 整理出根元素
		List<PostData> rootDatas = new ArrayList<PostData>();
		for (PostData postData : pDatas) {
			if (postData.parantId == 0L) {
				rootDatas.add(postData);
			} else if (pMap.get(postData.parantId) == null) {
				rootDatas.add(postData);
			} else {
				PostData parantData = pMap.get(postData.parantId);
				if (parantData.nodes == null) {
					parantData.nodes = new ArrayList<>();
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

	@RequestMapping(value = "/whichpost", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public PostPositionData searchPost(@RequestParam String postParam) {
		List<Post> posts = postService.findSpecPost(postParam);
		if (posts.size() > 0) {
			PostPositionData postPositionData = new PostPositionData();
			for (Post post : posts) {
				postPositionData.postInfos.add(new PostInfo(post.getId(), post.getTitle()));
			}
			return postPositionData;

		} else {
			PostPositionData postPositionData = new PostPositionData();
			return postPositionData;
		}
	}

	/**
	 * 获取某一篇文章
	 * 
	 * @param id
	 * @return
	 */
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

	/**
	 * 创建文章
	 * 
	 * @param needCreatePost
	 * @return
	 */
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

	/**
	 * 更新文章
	 * 
	 * @param id
	 * @param needUpdatePost
	 * @return
	 */
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

	/**
	 * 删除文章
	 * 
	 * @param id
	 */
	@RequestMapping(value = "/posts/{id}", method = RequestMethod.DELETE, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public void deletePost(@PathVariable long id) {
		postService.deletePost(id);
	}

	@RequestMapping(value = "/picupload", method = RequestMethod.POST)
	public @ResponseBody String handleFileUpload(// @RequestParam("name") String
													// name,
			@RequestParam("file") MultipartFile file) {
		String name = "dddd.jpg";
		if (!file.isEmpty()) {
			try {
				byte[] bytes = file.getBytes();
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(name)));
				stream.write(bytes);
				stream.close();
				return "You successfully uploaded " + name + "!";
			} catch (Exception e) {
				return "You failed to upload " + name + " => " + e.getMessage();
			}
		} else {
			return "You failed to upload " + name + " because the file was empty.";
		}
	}

	// @RequestMapping("/picupload")
	// public String fileUpload2(@RequestParam("file") CommonsMultipartFile
	// file) throws IOException {
	// long startTime = System.currentTimeMillis();
	// System.out.println("fileName：" + file.getOriginalFilename());
	// String path = "./" + new Date().getTime() + file.getOriginalFilename();
	//
	// File newFile = new File(path);
	// // 通过CommonsMultipartFile的方法直接写文件（注意这个时候）
	// file.transferTo(newFile);
	// long endTime = System.currentTimeMillis();
	// System.out.println("方法二的运行时间：" + String.valueOf(endTime - startTime) +
	// "ms");
	// return "1";
	// }

	public static class PostData {
		public long id;
		public String _id;
		public String title;

		public long parantId;
		public String parant;
		public int status;

		public List<PostData> nodes;

	}

	public static class PostPositionData {
		public List<PostInfo> postInfos = new ArrayList<>();
	}

	public static class PostInfo {
		public long id;
		public String title;

		public PostInfo() {

		}

		public PostInfo(long id, String title) {
			this.id = id;
			this.title = title;
		}
	}

	public static class PostDetailData {
		public long id;
		public String _id;
		public String user;
		public String title;
		public String postText;

		public String audio; // 可选的音频文件链接

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
