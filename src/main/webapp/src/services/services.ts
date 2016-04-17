import { Inject } from 'angular2/core';
import { PostService } from './postService';
import { TodoFactory, TodoStore } from './todoStore';

export var appServicesInjectables: Array<any> = [
	PostService,
	TodoStore,
	TodoFactory
];
