import {EventEmitter} from 'angular2/angular2';

export class DyCellWrapCom {
	data: any;

	delRow = new EventEmitter<any>();
}