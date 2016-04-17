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

	selValue: Control = new Control('');
	selModel: number;

	loginForm: ControlGroup;

	constructor() {
		this.sels.push({name: 'aaa', id: 1});
		this.sels.push({name: 'bbb', id: 2});
		this.sels.push({name: 'ccc', id: 3});

		this.loginForm = new ControlGroup({
			login: new Control(""),
			password: new Control("")
		});
	}

	resetInput() {
		this.inputText = 'reseted';
	}

	showSelect() {
		console.log(this.selValue);
		console.log(this.selModel);
	}

	showForm() {
		console.log(this.loginForm);
		console.log(this.loginForm.value);
	}
}
