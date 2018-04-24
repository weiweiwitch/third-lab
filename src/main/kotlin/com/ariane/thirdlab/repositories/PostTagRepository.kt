package com.ariane.thirdlab.repositories

import com.ariane.thirdlab.domains.PostTag
import org.springframework.data.repository.CrudRepository

interface PostTagRepository : CrudRepository<PostTag, Long> {

    fun findByParentTagId(parentTagId: Long): List<PostTag>

}