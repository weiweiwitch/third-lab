package com.ariane.thirdlab.repositories

import com.ariane.thirdlab.domains.Summary
import org.springframework.data.repository.CrudRepository

interface SummaryRepository : CrudRepository<Summary, Long> {

    fun findFirstByOrderByIdAsc(): Summary?

}