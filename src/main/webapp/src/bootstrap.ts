/// <reference path="../typings/tsd.d.ts"/>

import { bootstrap } from 'angular2/angular2';

import { routerInjectables } from 'angular2/router';
import { HTTP_BINDINGS } from 'http/http';
import { appServicesInjectables } from './services/services';

import { App } from './components/app';

bootstrap(App, [routerInjectables, HTTP_BINDINGS, appServicesInjectables]);
