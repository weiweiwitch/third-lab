/// <reference path="../../../../typings/tsd.d.ts"/>

import { Component, View, coreDirectives, ElementRef } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, Router, RouteParams } from 'angular2/router';
import { FormBuilder, formDirectives, Control, ControlGroup, Validators } from 'angular2/angular2';

import { PostData, PostService } from '../../../services/postService';

import * as marked from 'marked';

@Component({
  selector: 'wikiedit',
  lifeCycle: ['onInit']
})
@View({
  templateUrl: 'components/wiki/wikiedit/wikiedit.html',
  directives: [coreDirectives, formDirectives]
})
export class WikiEditCom {

  id: number;
  post: PostData = new PostData();

  constructor(routeParams: RouteParams, private router: Router, private postService: PostService) {
    this.id = routeParams.params['id'];
    
    // 使用传入的id加载post。
    this.postService.getPost(this.id)
      .toRx()
      .map(res => res.json())
      .subscribe(post => {
        console.log(post);

        this.post = post;
      });
  }

  onInit() {
  }
  
  // 保存更新
  update() {
    console.log(this.post);

    this.postService.updatePost(this.post)
      .toRx()
      .map(res => {
        let rt = res.json();
        console.log(rt);
      });
      
    // 切换到首页
    this.router.navigate('/wiki/wikipost/' + this.post.id);
  }
}
