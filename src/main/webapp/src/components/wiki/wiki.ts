/// <reference path="../../../typings/tsd.d.ts"/>

import { Component, View, coreDirectives, LifecycleEvent } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, Router } from 'angular2/router';
import { FormBuilder, formDirectives, Control, ControlGroup, Validators } from 'angular2/angular2';
import { Http } from 'angular2/angular2';

import { TreeContainer } from '../../directives/knowledgetree';

import { WikiIndexCom } from '../wiki/wikiindex/wikiIndex';
import { WikiPostCom } from '../wiki/wikipost/wikiPost';
import { WikiEditCom } from '../wiki/wikiedit/wikiEdit';
import { WikiNewCom } from '../wiki/wikinew/wikiNew';

import { PostService } from '../../services/postService';

@Component({
  selector: 'wiki',
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  templateUrl: 'components/wiki/wiki.html',
  directives: [RouterOutlet, RouterLink, coreDirectives, TreeContainer, WikiIndexCom, WikiPostCom]
})
@RouteConfig([
  { path: '/wikiindex', as: 'wikiindex', component: WikiIndexCom },
  { path: '/wikipost/:id', as: 'wikipost', component: WikiPostCom },
  { path: '/wikiedit/:id', as: 'wikiedit', component: WikiEditCom },
  { path: '/wikinew/:parentid', as: 'wikinew', component: WikiNewCom },
])
export class WikiCom {

  constructor(private router: Router, private postService: PostService) {
  }
   
  onInit() {
    
  }

  selectSpecPost(event) {
    console.log(event);
    
    this.router.navigate('/wiki/wikipost/' + event.id);
  }
}