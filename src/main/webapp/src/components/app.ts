/// <reference path="../../typings/tsd.d.ts"/>

import { Component, View, CORE_DIRECTIVES, OnInit, Inject } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, Router, Route } from 'angular2/router';
import { FormBuilder, FORM_DIRECTIVES, Control, ControlGroup, Validators } from 'angular2/angular2';
import { Http } from 'angular2/http';

import { TreeContainer } from '../directives/knowledgetree';

import { WikiCom } from './wiki/wiki';
import { TodoCom } from './todo/todo';

import { PostService } from '../services/postService';

@Component({
  selector: 'app'
})
@View({
  templateUrl: 'components/app.html',
  directives: [RouterOutlet, RouterLink, CORE_DIRECTIVES, TreeContainer]
})
@RouteConfig([
  { path: '/', redirectTo: '/wiki/wikiindex' },
  { path: '/wiki/...', component: WikiCom, as: 'Wiki' },
  { path: '/todo', component: TodoCom, as: 'Todo' }
])
export class App implements OnInit {

  constructor() {

  }

  onInit() {

  }

}
