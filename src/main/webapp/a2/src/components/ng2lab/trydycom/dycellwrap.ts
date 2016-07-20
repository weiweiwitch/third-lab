import {EventEmitter} from 'angular2/core';

// 这个类是供其他动态组件继承用
export class DyCellWrapCom {
	data: any;

	delRow = new EventEmitter<any>();
}