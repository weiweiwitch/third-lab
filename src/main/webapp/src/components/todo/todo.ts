/// <reference path="../../../typings/tsd.d.ts"/>

import { Component, View, coreDirectives, LifecycleEvent } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, Router } from 'angular2/router';
import { FormBuilder, formDirectives, Control, ControlGroup, Validators } from 'angular2/angular2';
import { Http } from 'angular2/angular2';

import { PostService } from '../../services/postService';

@Component({
  selector: 'todo',
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  templateUrl: 'components/todo/todo.html',
  directives: [RouterOutlet, RouterLink, coreDirectives]
})
// @RouteConfig([
//   { path: '/wikiindex', as: 'wikiindex', component: WikiIndexCom },
//   { path: '/wikipost/:id', as: 'wikipost', component: WikiPostCom },
//   { path: '/wikiedit/:id', as: 'wikiedit', component: WikiEditCom },
//   { path: '/wikinew/:parentid', as: 'wikinew', component: WikiNewCom },
// ])
export class TodoCom {

  constructor(private http: Http, public postService: PostService, public router: Router) {
  }
   
  onInit() {
    
  }

}
