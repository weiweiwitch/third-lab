/// <reference path="../typings/tsd.d.ts"/>

import { bootstrap, provide } from 'angular2/angular2';

import { ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { appServicesInjectables } from './services/services';

import { App } from './components/app';

bootstrap(App, [ROUTER_PROVIDERS,
	HTTP_PROVIDERS,
	appServicesInjectables]);
