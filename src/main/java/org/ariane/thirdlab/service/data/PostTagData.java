package org.ariane.thirdlab.service.data;

import org.ariane.thirdlab.domain.PostTag;

/**
 * Created by ariane on 2017/6/25.
 */
public class PostTagData {
	public long id;
	public String tagName;

	public PostTagData() {}

	public PostTagData(PostTag postTag) {
		this.id = postTag.getId();
		this.tagName = postTag.getTag();
	}
}
