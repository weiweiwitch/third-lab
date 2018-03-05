package com.ariane.thirdlab.controller

import com.ariane.thirdlab.controller.resp.TlBaseResp
import com.ariane.thirdlab.domains.Summary
import com.ariane.thirdlab.repositories.SummaryRepository
import com.ariane.thirdlab.rtcode.SUCCESS
import com.ariane.thirdlab.rtcode.SUMMARY_NOT_FOUND
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import javax.transaction.Transactional

@RestController
@RequestMapping("/api", produces = ["application/json"])
@Transactional
open class SummaryController() {

    @Autowired
    lateinit var summaryRepository: SummaryRepository

    data class SummaryResp(val id: Long, val summary: String)

    @GetMapping("/summary")
    open fun findSummary(): TlBaseResp<SummaryResp> {
        var summary = summaryRepository.findFirstByOrderByIdAsc()
        if (summary == null) {
            val newSummary = Summary()
            newSummary.summary = "## SUMMARY"
            summaryRepository.save(newSummary)
            summary = newSummary
        }

        val summaryResp = SummaryResp(summary.id, summary.summary)
        val resp = TlBaseResp<SummaryResp>(SUCCESS)
        resp.data = summaryResp
        return resp
    }

    data class UpdateSummaryReq(val summary: String)
    data class UpdateSummaryResp(val id: Long)

    @PutMapping("/summary")
    open fun updateSummary(@RequestBody req: UpdateSummaryReq): TlBaseResp<UpdateSummaryResp?> {
        val summary = summaryRepository.findFirstByOrderByIdAsc()
        if (summary == null) {
            return TlBaseResp<UpdateSummaryResp?>(SUMMARY_NOT_FOUND)
        }

        summary.summary = req.summary

        val resp = TlBaseResp<UpdateSummaryResp?>(SUCCESS)
        resp.data = UpdateSummaryResp(summary.id)
        return resp
    }
}