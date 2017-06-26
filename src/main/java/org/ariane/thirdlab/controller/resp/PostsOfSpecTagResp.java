package org.ariane.thirdlab.controller.resp;

import org.ariane.thirdlab.controller.PostController;

import java.util.ArrayList;
import java.util.List;

public class PostsOfSpecTagResp {

	public List<PostController.PostData> posts = new ArrayList<>();

	public long tagId;

}
