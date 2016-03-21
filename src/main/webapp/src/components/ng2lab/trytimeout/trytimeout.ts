/// <reference path="../../../../typings/tsd.d.ts"/>

import { Component } from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import { RouteConfig, RouterOutlet, RouterLink, Router, Route } from 'angular2/router';
import { InsertionSort } from './insertion-sort';

@Component({
	selector: 'trytimeout',
	templateUrl: 'components/ng2lab/trytimeout/trytimeout.html',
	directives: [CORE_DIRECTIVES, InsertionSort]
})
export class TryTimeoutCom {

}
