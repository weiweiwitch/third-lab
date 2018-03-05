package com.ariane.thirdlab.rtcode

val SUCCESS: Int = 1
val PARAM_ERROR: Int = 2
val PARAM_JSON_CANT_PARSE: Int = 3
val POST_NOT_FOUND: Int = 10
val POST_TAG_NOT_FOUND: Int = 20
val CANT_DEL_PARENT_TAG: Int = 21 // 无法删除拥有子标签的标签
val CANT_DEL_NO_EMPTY_TAG: Int = 22 // 无法删除非空标签
val SUMMARY_NOT_FOUND: Int = 30 // 找不到SUMMARY
val NOT_FOUND_PRE_TASK: Int = 100 // 找不到前置任务
val NOT_FOUND_STUDY_PROJECT: Int = 101 // 找不到学习计划
val NOT_FOUND_PROJECT_GROUP: Int = 201 // 找不到目标项目组
val NOT_FOUND_PROJECT: Int = 202 // 找不到目标项目
val NOT_FOUND_TASK: Int = 203 // 找不到目标任务
val NOT_SAME_PROJECT_AND_TASK: Int = 204 // 任务和工程不符
val NOT_FOUND_TARGET_CATEGORY: Int = 301 // 找不到目标类别
val NOT_FOUND_TARGET_QUESTION: Int = 302 // 找不到目标问题
val CANT_DEL_NO_EMPTY_CATEGORY: Int = 303 // 无法删除非空类别
val NOT_FOUND_SPEC_PROJECT_SECTION: Int = 401 // 找不到目标项目部分
val NOT_FOUND_SPEC_PROJECT_GOAL: Int = 501 // 找不到项目的目标