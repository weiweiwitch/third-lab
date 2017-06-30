package org.ariane.thirdlab.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "projectsection")
public class ProjectSection implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private long id;

	@Version
	@Column(name = "v")
	private long v;

	@Column(name = "name", nullable = false, length = 150)
	private String name; // 部分名

	@Column(name = "projectId", nullable = false)
	private long projectId; // 项目ID

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getProjectId() {
		return projectId;
	}

	public void setProjectId(long projectId) {
		this.projectId = projectId;
	}
}
