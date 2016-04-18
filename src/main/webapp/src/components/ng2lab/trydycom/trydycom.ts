import { Component } from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import { RouteConfig, RouterOutlet, RouterLink, Router, Route } from 'angular2/router';

import {DyComponentGridCom, DyGridOptions, DyGridItem} from './dygrid';
import {DelButtonCom} from './delbutton';

@Component({
	selector: 'trydycom',
	template: require('./trydycom.html'),
	directives: [CORE_DIRECTIVES, DyComponentGridCom]
})
export class TryDyComponentCom {
	gridOptions: DyGridOptions;

	constructor() {
		// 申明列
		this.gridOptions = new DyGridOptions();
		this.gridOptions.columns.push(new DyGridItem('c1', 'c1', null));
		this.gridOptions.columns.push(new DyGridItem('c2', 'c2', null));
		this.gridOptions.columns.push(new DyGridItem('c3', 'c3', null));
		this.gridOptions.columns.push(new DyGridItem('c4', 'c4', null));
		this.gridOptions.columns.push(new DyGridItem('删除', '', DelButtonCom));

		// 设置初始数据
		this.gridOptions.datas = [{
			c1: '1',
			c2: '2',
			c3: '3',
			c4: '4'
		}, {
			c1: '11',
			c2: '12',
			c3: '13',
			c4: '14'
		}, {
			c1: '21',
			c2: '22',
			c3: '23',
			c4: '24'
		}];
	}

	// 添加行
	addRow() {
		let time = new Date().getTime();
		this.gridOptions.datas.push({
			c1: time,
			c2: time,
			c3: time,
			c4: time
		});
	}

}
