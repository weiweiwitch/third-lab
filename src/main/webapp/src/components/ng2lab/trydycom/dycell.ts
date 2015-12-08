import {Component, DynamicComponentLoader, ElementRef, ComponentRef, OnInit, Input, Output, EventEmitter } from 'angular2/angular2';

@Component({
	selector: 'dycomcell',
	template: '<div #target-location></div>'
})
export class DyComponentCellCom implements OnInit {

	@Input() columnDef: any;
	@Input() data: any;

	@Output() delThisRow = new EventEmitter<any>();

	constructor(private dynamicComponentLoader: DynamicComponentLoader, private elementRef: ElementRef) {

	}

	ngOnInit() {
		this.dynamicComponentLoader.loadIntoLocation(this.columnDef.cellCom, this.elementRef, 'targetLocation')
			.then((comp: ComponentRef) => {
				comp.instance.data = this.data;
				comp.instance.delRow.toRx().subscribe(($event) => {
					this.delRow();
				});
			});
	}

	delRow() {
		console.log('trigger del row');
		this.delThisRow.next(this.data);

	}
}
