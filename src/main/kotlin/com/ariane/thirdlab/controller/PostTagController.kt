package com.ariane.thirdlab.controller

import com.ariane.thirdlab.controller.resp.TlBaseResp
import com.ariane.thirdlab.domains.PostTag
import com.ariane.thirdlab.repositories.PostRepository
import com.ariane.thirdlab.repositories.PostTagRepository
import com.ariane.thirdlab.rtcode.CANT_DEL_NO_EMPTY_TAG
import com.ariane.thirdlab.rtcode.CANT_DEL_PARENT_TAG
import com.ariane.thirdlab.rtcode.POST_TAG_NOT_FOUND
import com.ariane.thirdlab.rtcode.SUCCESS
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.transaction.Transactional

@RestController
@RequestMapping("/api", produces = ["application/json"])
@Transactional
open class PostTagController() {

    @Autowired
    lateinit var postRepository: PostRepository

    @Autowired
    lateinit var postTagRepository: PostTagRepository

    data class PostTagResp(
        val id: Long,
        val tagName: String,
        val num: Int,
        val parentTagId: Long,
        val nodes: MutableList<PostTagResp>
    )

    data class PostTagContainer(
        val tree: List<PostTagResp>,
        val list: List<PostTagResp>
    )

    @GetMapping("tags")
    open fun findAllTags(): TlBaseResp<PostTagContainer> {
        val postTags = postTagRepository.findAll()

        // 建立临时表
        val tmpList = mutableListOf<PostTagResp>()
        val tmpMap = mutableMapOf<Long, PostTagResp>()
        for (eachPostTag in postTags) {
            val postTagResp = PostTagResp(
                eachPostTag.id,
                eachPostTag.tag,
                0,
                eachPostTag.parentTagId,
                mutableListOf<PostTagResp>()
            )
            tmpList += postTagResp
            tmpMap[eachPostTag.id] = postTagResp
        }

        // 整理出根元素
        val rootList = mutableListOf<PostTagResp>()
        for (eachResp in tmpList) {
            if (eachResp.parentTagId == 0L) {
                rootList += eachResp
            } else {
                val parentTagResp = tmpMap[eachResp.parentTagId]
                if (parentTagResp != null) {
                    parentTagResp.nodes += eachResp
                } else {
                    rootList += eachResp
                }
            }
        }

        // 对最上层排序
        rootList.sortByDescending {
            it.tagName
        }

        val container = PostTagContainer(rootList, tmpList)
        val resp = TlBaseResp<PostTagContainer>(SUCCESS)
        resp.data = container
        return resp
    }

    data class AddTagReq(val parentTagId: Long, val name: String)

    @PostMapping("/tags")
    open fun addPostTag(@RequestBody req: AddTagReq): TlBaseResp<Int?> {
        val parentTagId = req.parentTagId
        if (parentTagId != 0L) {
            val parentTagVal = postTagRepository.findById(parentTagId)
            if (!parentTagVal.isPresent) {
                return TlBaseResp<Int?>(POST_TAG_NOT_FOUND)
            }
        }

        // 创建新标签
        val postTag = PostTag()
        postTag.tag = req.name
        postTag.parentTagId = req.parentTagId
        postTagRepository.save(postTag)

        // 将只属于父标签的文章迁移到子标签下
        if (parentTagId != 0L) {
            val newTagId = postTag.id
            val postTagsOwnedByParent = postRepository.findByTagId(parentTagId)
            for (eachPostTag in postTagsOwnedByParent) {
                eachPostTag.tagId = newTagId
            }
        }

        val resp = TlBaseResp<Int?>(SUCCESS)
        return resp
    }

    data class UpdateTagReq(val parentTagId: Long, val name: String)
    data class UpdateTagResp(val id: Long)

    @PutMapping("/tags/{id}")
    open fun updateTag(@PathVariable id: Long, @RequestBody req: UpdateTagReq): TlBaseResp<UpdateTagResp?> {
        val tagVal = postTagRepository.findById(id)
        if (!tagVal.isPresent) {
            return TlBaseResp<UpdateTagResp?>(POST_TAG_NOT_FOUND)
        }

        val tag = tagVal.get()
        tag.parentTagId = req.parentTagId
        tag.tag = req.name

        val resp = TlBaseResp<UpdateTagResp?>(SUCCESS)
        resp.data = UpdateTagResp(tag.id)
        return resp
    }

    @DeleteMapping("/tags/{id}")
    open fun delTag(@PathVariable id: Long): TlBaseResp<Int?> {
        val postTagVal = postTagRepository.findById(id)
        if (!postTagVal.isPresent) {
            return TlBaseResp<Int?>(POST_TAG_NOT_FOUND)
        }

        val subTags = postTagRepository.findByParentTagId(id)
        if (subTags.size > 0) {
            return TlBaseResp<Int?>(CANT_DEL_PARENT_TAG)
        }

        val posts = postRepository.findByTagId(id)
        if (posts.size > 0) {
            return TlBaseResp<Int?>(CANT_DEL_NO_EMPTY_TAG)
        }

        val postTag = postTagVal.get()
        postTagRepository.delete(postTag)

        return TlBaseResp<Int?>(SUCCESS)
    }
}