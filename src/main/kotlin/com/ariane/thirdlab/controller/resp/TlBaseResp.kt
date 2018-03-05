package com.ariane.thirdlab.controller.resp

class TlBaseResp<T>() {
    var rt: Int = 0
    var data: T? = null

    constructor(rt: Int): this() {
        this.rt = rt
    }
}