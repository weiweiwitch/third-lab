package com.ariane.thirdlab.domains

import java.io.Serializable;
import java.util.*
import javax.persistence.*

@Entity
class Post() : Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    var id: Long = 0L

    @Version
    @Column(nullable = false, name = "v")
    var v: Long = 0

    @Column(nullable = false)
    var parentId: Long = 0

    @Column(nullable = false, length = 150)
    var title: String = ""

    @Column(nullable = false, length = 256000)
    var post: String = ""

    @Column(nullable = false)
    var createTime: Date = Date(0)

    @Column(nullable = false)
    var lastModifiedTime: Date = Date(0)

    @Column(nullable = false)
    var status: Int = 0

    @Column(nullable = false)
    var noTags: Int = 0

    @Column(nullable = false)
    var tagId: Long = 0
}