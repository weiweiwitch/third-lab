/// <reference path="../typings/tsd.d.ts"/>
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import { provide } from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import { ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT, APP_BASE_HREF } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { appServicesInjectables } from './services/services';

import {LocationStrategy, HashLocationStrategy, PathLocationStrategy} from 'angular2/router';

import { App } from './components/app';

bootstrap(App, [
		ROUTER_PROVIDERS,
		provide(LocationStrategy,
			{useClass: PathLocationStrategy}),
		HTTP_PROVIDERS,
		appServicesInjectables
	]
);
