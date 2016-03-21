/// <reference path="../../typings/tsd.d.ts"/>

import { Component, OnInit, Inject } from 'angular2/core';
import { RouteConfig, RouterOutlet, RouterLink, Router, Route } from 'angular2/router';
import { FormBuilder, CORE_DIRECTIVES, FORM_DIRECTIVES, Control, ControlGroup, Validators } from 'angular2/common';
import { Http } from 'angular2/http';

import { TreeContainer } from '../directives/knowledgetree';

import { WikiCom } from './wiki/wiki';
import { TodoCom } from './todo/todo';
import { TryViewCom } from './ng2lab/view';

import { PostService } from '../services/postService';

@Component({
    selector: 'app',
    templateUrl: 'components/app.html',
    directives: [RouterOutlet, RouterLink, CORE_DIRECTIVES, TreeContainer]
})
@RouteConfig([
    { path: '/', redirectTo: ['/Wiki/Wikiindex'] },
    { path: '/wiki/...', component: WikiCom, name: 'Wiki' },
    { path: '/todo', component: TodoCom, name: 'Todo' },
    { path: '/try/...', component: TryViewCom, name: 'TryView' }
])
export class App implements OnInit {

    constructor() {
        console.log('ssss');
    }

    ngOnInit() {

    }

}
