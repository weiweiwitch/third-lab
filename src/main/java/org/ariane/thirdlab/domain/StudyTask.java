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
@Table(name = "studytask")
public class StudyTask implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2879173816762564070L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private long id;

	@Version
	@Column(name = "v")
	private long v;

	@Column(name = "taskName", nullable = false, length = 150)
	private String taskName; // 任务名
	
	@Column(name = "note", length = 256000)
	private String note; // 笔记

	@Column(name = "projectId")
	private long projectId; // 计划id

	@Column(name = "preTask")
	private long preTask; // 上一个任务，如果是第一个任务，那么这个值为0.

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

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public long getProjectId() {
		return projectId;
	}

	public void setProjectId(long projectId) {
		this.projectId = projectId;
	}

	public long getPreTask() {
		return preTask;
	}

	public void setPreTask(long preTask) {
		this.preTask = preTask;
	}

}
