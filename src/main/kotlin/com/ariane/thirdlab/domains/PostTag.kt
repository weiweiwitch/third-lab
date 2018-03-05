package com.ariane.thirdlab.domains

import java.io.Serializable
import javax.persistence.*

@Entity
class PostTag : Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    var id: Long = 0L

    @Version
    @Column(nullable = false, name = "v")
    var v: Long = 0

    @Column(nullable = false, length = 150)
    var tag: String = ""

    @Column(nullable = false)
    var parentTagId: Long = 0
}