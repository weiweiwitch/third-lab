/// <reference path="../typings/tsd.d.ts"/>

import { provide } from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import { ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { appServicesInjectables } from './services/services';

import { App } from './components/app';

bootstrap(App, [ROUTER_PROVIDERS,
	HTTP_PROVIDERS,
	appServicesInjectables]);
