package com.ariane.thirdlab.repositories

import com.ariane.thirdlab.domains.Post
import org.springframework.data.repository.CrudRepository

interface PostRepository : CrudRepository<Post, Long> {

    fun findByParentId(parentId: Long): Iterable<Post>

    fun findByTitleContaining(postParam: String): Iterable<Post>

    fun findByTagId(tagId: Long): List<Post>

    /**
     * 统计特定tag的文章数量
     */
    fun countByTagId(tagId: Long): Long

}