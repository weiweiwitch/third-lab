package org.ariane.thirdlab.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

import org.ariane.thirdlab.constvalue.RtCode;
import org.ariane.thirdlab.controller.req.PostDetailReq;
import org.ariane.thirdlab.controller.resp.PostResp;
import org.ariane.thirdlab.controller.resp.PostsOfSpecTagResp;
import org.ariane.thirdlab.domain.Post;
import org.ariane.thirdlab.resp.LabResp;
import org.ariane.thirdlab.service.PostService;
import org.ariane.thirdlab.service.data.PostDetailData;
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
@RequestMapping(value = "/api")
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
	public LabResp<List<PostResp>> allPost() {
		List<Post> posts = postService.findAllPosts();

		// 建立临时表
		List<PostResp> pDatas = new ArrayList<>();
		for (Post post : posts) {
			PostResp postResp = new PostResp();
			postResp.id = post.getId();
			postResp.title = post.getTitle();
			postResp.parantId = post.getParantId();
			postResp.status = post.getStatus();

			pDatas.add(postResp);
		}

		LabResp<List<PostResp>> resp = new LabResp<>(RtCode.SUCCESS);
		resp.data = pDatas;
		return resp;
	}

	/**
	 * 获取所有文章
	 *
	 * @return
	 */
	@RequestMapping(value = "/tags/{tagId}/posts", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<PostsOfSpecTagResp> findPostsOfSpecTag(@PathVariable(value = "tagId") long tagId) {
		List<Post> posts = postService.findPostsByTagId(tagId);

		// 建立临时表
		List<PostResp> pDatas = new ArrayList<>();
		for (Post post : posts) {
			PostResp postResp = new PostResp();
			postResp.id = post.getId();
			postResp.title = post.getTitle();

			postResp.parantId = post.getParantId();
			postResp.status = post.getStatus();

			pDatas.add(postResp);
		}

		LabResp<PostsOfSpecTagResp> resp = new LabResp<>(RtCode.SUCCESS);
		PostsOfSpecTagResp postsOfSpecTagResp = new PostsOfSpecTagResp();
		postsOfSpecTagResp.posts = pDatas;
		postsOfSpecTagResp.tagId = tagId;
		resp.data = postsOfSpecTagResp;
		return resp;
	}

	@RequestMapping(value = "/whichpost", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<PostPositionData> searchPost(@RequestParam String postParam) {
		List<Post> posts = postService.findSpecPost(postParam);
		if (posts.size() > 0) {
			PostPositionData postPositionData = new PostPositionData();
			for (Post post : posts) {
				postPositionData.postInfos.add(new PostInfo(post.getId(), post.getTitle()));
			}

			LabResp<PostPositionData> resp = new LabResp<>(RtCode.SUCCESS);
			resp.data = postPositionData;
			return resp;

		} else {
			PostPositionData postPositionData = new PostPositionData();
			LabResp<PostPositionData> resp = new LabResp<>(RtCode.SUCCESS);
			resp.data = postPositionData;
			return resp;
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
	public LabResp<PostDetailData> specPost(@PathVariable long id) {
		PostDetailData postDetailData = postService.findSpecPost(id);
		if (postDetailData == null) {
			LabResp<PostDetailData> resp = new LabResp<>(RtCode.POST_NOT_FOUND);
			return resp;
		}

		LabResp<PostDetailData> resp = new LabResp<>(RtCode.SUCCESS);
		resp.data = postDetailData;
		return resp;
	}

	/**
	 * 创建文章
	 *
	 * @param needCreatePost
	 * @return
	 */
	@RequestMapping(value = "/posts", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<PostDetailData> createPost(@RequestBody PostDetailData needCreatePost) {
		long parantId = needCreatePost.parantId;
		String title = needCreatePost.title;
		String postData = needCreatePost.postText;
		Post post = postService.createPost(parantId, title, postData);
		PostDetailData postDetailData = new PostDetailData(post);
		LabResp<PostDetailData> resp = new LabResp<>(RtCode.SUCCESS);
		resp.data = postDetailData;
		return resp;
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
	public LabResp<PostDetailData> updatePost(@PathVariable long id, @RequestBody PostDetailReq needUpdatePost) {
		long parantId = needUpdatePost.parantId;
		String title = needUpdatePost.title;
		String postText = needUpdatePost.postText;
		List<String> tags = needUpdatePost.tags;
		Post post = postService.updatePost(id, parantId, title, postText, tags);
		PostDetailData postDetailData = new PostDetailData(post);
		LabResp<PostDetailData> resp = new LabResp<>(RtCode.SUCCESS);
		resp.data = postDetailData;
		return resp;
	}

	/**
	 * 删除文章
	 *
	 * @param id
	 */
	@RequestMapping(value = "/posts/{id}", method = RequestMethod.DELETE, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<Integer> deletePost(@PathVariable long id) {
		postService.deletePost(id);

		LabResp<Integer> resp = new LabResp<>(RtCode.SUCCESS);
		return resp;
	}

	@RequestMapping(value = "/picupload", method = RequestMethod.POST)
	public @ResponseBody
	String handleFileUpload(// @RequestParam("name") String
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

}
