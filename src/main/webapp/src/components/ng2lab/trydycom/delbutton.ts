import {Component, EventEmitter} from 'angular2/angular2';
import {DyCellWrapCom} from './dycellwrap';

@Component({
	selector: 'delbutton',
	template: '<button class="btn btn-default" (click)="delSelf($event)">DEL</button>'
})
export class DelButtonCom extends DyCellWrapCom {

	delSelf($event) {
		console.log('del this row ' + this.data.c1);

		this.delRow.next(this.data);
	}
}
