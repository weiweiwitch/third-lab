import {ElementRef} from "angular2/core";
import {Component} from "angular2/core";
import {AfterViewInit} from "angular2/core";

import * as d3 from 'd3';

@Component({
	selector: 'tryd3',
	template: '<h2>D3演示</h2><div id="d3show">D3.js Integrated if background is yellow</div>',
	providers: [ElementRef]
})
export class TryD3Com implements AfterViewInit {
	elementRef: ElementRef;

	constructor(elementRef: ElementRef) {
		this.elementRef = elementRef;
	}

	ngAfterViewInit() {
		console.log("afterViewInit() called");
		//d3.select(this.elementRef.nativeElement).select("h1").style("background-color", "yellow");
		d3.select(this.elementRef.nativeElement).select("div#d3show")
			.append("svg").attr("width", 50).attr("height", 50)
			.append("circle").attr("cx", 25).attr("cy", 25).attr("r", 25)
			.style("fill", "purple");
	}
}