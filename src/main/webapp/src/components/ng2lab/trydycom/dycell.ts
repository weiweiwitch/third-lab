import {Component, DynamicComponentLoader, ElementRef, ComponentRef, OnInit, Input, Output, EventEmitter } from 'angular2/core';

@Component({
	selector: 'dycomcell',
	template: '<div #targetLocation></div>'
})
export class DyComponentCellCom implements OnInit {

	@Input() columnDef: any; // 注入的列定义
	@Input() data: any; // 注入的数据

	@Output() delThisRow = new EventEmitter<any>(); // 对外的删除事件

	// 注入的动态组件加载和元素引用
	constructor(private dynamicComponentLoader: DynamicComponentLoader, private elementRef: ElementRef) {

	}

	ngOnInit() {
		// 动态加载this.columnDef.cellCom类型的组件
		this.dynamicComponentLoader.loadIntoLocation(this.columnDef.cellCom, this.elementRef, 'targetLocation')
			.then((comp: ComponentRef) => {
				// 绑定数据到组件实例
				comp.instance.data = this.data;

				// 加载的动态组件订阅删除事件,事件触发后,调用当前单元组件的删除方法
				comp.instance.delRow.subscribe(($event) => {
					this.delRow();
				});
			});
	}

	delRow() {
		console.log('trigger del row');

		// 这里进一步触发删除行的事件
		this.delThisRow.emit(this.data);

	}
}
