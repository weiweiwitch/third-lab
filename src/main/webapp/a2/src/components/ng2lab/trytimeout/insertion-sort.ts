import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import { Insertion } from './insertion';

@Component({
	selector: 'insertion-sort',
	providers: [Insertion], // 注入排序器
	template: require('./insertion-sort.html'),
	directives: [CORE_DIRECTIVES]
})
export class InsertionSort {

	list: ValList;

	constructor(private insertion: Insertion) {
		// 初始化列表
		this.list = new ValList();
		this.list.items = [
			new ListItem(5),
			new ListItem(33),
			new ListItem(5),
			new ListItem(5),
			new ListItem(2),
			new ListItem(-2),
			new ListItem(4),
			new ListItem(88),
			new ListItem(6),
			new ListItem(400),
			new ListItem(1),
			new ListItem(58),
			new ListItem(30)
		];

	}

	// 排序
	sortList() {
		this.insertion.sort(this.list)
	}
}

class ValList {
	items: Array<ListItem>;

	setCurrent(item) {
		this.clearAll();
		item.current = true;
	}

	clearAll() {
		this.items.forEach(i => i.current = false);
	}
}

class ListItem {
	val: Number;
	current: Boolean;

	constructor(val) {
		this.val = val;
		this.current = false;
	}

	getClass() {
		if (this.current) {
			return 'current-item';
		}
		return null;
	}
}
