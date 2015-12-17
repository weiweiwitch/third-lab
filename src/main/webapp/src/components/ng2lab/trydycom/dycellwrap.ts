import {EventEmitter} from 'angular2/core';

export class DyCellWrapCom {
	data: any;

	delRow = new EventEmitter<any>();
}