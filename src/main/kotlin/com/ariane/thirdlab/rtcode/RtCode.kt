package com.ariane.thirdlab.rtcode

const val SUCCESS: Int = 1

const val POST_NOT_FOUND: Int = 10
const val POST_TAG_NOT_FOUND: Int = 20
const val CANT_DEL_PARENT_TAG: Int = 21 // 无法删除拥有子标签的标签
const val CANT_DEL_NO_EMPTY_TAG: Int = 22 // 无法删除非空标签
const val SUMMARY_NOT_FOUND: Int = 30 // 找不到SUMMARY