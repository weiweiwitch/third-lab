package org.ariane.thirdlab.controller.req;

import org.ariane.thirdlab.domain.Post;
import org.ariane.thirdlab.service.data.PostTagData;

import java.util.ArrayList;
import java.util.List;

public class PostDetailReq {

	public long id;
	public String user;
	public String title;
	public String postText;

	public long parantId;

	public List<String> tags = new ArrayList<>();

	public PostDetailReq() {

	}
}
