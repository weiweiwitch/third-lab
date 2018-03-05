package com.ariane.thirdlab.controller

import com.ariane.thirdlab.controller.resp.TlBaseResp
import com.ariane.thirdlab.domains.Post
import com.ariane.thirdlab.repositories.PostRepository
import com.ariane.thirdlab.repositories.PostTagRepository
import com.ariane.thirdlab.rtcode.POST_NOT_FOUND
import com.ariane.thirdlab.rtcode.POST_TAG_NOT_FOUND
import com.ariane.thirdlab.rtcode.SUCCESS
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.transaction.Transactional

val PREPARE: Int = 1 // 预备

@RestController
@RequestMapping("/api", produces = ["application/json"])
@Transactional
open class PostController() {

    @Autowired
    lateinit var postRepository: PostRepository

    @Autowired
    lateinit var postTagRepository: PostTagRepository

    @GetMapping("/posts")
    open fun findAll(): TlBaseResp<List<PostResp>> {
        val posts = postRepository.findAll()
        val postList = mutableListOf<PostResp>()
        for (post in posts) {
            val postResp = PostResp(post.id, post.title, post.parentId, post.status, post.tagId)
            postList.add(postResp)
        }

        val resp = TlBaseResp<List<PostResp>>(SUCCESS)
        resp.data = postList

        return resp
    }

    @GetMapping("/whichpost")
    open fun findByPostParam(@RequestParam postParam: String): TlBaseResp<PostPositionResp> {
        val param = postParam.trim()
        val posts = postRepository.findByTitleContaining(param)

        val postInfos = mutableListOf<PostInfoResp>()
        for (post in posts) {
            val postInfo = PostInfoResp(post.id, post.title)
            postInfos += postInfo
        }
        val postPositionResp = PostPositionResp(postInfos)

        val resp = TlBaseResp<PostPositionResp>(SUCCESS)
        resp.data = postPositionResp

        return resp
    }

    @GetMapping("/posts/{id}")
    open fun findSpecPost(@PathVariable id: Long): TlBaseResp<PostDetailResp?> {
        val postVal = postRepository.findById(id)
        if (!postVal.isPresent) {
            val resp = TlBaseResp<PostDetailResp?>(POST_NOT_FOUND)
            return resp
        }

        val post = postVal.get()
        val detail = PostDetailResp(
            id = post.id,
            title = post.title,
            postText = post.post,
            parentId = post.parentId,
            status = post.status,
            tagId = post.tagId
        )

        val resp = TlBaseResp<PostDetailResp?>(SUCCESS)
        resp.data = detail
        return resp
    }

    @GetMapping("/tags/{tagId}/posts")
    open fun findPostsOfSpecTag(@PathVariable tagId: Long): TlBaseResp<SpecTagPostsResp> {
        val posts = if (tagId != 0L) {
            postRepository.findByTagId(tagId)
        } else {
            postRepository.findByNoTags(0)
        }

        val postListResp = mutableListOf<TagPostResp>()
        for (post in posts) {
            val tagPostResp = TagPostResp(
                id = post.id,
                title = post.title,
                parentId = post.parentId,
                status = post.status
            )
            postListResp += tagPostResp
        }
        val specTagPostsResp = SpecTagPostsResp(
            tagId = tagId,
            posts = postListResp
        )

        val resp = TlBaseResp<SpecTagPostsResp>(SUCCESS)
        resp.data = specTagPostsResp
        return resp
    }

    @PostMapping("/posts")
    open fun addPost(@RequestBody post: AddPostReq): TlBaseResp<Int?> {
        val newPost = Post()
        newPost.parentId = post.parentId
        newPost.title = post.title
        newPost.post = post.postText
        newPost.createTime = Date()
        newPost.lastModifiedTime = Date()
        newPost.status = PREPARE
        newPost.noTags = 0
        newPost.tagId = 0

        postRepository.save(newPost)

        val resp = TlBaseResp<Int?>(SUCCESS)
        resp.data = 0

        return resp
    }

    @PostMapping("/posts/{id}")
    open fun updatePost(@PathVariable id: Long, @RequestBody req: UpdatePostReq): TlBaseResp<UpdatePostResp?> {
        val postVal = postRepository.findById(id)
        if (!postVal.isPresent) {
            return TlBaseResp<UpdatePostResp?>(POST_NOT_FOUND)
        }

        val post = postVal.get()
        post.parentId = req.parentId
        post.title = req.title
        post.post = req.postText
        post.lastModifiedTime = Date()

        val resp = TlBaseResp<UpdatePostResp?>(SUCCESS)
        resp.data = UpdatePostResp(post.id)
        return resp
    }

    @PutMapping("/posts/{id}/tags/{tagId}")
    open fun movePost2NewTag(@PathVariable id: Long, @PathVariable tagId: Long): TlBaseResp<Move2NewTagResp?> {
        if (tagId != 0L) {
            val postTag = postTagRepository.findById(tagId)
            if (!postTag.isPresent) {
                return TlBaseResp<Move2NewTagResp?>(POST_TAG_NOT_FOUND)
            }
        }

        val postVal = postRepository.findById(id)
        if (!postVal.isPresent) {
            return TlBaseResp<Move2NewTagResp?>(POST_NOT_FOUND)
        }

        val post = postVal.get()
        post.tagId = tagId

        val subPosts = mutableListOf<Post>()
        searchPostAndSubPosts(subPosts, post.id)
        for (eachPost in subPosts) {
            eachPost.tagId = tagId
        }

        val resp = TlBaseResp<Move2NewTagResp?>(SUCCESS)
        resp.data = Move2NewTagResp(
            id = post.id
        )
        return resp
    }

    private fun searchPostAndSubPosts(posts: MutableList<Post>, postId: Long) {
        val subPosts = postRepository.findByParentId(postId)
        posts.addAll(subPosts)
        for (post in subPosts) {
            searchPostAndSubPosts(posts, post.id)
        }
    }

    @DeleteMapping("/posts/{id}")
    open fun delPost(@PathVariable id: Long): TlBaseResp<Int?> {
        val postVal = postRepository.findById(id)
        if (!postVal.isPresent) {
            return TlBaseResp<Int?>(POST_NOT_FOUND)
        }

        val post = postVal.get()
        postRepository.delete(post)

        val resp = TlBaseResp<Int?>(SUCCESS)
        return resp
    }
}

data class PostResp(
    val id: Long,
    val title: String,
    val parentId: Long,
    val status: Int,
    val tagId: Long
)

data class PostInfoResp(val id: Long, val title: String)
data class PostPositionResp(val postInfos: List<PostInfoResp>)

data class PostDetailResp(
    val id: Long,
    val title: String,
    val postText: String,
    val parentId: Long,
    val status: Int,
    val tagId: Long
)

data class SpecTagPostsResp(val tagId: Long, val posts: List<TagPostResp>)
data class TagPostResp(val id: Long, val title: String, val parentId: Long, val status: Int)

data class AddPostReq(val parentId: Long, val title: String, val postText: String)

data class UpdatePostReq(val parentId: Long, val title: String, val postText: String)
data class UpdatePostResp(val id: Long)

data class Move2NewTagResp(val id: Long)