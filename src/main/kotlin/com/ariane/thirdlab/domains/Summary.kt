package com.ariane.thirdlab.domains

import javax.persistence.*

@Entity
class Summary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    var id: Long = 0L

    @Version
    @Column(nullable = false, name = "v")
    var v: Long = 0

    @Column(nullable = false, length = 256000)
    var summary: String = ""

}