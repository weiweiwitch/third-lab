import {Component, Input, CORE_DIRECTIVES} from 'angular2/angular2';

import {DyComponentCellCom} from './dycell';

export class DyGridItem {
	columnName: string; // 列名
	data: string; // 数据属性名
	cellCom: any; // 动态组件类型

	constructor(columnName: string, data: string, cellCom: any) {
		this.columnName = columnName;
		this.data = data;
		this.cellCom = cellCom;
	}
}

export class DyGridOptions {
	datas: any; // 数据
	columns: Array<DyGridItem> = []; // 列定义
}

@Component({
	selector: 'dycomgrid',
	templateUrl: 'components/ng2lab/trydycom/dygrid.html',
	directives: [CORE_DIRECTIVES, DyComponentCellCom]
})
export class DyComponentGridCom {

	@Input() options: DyGridOptions;

	constructor() {

	}

	delRow($event) {
		let selectedIndex = -1;
		let index = 0;
		this.options.datas.forEach((data) => {
			if ($event === data) {
				selectedIndex = index;
			}
			index++;
		});
		if (selectedIndex !== -1) {
			this.options.datas.splice(selectedIndex, 1);
		}
	}
}