import {
	Component,
	Directive,
	HostBinding,
	HostListener,
	Input,
	ContentChild,
	ContentChildren,
	ViewChild,
	Host,
	Inject,
	forwardRef
} from 'angular2/core';
import {FORM_DIRECTIVES, NgModel} from 'angular2/common';

@Component({
	selector: 'embview',
	template: '<div>sdfsdf</div>'
})
export class EmbView {

	constructor() {
	}

}

@Component({
	selector: 'tryviewchild',
	template: require('./tryviewchild.html'),
	directives: [FORM_DIRECTIVES, EmbView]
})
export class TryViewChild {

	// 绑定子视图
	@ViewChild(EmbView) myChildComponent; // 自己模板中的是ViewChild, Host模板中的是ContentChild

	showNum() {
		// 显示myView指定的子视图
		console.log(this.myChildComponent);
	}

	topClick() {
		console.log('点击了div');
	}

}

