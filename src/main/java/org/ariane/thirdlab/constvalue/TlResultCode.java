package org.ariane.thirdlab.constvalue;

public interface TlResultCode {

	public static final int SUCCESS = 1;

	public static final int POST_NOT_FOUND = 10;

	public static final int NOT_FOUND_PRE_TASK = 100; // 找不到前置任务
	public static final int NOT_FOUND_STUDY_PROJECT = 101; // 找不到学习计划

	public static final int NOT_FOUND_PROJECT_GROUP = 201; // 找不到目标项目组
	public static final int NOT_FOUND_PROJECT = 202; // 找不到目标项目
	public static final int NOT_FOUND_TASK = 203; // 找不到目标任务
	public static final int NOT_SAME_PROJECT_AND_TASK = 204; // 任务和工程不符

	public static final int NOT_FOUND_TARGET_CATEGORY = 301; // 找不到目标类别
	public static final int NOT_FOUND_TARGET_QUESTION = 302; // 找不到目标问题
	public static final int CANT_DEL_NO_EMPTY_CATEGORY = 303; // 无法删除非空类别

	public static final int NOT_FOUND_SPEC_PROJECT_SECTION = 401; // 找不到目标项目部分

	public static final int NOT_FOUND_SPEC_PROJECT_GOAL = 501; // 找不到项目的目标
}
