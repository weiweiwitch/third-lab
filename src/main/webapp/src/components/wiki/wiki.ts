/// <reference path="../../../typings/tsd.d.ts"/>

import { Component, View, CORE_DIRECTIVES, OnInit } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, Router, Route } from 'angular2/router';
import { FormBuilder, FORM_DIRECTIVES, Control, ControlGroup, Validators } from 'angular2/angular2';
import { Http } from 'angular2/http';

import { TreeContainer } from '../../directives/knowledgetree';

import { WikiIndexCom } from '../wiki/wikiindex/wikiIndex';
import { WikiPostCom } from '../wiki/wikipost/wikiPost';
import { WikiEditCom } from '../wiki/wikiedit/wikiEdit';
import { WikiNewCom } from '../wiki/wikinew/wikiNew';

import { PostService } from '../../services/postService';

@Component({
  selector: 'wiki'
})
@View({
  templateUrl: 'components/wiki/wiki.html',
  directives: [RouterOutlet, RouterLink, CORE_DIRECTIVES, TreeContainer, WikiIndexCom, WikiPostCom]
})
@RouteConfig([
  { path: '/wikiindex', as: 'wikiindex', component: WikiIndexCom },
  { path: '/wikipost/:id', as: 'wikipost', component: WikiPostCom },
  { path: '/wikiedit/:id', as: 'wikiedit', component: WikiEditCom },
  { path: '/wikinew/:parentid', as: 'wikinew', component: WikiNewCom }
])
export class WikiCom implements OnInit {

  constructor(private router: Router, private postService: PostService) {
  }

  onInit() {

  }

  selectSpecPost(event) {
    console.log(event);

    this.router.navigate('/wiki/wikipost/' + event.id);
  }
}
