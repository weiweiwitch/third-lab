import {Component, Directive, HostBinding, HostListener, FORM_DIRECTIVES, NgModel, Input, ContentChild, ContentChildren, ViewChild, Host, Inject, forwardRef} from 'angular2/angular2';

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
				<embhostbind #my-view #my-content #my-single-content class="active">
					<div #my-content></div>
					<div #my-content></div>
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

