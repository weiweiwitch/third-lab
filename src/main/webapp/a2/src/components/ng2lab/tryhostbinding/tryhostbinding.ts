import {Component, Directive, HostBinding, HostListener, Input, Host, Inject, forwardRef} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";

@Directive({selector: 'div[counting]'})
class CountClicks {
	numberOfClicks = 0;

	@HostListener('click', ['$event.target'])
	onClick(btn) {
		console.log("button", btn, "number of clicks:", this.numberOfClicks++);
	}

	@HostBinding('attr.btnv')
	get btnValue() {
		return 27;
	}
}

@Component({
	selector: 'embhostbind',
	template: '<div btnv="17" counting (click)="checkValid($event)">sdfsdf</div>', // btnv会被指令修改为27
	directives: [CountClicks],
})
export class EmbHostBind {

	@Input('btnv') num2: number = 16;

	// @Host表示,当前注入的依赖的获取只截止到指令所在组件为止,不会再向上查找
	constructor(@Host() @Inject(forwardRef(() => TryHostBind)) container: TryHostBind) {
		console.log(container);
	}

	@HostBinding('attr.hostattr')
	get hostattr() {
		return 7;
	}

	// 当host触发了click事件,下面这个方法会被调用
	@HostListener('click', ['$event'])
	forClick(e) {
		console.log('host click event');
		console.log(e);
	}

	checkValid(event) {
		console.log('div click');
	}
}

@Component({
	selector: 'tryhostbind',
	template: require('./tryhostbinding.html'),
	directives: [FORM_DIRECTIVES, EmbHostBind, CountClicks],
	styles: ['.active {color: red}']
})
export class TryHostBind {

	showMe: boolean = true;
	num: number = 6;

	showNum() {
		console.log(this.num); // 这边永远输出6,因为HostBinding不会修改到里面
	}

	topClick() {
		console.log('点击了div');
	}

}

