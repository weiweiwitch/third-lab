import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouteConfig, RouterOutlet, RouterLink, Router, Route} from 'angular2/router';

@Component({
	selector: 'trycd',
	template: require('./trycd.html'),
	directives: [CORE_DIRECTIVES]
})
export class TryCdCom {

	vvs: number[] = [];
	
	number1: number = 1;
	number2: number = 2;

	constructor() {
		// 构造一个提供给ngFor使用的数组
		for (var i = 0; i < 10; i++) {
			this.vvs.push(i);
		}
	}

	showAddr() {

	}
}
