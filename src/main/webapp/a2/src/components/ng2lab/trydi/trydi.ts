import { Component } from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import { RouteConfig, RouterOutlet, RouterLink, Router, Route } from 'angular2/router';

import { AddrService } from './addrservice';

@Component({
	selector: 'trydi',
	providers: [AddrService],
	template: require('./trydi.html'),
	directives: [CORE_DIRECTIVES]
})
export class TryDiCom {

	addr: string;

	// 下面在构造函数中注入了服务
	constructor(private addrService: AddrService) {
		console.log(addrService);

		// 从注入的服务中获取地址
		this.addr = this.addrService.getAddr();
	}

	showAddr() {

	}
}
