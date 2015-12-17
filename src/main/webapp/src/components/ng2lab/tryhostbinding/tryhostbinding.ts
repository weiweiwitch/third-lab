import {Component, Directive, HostBinding, HostListener,  Input, ContentChild, ContentChildren, ViewChild, Host, Inject, forwardRef} from 'angular2/core';
import {FORM_DIRECTIVES, NgModel } from 'angular2/common';

@Component({
	selector: 'embhostbind',
	template: '<div>sdfsdf</div>'
})
export class EmbHostBind {

	@ContentChild('mySingleContent') contentChild;
	@ContentChildren('myContent') contentChildren;

	constructor(@Host() @Inject(forwardRef(() => TryHostBind)) container: TryHostBind) {
		console.log(container);
	}

	afterContentInit() {
		// contentChild is set
		console.log('afterContentInit');
		console.log(this.contentChild);
		console.log(this.contentChildren);
	}

	//@HostBinding('class.active')
	//get valid() {
	//	return false;
	//}

	@HostBinding('attr.hostattr')
	get hostattr() {
		return 7;
	}

	@HostListener('click', ['$event'])
	onClick(e) {
		console.log('click event');
		console.log(e);
	}

	//checkValid() {
	//	console.log(this.valid);
	//}
}

@Component({
	selector: 'tryhostbind',
	template: `<div hostattr="num">
				<button (click)="showNum()"><span>aaa</span></button>
				<embhostbind #myView #myContent #mySingleContent class="active">
					<div #myContent></div>
					<div #myContent></div>
				</embhostbind>
			</div>`,
	directives: [FORM_DIRECTIVES, EmbHostBind],
	styles: ['.active {color: red}']
})
export class TryHostBind {

	// [class.active]="showMe"

	showMe: boolean = true;
	num: number = 6;

	@ViewChild('myView') myChildComponent;

	showNum() {
		console.log(this.num);

		console.log(this.myChildComponent);

	}

}

