import {Component, EventEmitter} from 'angular2/core';
import {DyCellWrapCom} from './dycellwrap';

/**
 * 删除按钮
 */
@Component({
	selector: 'delbutton',
	template: '<button class="btn btn-default" (click)="delSelf($event)">DEL</button>'
})
export class DelButtonCom extends DyCellWrapCom {

	delSelf($event) {
		console.log('del this row ' + this.data.c1);

		this.delRow.emit(this.data);
	}
}
