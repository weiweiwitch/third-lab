/// <reference path="../../typings/tsd.d.ts" />

import { bind, Inject } from 'angular2/angular2';
import { HttpService } from './httpService';
import { PostService } from './postService';
import { TodoFactory, TodoStore } from './todoStore';

import {LocationStrategy, HashLocationStrategy, HTML5LocationStrategy} from 'angular2/router';

export var appServicesInjectables: Array<any> = [
  bind(HttpService).toClass(HttpService),
  bind(PostService).toClass(PostService),
  bind(TodoStore).toClass(TodoStore),
  bind(TodoFactory).toClass(TodoFactory),
  bind(LocationStrategy).toClass(HashLocationStrategy)
];
