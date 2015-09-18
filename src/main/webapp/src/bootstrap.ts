/// <reference path="../typings/tsd.d.ts"/>

import { bootstrap } from 'angular2/angular2';

import { ROUTER_BINDINGS } from 'angular2/router';
import { HTTP_BINDINGS } from 'angular2/http';
import { appServicesInjectables } from './services/services';

import { App } from './components/app';

bootstrap(App, [ROUTER_BINDINGS, HTTP_BINDINGS, appServicesInjectables]);
