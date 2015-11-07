/// <reference path="../../typings/tsd.d.ts" />

import { Component, View, CORE_DIRECTIVES, OnChanges, EventEmitter, Input, Output } from 'angular2/angular2';

// 下面的3个指令用于建立tree控件！这类控件之前在angular1中很难实现！
@Component({
    selector: 'post-node',
    templateUrl: 'directives/postnode.html'
})
export class PostNode {
    @Input() node: any;

    @Output() clickpost: EventEmitter = new EventEmitter();
    @Output() showHide: EventEmitter = new EventEmitter();

    postStatusColor: string;

    constructor() {

    }

    postColor() {
        if (this.node.status == 1) {
            return 'red';
        } else if (this.node.status == 2) {
            return 'yellow';
        } else {
            return 'green';
        }
    }

    show(data) {
        console.log(data)
    }

    showOrHide() {
        this.node.hide = !this.node.hide;
        this.showHide.next(1);
    }

    clickSpecPost($event) {
        console.log($event);
        this.clickpost.next(this.node);
    }
}

@Component({
    selector: 'tree-container',
    templateUrl: 'directives/treec.html',
    directives: [PostNode, CORE_DIRECTIVES, TreeContainer]
})
export class TreeContainer implements OnChanges {
    @Input() itemTree: Array<any> = [];

    @Output() clickpost: EventEmitter = new EventEmitter();

    constructor() {

    }

    onChanges(changes) {
        this.itemTree = changes.itemTree.currentValue;
    }

    // 当点击特定post时，对外发布点击事件。
    clickSpecPost(event) {
        console.log(event);
        this.clickpost.next(event);
    }

    showOrHide(event) {
        console.log('触发某个post的展开或收缩');
    }
}
