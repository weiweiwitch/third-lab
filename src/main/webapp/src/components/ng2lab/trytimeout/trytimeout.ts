/// <reference path="../../../../typings/tsd.d.ts"/>

import { Component, View, CORE_DIRECTIVES } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, Router, Route } from 'angular2/router';
import { InsertionSort } from './insertion-sort';

@Component({
    selector: 'trytimeout'
})
@View({
    templateUrl: 'components/ng2lab/trytimeout/trytimeout.html',
    directives: [CORE_DIRECTIVES, InsertionSort]
})
export class TryTimeoutCom {

}
