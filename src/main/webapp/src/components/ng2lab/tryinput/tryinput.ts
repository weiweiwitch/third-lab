import {Component } from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Control, ControlGroup} from 'angular2/common';

@Component({
	selector: 'tryinput',
	template: require('./tryinput.html'),
	directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class TryInputCom {
	inputText: string;
	inputRadio: string;

	sels: Array<any> = [];

	selModel: number;

	user: string;
	password: string;

	constructor() {
		this.sels.push({name: 'aaa', id: 1});
		this.sels.push({name: 'bbb', id: 2});
		this.sels.push({name: 'ccc', id: 3});
	}

	resetInput() {
		this.inputText = 'reseted';
	}

	showSelect() {
		console.log(this.selModel);
	}

	showForm() {
		console.log(this.user);
		console.log(this.password);
	}
}
