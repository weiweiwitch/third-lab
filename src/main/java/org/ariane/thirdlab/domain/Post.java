package org.ariane.thirdlab.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Version;

@Entity
@Table(name = "post")
public class Post implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5512474596176034262L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private long id;

	@Version
	@Column(name = "v")
	private long v;

	@Column(name = "parantId")
	private long parantId;

	@Column(name = "mgId", nullable = false, length = 150)
	private String mgId;

	@Column(name = "mgParantId", length = 150)
	private String mgParantId;

	@Column(name = "title", nullable = false, length = 150)
	private String title;

	@Column(name = "post", length = 256000)
	private String post;

	@Temporal(TemporalType.TIMESTAMP)
	private Date createTime;

	@Temporal(TemporalType.TIMESTAMP)
	private Date lastModifiedTime;
	
	@Column(name = "status", nullable = false)
	private int status; // 文章状态

	@Column(name = "noTags", nullable = false)
	private int noTags; // 没有标签

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

	public long getParantId() {
		return parantId;
	}

	public void setParantId(long parantId) {
		this.parantId = parantId;
	}

	public String getMgId() {
		return mgId;
	}

	public void setMgId(String mgId) {
		this.mgId = mgId;
	}

	public String getMgParantId() {
		return mgParantId;
	}

	public void setMgParantId(String mgParantId) {
		this.mgParantId = mgParantId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPost() {
		return post;
	}

	public void setPost(String post) {
		this.post = post;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getLastModifiedTime() {
		return lastModifiedTime;
	}

	public void setLastModifiedTime(Date lastModifiedTime) {
		this.lastModifiedTime = lastModifiedTime;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getNoTags() {
		return noTags;
	}

	public void setNoTags(int noTags) {
		this.noTags = noTags;
	}
}
