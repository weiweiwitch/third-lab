/// <reference path="../../../typings/tsd.d.ts"/>

import { Component, View, CORE_DIRECTIVES } from 'angular2/angular2';
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

@Component({
	selector: 'tryview'
})
@View({
	templateUrl: 'components/ng2lab/view.html',
	directives: [RouterOutlet, RouterLink, CORE_DIRECTIVES, TryQueryCom]
})
@RouteConfig([
	{path: '/tryquery', as: 'TryQuery', component: TryQueryCom},
	{path: '/trybind', as: 'TryBind', component: TryBindCom},
	{path: '/trydi', as: 'TryDi', component: TryDiCom},
	{path: '/trycd', as: 'TryCd', component: TryCdCom},
	{path: '/trytimeout', as: 'TryTimeout', component: TryTimeoutCom},
	{path: '/trytreeview', as: 'TryTreeView', component: TryTreeViewCom},
	{path: '/tryinput', as: 'TryInput', component: TryInputCom},
	{path: '/tryhttp', as: 'TryHttp', component: TryHttpCom},
	{path: '/trypipe', as: 'TryPipe', component: TryPipeCom},
	{path: '/trytpl', as: 'TryTpl', component: TryTplCom},
	{path: '/trydycom', as: 'TryDyCom', component: TryDyComponentCom},
	{path: '/tryhostbind', as: 'TryHostBind', component: TryHostBind}
])
export class TryViewCom {

}
