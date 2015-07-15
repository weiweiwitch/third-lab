/// <reference path="../../typings/tsd.d.ts" />

import { Component, View, coreDirectives, onChange, EventEmitter } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, Router } from 'angular2/router';

// 下面的3个指令用于建立tree控件！这类控件之前在angular1中很难实现！
@Component({
  selector: 'post-node',
  properties: ['node:node'],
  events: ['clickpost']
})
@View({
  templateUrl: 'directives/postnode.html',
  directives: [RouterLink]
})
export class PostNode {
  node: any;

  clickpost: EventEmitter = new EventEmitter();

  constructor() {

  }

  show(data) {
    console.log(data)
  }

  showOrHide() {
    this.node.hide = !this.node.hide;
  }

  clickSpecPost($event) {
    console.log($event);
    this.clickpost.next(this.node);
  }
}

@Component({
  selector: 'tree-container',
  properties: ['itemTree:item-tree'],
  lifecycle: [onChange],
  events: ['clickpost']
})
@View({
  templateUrl: 'directives/treec.html',
  directives: [PostNode, coreDirectives]
})
export class TreeContainer {
  itemTree: List<any> = [];
  itemList: List<any> = [];

  clickpost: EventEmitter = new EventEmitter();

  constructor() {

  }

  // 转换tree到list
  trans(targetList, lv, parent) {
    let itemTree = parent.nodes;
    let nextLv = lv + 1;
    for (let itemIndex in itemTree) {
      let item = itemTree[itemIndex];
      item.hide = true;
      item.lv = lv;
      item.parent = parent;
      targetList.push(item);

      if (item.nodes !== undefined && item.nodes !== null && item.nodes.length > 0) {
        this.trans(targetList, nextLv, item);
      }
    }
  }

  needHide(node) {
    while (node.parent !== undefined) {
      let parentNode = node.parent;
      if (parentNode.hide === true) {
        return true;
      }
      node = parentNode;
    }
    return false;
  }

  onChange(changes) {
    console.log('onchange');
    console.log(changes);

    this.itemTree = changes.itemTree.currentValue;
    this.itemList = [];
    this.trans(this.itemList, 0, { hide: false, nodes: this.itemTree });
    console.log(this.itemList.length);
  }

  clickSpecPost(event) {
    console.log(event);
    this.clickpost.next(event);
  }
}
