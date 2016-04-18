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
	forwardRef,
	
} from 'angular2/core';
import {FORM_DIRECTIVES, NgModel} from 'angular2/common';

@Component({
	selector: 'childembcontent',
	template: '<div>childembcontent</div>'
})
export class ChildEmbContent {

	constructor() {
	}

}

@Component({
	selector: 'embcontent',
	template: '<div>embcontent </div><ng-content select="childembcontent"></ng-content>',
	directives: [ChildEmbContent]
})
export class EmbContent {

	@ContentChildren(ChildEmbContent) contentChildren;

	constructor() {
	}

	ngAfterContentInit() {
		console.log('afterContentInit');

		console.log(this.contentChildren);
	}

}

@Component({
	selector: 'trycontentchild',
	template: require('./trycontentchild.html'),
	directives: [FORM_DIRECTIVES, EmbContent, ChildEmbContent] // 这边两个指令一个都不能少!否则@ContentChildren无法找到内嵌的content
})
export class TryContentChild {

}

