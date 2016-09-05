package org.ariane.thirdlab.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "examquestion")
public class ExamQuestion implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private long id;

	@Version
	@Column(name = "v")
	private long v;

	@Column(name = "categoryId", nullable = false)
	private long categoryId;

	@Column(name = "question", nullable = false, length = 256000)
	private String question;

	@Column(name = "answer", nullable = false, length = 256000)
	private String answer; // 正确答案

	@Column(name = "answer2", nullable = false, length = 256000)
	private String answer2; // 迷惑答案，用于选择题

	@Column(name = "answer3", nullable = false, length = 256000)
	private String answer3; // 迷惑答案，用于选择题

	@Column(name = "answer4", nullable = false, length = 256000)
	private String answer4; // 迷惑答案，用于选择题

	@Column(name = "proficiency", nullable = false)
	private int proficiency; // 熟练度

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

	public long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(long categoryId) {
		this.categoryId = categoryId;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getAnswer2() {
		return answer2;
	}

	public void setAnswer2(String answer2) {
		this.answer2 = answer2;
	}

	public String getAnswer3() {
		return answer3;
	}

	public void setAnswer3(String answer3) {
		this.answer3 = answer3;
	}

	public String getAnswer4() {
		return answer4;
	}

	public void setAnswer4(String answer4) {
		this.answer4 = answer4;
	}

	public int getProficiency() {
		return proficiency;
	}

	public void setProficiency(int proficiency) {
		this.proficiency = proficiency;
	}
}
