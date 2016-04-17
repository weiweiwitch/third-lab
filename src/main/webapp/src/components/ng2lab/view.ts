import { Component } from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import { RouteConfig, RouterOutlet, RouterLink, Router, Route } from 'angular2/router';

import { TryQueryCom } from './tryquery/tryquery';
import { TryBindCom } from './trybind/trybind';
import { TryDiCom } from './trydi/trydi';
import { TryCdCom } from './trycoredirectives/trycd';
import { TryTimeoutCom } from './trytimeout/trytimeout';
import { TryTreeViewCom } from './trytreeview/trytreeview';
import { TryInputCom } from './tryinput/tryinput';
import { TryHttpCom } from './tryhttp/tryhttp';
import { TryPipeCom } from './trypipe/trypipe';
import { TryTplCom } from './trytpl/trytpl';
import { TryDyComponentCom } from './trydycom/trydycom';
import { TryHostBind } from './tryhostbinding/tryhostbinding';
import {TryLifeCom} from './trylife/trylife';
import {TryD3Com} from './tryd3/tryd3';

@Component({
	selector: 'tryview',
	template: require('./view.html'),
	directives: [RouterOutlet, RouterLink, CORE_DIRECTIVES]
})
@RouteConfig([
	{path: '/tryquery', name: 'TryQuery', component: TryQueryCom},
	{path: '/trybind', name: 'TryBind', component: TryBindCom},
	{path: '/trydi', name: 'TryDi', component: TryDiCom},
	{path: '/trycd', name: 'TryCd', component: TryCdCom},
	{path: '/trytimeout', name: 'TryTimeout', component: TryTimeoutCom},
	{path: '/trytreeview', name: 'TryTreeView', component: TryTreeViewCom},
	{path: '/tryinput', name: 'TryInput', component: TryInputCom},
	{path: '/tryhttp', name: 'TryHttp', component: TryHttpCom},
	{path: '/trypipe', name: 'TryPipe', component: TryPipeCom},
	{path: '/trytpl', name: 'TryTpl', component: TryTplCom},
	{path: '/trydycom', name: 'TryDyCom', component: TryDyComponentCom},
	{path: '/tryhostbind', name: 'TryHostBind', component: TryHostBind},
	{path: '/trylife', name: 'TryLife', component: TryLifeCom},
	{path: '/tryd3', name: 'TryD3', component: TryD3Com}
])
export class TryViewCom {

}
