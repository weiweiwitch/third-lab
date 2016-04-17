import { Component, Directive, ViewContainerRef, TemplateRef } from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import { RouteConfig, RouterOutlet, RouterLink, Router, Route } from 'angular2/router';

@Directive({
   selector: '[mytpl]',
   inputs: ['mytpl']
  })
export class MyTplDir {
    diffTime: number = 0;

    constructor(private _viewContainer: ViewContainerRef, private _templateRef: TemplateRef) {
        console.log(this._templateRef);
    }

    set mytpl(newCondition /* boolean */) {
        let d = new Date();
        this.diffTime = d.getTime() % 20;
        let cd: boolean = this.diffTime % 20 >= 10 ? true : false;
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
    addr: string;
    diffTime: number = 0;

    constructor() {
    }

    showAddr() {

    }
}
