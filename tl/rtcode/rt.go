package rtcode

const (
	SUCCESS               int = 1
	PARAM_ERROR           int = 2
	PARAM_JSON_CANT_PARSE int = 3

	POST_NOT_FOUND int = 10

	POST_TAG_NOT_FOUND    int = 20
	CANT_DEL_PARENT_TAG   int = 21 // 无法删除拥有子标签的标签
	CANT_DEL_NO_EMPTY_TAG int = 22 // 无法删除非空标签

	SUMMARY_NOT_FOUND = 30 // 找不到SUMMARY

	NOT_FOUND_PRE_TASK      int = 100 // 找不到前置任务
	NOT_FOUND_STUDY_PROJECT int = 101 // 找不到学习计划

	NOT_FOUND_PROJECT_GROUP   int = 201 // 找不到目标项目组
	NOT_FOUND_PROJECT         int = 202 // 找不到目标项目
	NOT_FOUND_TASK            int = 203 // 找不到目标任务
	NOT_SAME_PROJECT_AND_TASK int = 204 // 任务和工程不符

	NOT_FOUND_TARGET_CATEGORY  int = 301 // 找不到目标类别
	NOT_FOUND_TARGET_QUESTION  int = 302 // 找不到目标问题
	CANT_DEL_NO_EMPTY_CATEGORY int = 303 // 无法删除非空类别

	NOT_FOUND_SPEC_PROJECT_SECTION int = 401 // 找不到目标项目部分

	NOT_FOUND_SPEC_PROJECT_GOAL int = 501 // 找不到项目的目标
)
