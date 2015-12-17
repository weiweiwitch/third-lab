/// <reference path="../../typings/tsd.d.ts" />

import { Inject } from 'angular2/core';
import { PostService } from './postService';
import { TodoFactory, TodoStore } from './todoStore';

import {LocationStrategy, HashLocationStrategy, PathLocationStrategy} from 'angular2/router';

export var appServicesInjectables: Array<any> = [
	PostService,
	TodoStore,
	TodoFactory,
	PathLocationStrategy
];
