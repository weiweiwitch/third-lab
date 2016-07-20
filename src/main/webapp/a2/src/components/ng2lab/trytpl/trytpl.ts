import {Component, Directive, ViewContainerRef, TemplateRef, Input} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";

@Directive({
	selector: '[mytpl]'
})
export class MyTplDir {

	// 注入了视图容器引用和模板引用
	constructor(private _viewContainer: ViewContainerRef, private _templateRef: TemplateRef) {
		console.log(this._templateRef);
	}

	@Input('mytpl')
	set mytpl(newCondition /* boolean */) {
		console.log('条件: ' + newCondition);

		let cd: boolean = newCondition % 20 >= 10 ? true : false;
		if (cd) {
			this._viewContainer.createEmbeddedView(this._templateRef);
		} else {
			this._viewContainer.clear();
		}
	}
}

@Component({
	selector: 'trytpl',
	template: require('./trytpl.html'),
	directives: [CORE_DIRECTIVES, MyTplDir]
})
export class TryTplCom {
	diffTime: number = 0;

	constructor() {
	}

	changeDiffTime() {
		this.diffTime += 10;
	}
}
