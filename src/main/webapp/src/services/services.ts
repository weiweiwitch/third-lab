/// <reference path="../../typings/tsd.d.ts" />

import { bind, Inject } from 'angular2/angular2';
import { HttpService } from './httpService';
import { PostService } from './postService';

export var appServicesInjectables: Array<any> = [
  bind(HttpService).toClass(HttpService),
  bind(PostService).toClass(PostService)
];
