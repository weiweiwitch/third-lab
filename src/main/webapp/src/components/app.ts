/// <reference path="../../typings/tsd.d.ts"/>

import { Component, View, coreDirectives, LifecycleEvent } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, Router } from 'angular2/router';
import { FormBuilder, formDirectives, Control, ControlGroup, Validators } from 'angular2/angular2';
import { Http } from 'angular2/angular2';

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
  directives: [RouterOutlet, RouterLink, coreDirectives, TreeContainer]
})
@RouteConfig([
  { path: '/', redirectTo: '/wiki/wikiindex' },
  { path: '/wiki/...', as: 'wiki', component: WikiCom },
  { path: '/todo', as: 'todo', component: TodoCom }
])
export class App {

  constructor() {
    
  }

  onInit() {

  }

}
