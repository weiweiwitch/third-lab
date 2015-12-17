/// <reference path="../../typings/tsd.d.ts" />

import { Host, Component, View, EventEmitter } from 'angular2/core';
import {NgForm, CORE_DIRECTIVES} from 'angular2/common';

@Component({
	selector: 'show-error',
	properties: ['controlPath: control', 'errorTypes: errors'],
	template: `
    <span *ngIf="errorMessage !== null">{{errorMessage}}</span>
  `,
	directives: [CORE_DIRECTIVES]
})
export class ShowError {
	formDir;
	controlPath: string;
	errorTypes: Array<string>;

	constructor(@Host() formDir: NgForm) {
		this.formDir = formDir;
	}

	get errorMessage() {
		var c = this.formDir.form.find(this.controlPath);
		for (var i = 0; i < this.errorTypes.length; ++i) {
			if (c !== null && c.touched && c.hasError(this.errorTypes[i])) {
				return this._errorMessage(this.errorTypes[i]);
			}
		}
		return null;
	}

	_errorMessage(code) {
		var config = {'required': 'is required', 'tooShort': 'title too short'};
		return config[code];
	}
}
