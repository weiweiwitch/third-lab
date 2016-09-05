package org.ariane.thirdlab.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "examqc")
public class ExamQuestionCategory implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private long id;

	@Version
	@Column(name = "v")
	private long v;

	@Column(name = "category", nullable = false, length = 30)
	private String category; // 类别名

	@Column(name = "parentCategoryId", nullable = false)
	private long parentCategoryId; // 父类别，用于归类用

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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public long getParentCategoryId() {
		return parentCategoryId;
	}

	public void setParentCategoryId(long parentCategoryId) {
		this.parentCategoryId = parentCategoryId;
	}
}
