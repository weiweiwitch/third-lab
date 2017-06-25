package org.ariane.thirdlab.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "ptrelation")
public class PostTagRelation implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private long id;

	@Version
	@Column(name = "v")
	private long v;

	@Column(name = "tagId", nullable = false)
	private long tagId;

	@Column(name = "postId", nullable = false)
	private long postId;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getV() {
		return v;
	}

	public void setV(long v) {
		this.v = v;
	}

	public long getTagId() {
		return tagId;
	}

	public void setTagId(long tagId) {
		this.tagId = tagId;
	}

	public long getPostId() {
		return postId;
	}

	public void setPostId(long postId) {
		this.postId = postId;
	}

	public PostTagRelation() {

	}

	public PostTagRelation(long tagId, long postId) {
		this.tagId = tagId;
		this.postId = postId;
	}
}
