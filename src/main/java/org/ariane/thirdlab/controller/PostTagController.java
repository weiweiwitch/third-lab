package org.ariane.thirdlab.controller;

import org.ariane.thirdlab.constvalue.RtCode;
import org.ariane.thirdlab.domain.PostTag;
import org.ariane.thirdlab.resp.LabResp;
import org.ariane.thirdlab.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping(value = "/api")
public class PostTagController {

	@Autowired
	private PostService postService;

	/**
	 * 获取所有tag
	 *
	 * @return
	 */
	@RequestMapping(value = "/tags", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public LabResp<PostTagContainer> allTags() {
		List<PostTag> postTags = postService.findAllTags();

		PostTagContainer postTagContainer = new PostTagContainer();

		// 建立临时表
		List<PostTagNodeData> ptDatas = new ArrayList<>();
		Map<Long, PostTagNodeData> pMap = new HashMap<>();
		for (PostTag postTag : postTags) {
			PostTagNodeData postTagNodeData = new PostTagNodeData();
			postTagNodeData.id = postTag.getId();
			postTagNodeData.tagName = postTag.getTag();

			postTagNodeData.parentTagId = postTag.getParentTagId();

			pMap.put(postTagNodeData.id, postTagNodeData);
			ptDatas.add(postTagNodeData);
		}

		// 整理出根元素
		List<PostTagNodeData> rootDatas = new ArrayList<>();
		for (PostTagNodeData postTagNodeData : ptDatas) {
			if (postTagNodeData.parentTagId == 0L) {
				rootDatas.add(postTagNodeData);
			} else if (pMap.get(postTagNodeData.parentTagId) == null) {
				rootDatas.add(postTagNodeData);
			} else {
				PostTagNodeData parentTagData = pMap.get(postTagNodeData.parentTagId);
				parentTagData.nodes.add(postTagNodeData);
			}
		}

		// 对最上层排序
		Collections.sort(rootDatas, new Comparator<PostTagNodeData>() {

			@Override
			public int compare(PostTagNodeData o1, PostTagNodeData o2) {
				return o1.tagName.compareTo(o2.tagName);
			}

		});

		LabResp<PostTagContainer> resp = new LabResp<>(RtCode.SUCCESS);
		postTagContainer.tree = rootDatas;
		postTagContainer.list = ptDatas;
		resp.data = postTagContainer;
		return resp;
	}

	public static class PostTagNodeData {
		public long id;
		public String tagName;
		public int num;

		public long parentTagId;

		public List<PostTagNodeData> nodes = new ArrayList<>();
	}

	public static class PostTagContainer {
		public List<PostTagNodeData> tree = new ArrayList<>();
		public List<PostTagNodeData> list = new ArrayList<>();
	}
}
