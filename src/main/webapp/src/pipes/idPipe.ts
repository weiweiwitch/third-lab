/// <reference path="../../typings/tsd.d.ts" />

import { Pipe } from 'angular2/core';

@Pipe({
	name: 'idp'
})
export class IdPipe {
	supports(obj) {
		return true;
	}

	onDestroy() {
	}

	transform(value, args = []) {
		return `${value}${value}`;
	}
}
