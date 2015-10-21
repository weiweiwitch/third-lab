/// <reference path="../../../../typings/tsd.d.ts"/>

import { Component, View, CORE_DIRECTIVES } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, Router, Route } from 'angular2/router';

import { AddrService } from './addrservice';

@Component({
    selector: 'trydi',
    providers: [AddrService]
})
@View({
    templateUrl: 'components/ng2lab/trydi/trydi.html',
    directives: [CORE_DIRECTIVES]
})
export class TryDiCom {
    addr: string;

    constructor(private addrService: AddrService) {
        console.log(addrService);

        this.addr = this.addrService.getAddr();
    }

    showAddr() {

    }
}
