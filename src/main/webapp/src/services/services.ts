/// <reference path="../../typings/tsd.d.ts" />

import { bind, Inject } from 'angular2/angular2';
import { PostService } from './postService';
import { TodoFactory, TodoStore } from './todoStore';

import {LocationStrategy, HashLocationStrategy, PathLocationStrategy} from 'angular2/router';

export var appServicesInjectables: Array<any> = [
    bind(PostService).toClass(PostService),
    bind(TodoStore).toClass(TodoStore),
    bind(TodoFactory).toClass(TodoFactory),
    bind(LocationStrategy).toClass(PathLocationStrategy)
];
