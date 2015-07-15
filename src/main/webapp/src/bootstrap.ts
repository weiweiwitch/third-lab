/// <reference path="../typings/tsd.d.ts"/>

import { bootstrap } from 'angular2/angular2';

import { routerInjectables } from 'angular2/router';
import { httpInjectables } from 'angular2/angular2';
import { appServicesInjectables } from './services/services';

import { App } from './components/app';

bootstrap(App, [routerInjectables, httpInjectables, appServicesInjectables]);
