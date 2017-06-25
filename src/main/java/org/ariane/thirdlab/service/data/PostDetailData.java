package org.ariane.thirdlab.service.data;

import org.ariane.thirdlab.domain.Post;
import org.ariane.thirdlab.domain.PostTag;

import java.util.ArrayList;
import java.util.List;

public class PostDetailData {

	public long id;
	public String _id;
	public String user;
	public String title;
	public String postText;

	public String audio; // 可选的音频文件链接

	public long parantId;
	public String parant;

	public List<PostTagData> tags = new ArrayList<>();

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
