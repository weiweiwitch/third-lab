package org.ariane.thirdlab.constvalue;

public interface TlResultCode {

	public static final int SUCCESS = 0;

	public static final int NOT_FOUND_PRE_TASK = 100; // 找不到前置任务
	public static final int NOT_FOUND_STUDY_PROJECT = 101; // 找不到学习计划

	public static final int NOT_FOUND_PROJECT_GROUP = 201; // 找不到目标项目组
	public static final int NOT_FOUND_PROJECT = 202; // 找不到目标项目
	public static final int NOT_FOUND_TASK = 203; // 找不到目标任务
	public static final int NOT_SAME_PROJECT_AND_TASK = 204; // 任务和工程不符
}
