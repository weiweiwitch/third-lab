package org.ariane.thirdlab.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;

@Entity
@Table(name = "project")
public class Project implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2063288682872121908L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private long id;

	@Version
	@Column(name = "v")
	private long v;

	@Column(name = "name", nullable = false, length = 150)
	private String name; // 项目名

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

	public Project() {

	}

}
