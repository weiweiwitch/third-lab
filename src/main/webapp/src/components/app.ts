/// <reference path="../../typings/tsd.d.ts"/>

import { Component, View, CORE_DIRECTIVES, LifecycleEvent } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, Router, Route } from 'angular2/router';
import { FormBuilder, FORM_DIRECTIVES, Control, ControlGroup, Validators } from 'angular2/angular2';
import { Http } from 'http/http';

import { TreeContainer } from '../directives/knowledgetree';

import { WikiCom } from './wiki/wiki';
import { TodoCom } from './todo/todo';

import { PostService } from '../services/postService';

@Component({
  selector: 'app',
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  templateUrl: 'components/app.html',
  directives: [RouterOutlet, RouterLink, CORE_DIRECTIVES, TreeContainer]
})

@RouteConfig([
  { path: '/', redirectTo: '/wiki/wikiindex' },
  { path: '/wiki/...', component: WikiCom, as: 'wiki' },
  { path: '/todo', component: TodoCom, as: 'todo' }
])
export class App {

  constructor() {

  }

  onInit() {

  }

}
