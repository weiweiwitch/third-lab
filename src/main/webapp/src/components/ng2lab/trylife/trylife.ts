import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {OnDestroy} from "angular2/core";
import {AfterViewInit} from "angular2/core";
import {AfterViewChecked} from "angular2/core";
import {AfterContentInit} from "angular2/core";
import {AfterContentChecked} from "angular2/core";
import {DoCheck} from "angular2/core";
import {OnChanges} from "angular2/core";

@Component({
	selector: 'trylife',
	template: '<div><button class="btn btn-primary" (click)="addOne()">OK</button>{{num}}</div>'
})
export class TryLifeCom implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, DoCheck, OnChanges {
	ngOnChanges(changes: {}): any {
		console.log('on changes');
	}

	ngDoCheck(): any {
		console.log('do check');
	}

	num: number = 0;

	ngAfterContentInit(): any {
		console.log('on after content init');
	}

	ngAfterContentChecked(): any {
		console.log('on after content checked');
	}

	ngAfterViewInit(): any {
		console.log('on after view init');
	}

	ngAfterViewChecked(): any {
		console.log('on after view checked');
	}

	ngOnInit(): any {
		console.log('on init');
	}

	ngOnDestroy(): any {
		console.log('on destroy');
	}

	addOne() {
		console.log('add one');
		this.num++;
	}

	constructor() {
	}

}