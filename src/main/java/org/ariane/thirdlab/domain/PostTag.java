package org.ariane.thirdlab.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "posttag")
public class PostTag implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private long id;

	@Version
	@Column(name = "v")
	private long v;

	@Column(name = "tag", nullable = false, length = 150)
	private String tag;

	@Column(name = "parentTagId", nullable = false)
	private long parentTagId;

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

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public long getParentTagId() {
		return parentTagId;
	}

	public void setParentTagId(long parentTagId) {
		this.parentTagId = parentTagId;
	}

	public PostTag() {

	}

	public PostTag(String tag) {
		this.tag = tag;
	}
}
