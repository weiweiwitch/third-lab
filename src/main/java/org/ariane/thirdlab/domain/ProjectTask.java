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

/**
 * 任务
 */
@Entity
@Table(name = "projecttask")
public class ProjectTask implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = -3652123869948287210L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private long id;

	@Version
	@Column(name = "v")
	private long v;

	@Column(name = "name", nullable = false, length = 150)
	private String name; // 任务名

	@Column(name = "note", nullable = false, length = 10000)
	private String note; // 备注

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "createTime", nullable = false)
	private Date createTime; // 创建时间

	@Column(name = "period", nullable = false)
	private int period; // 周期任务, 0:非周期, 1:周期

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "nextPeriodTime", nullable = false)
	private Date nextPeriodTime; // 下次到期时间

	@Column(name = "status", nullable = false)
	private int status; // 状态，0：未完成，1：完成

	@Column(name = "projectId", nullable = false)
	private long projectId; // 属于哪个项目

	@Column(name = "parentTask", nullable = false)
	private long parentTask; // 父任务,如果没有父任务,就为0

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

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public int getPeriod() {
		return period;
	}

	public void setPeriod(int period) {
		this.period = period;
	}

	public Date getNextPeriodTime() {
		return nextPeriodTime;
	}

	public void setNextPeriodTime(Date nextPeriodTime) {
		this.nextPeriodTime = nextPeriodTime;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public long getProjectId() {
		return projectId;
	}

	public void setProjectId(long projectId) {
		this.projectId = projectId;
	}

	public long getParentTask() {
		return parentTask;
	}

	public void setParentTask(long parentTask) {
		this.parentTask = parentTask;
	}

	public ProjectTask() {

	}

}
