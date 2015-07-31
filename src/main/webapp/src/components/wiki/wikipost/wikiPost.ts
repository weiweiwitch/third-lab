/// <reference path="../../../../typings/tsd.d.ts"/>

import { Component, View, coreDirectives, LifecycleEvent, Http } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, Router, RouteParams } from 'angular2/router';
import { FormBuilder, formDirectives, Control, ControlGroup, Validators } from 'angular2/angular2';
// import * as hljs from 'highlight';

import { HttpService } from '../../../services/httpService';
import { PostData, PostService } from '../../../services/postService';

import * as marked from 'marked';

@Component({
  selector: 'wikipost',
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  templateUrl: 'components/wiki/wikipost/wikiPost.html',
  directives: [coreDirectives, formDirectives]
})
export class WikiPostCom {

  id: number; // 传入的要显示的文章id。
  post: PostData = new PostData();
  postText: string = '';
  
  searchParam: string;

  constructor(routeParams: RouteParams, private router: Router, private postService: PostService) {
    this.id = routeParams.params["id"];

    // 使用传入的id加载post。
    this.postService.getPost(this.id)
      .toRx()
      .map(res => res.json())
      .subscribe(post => {
        this.post = post;
        marked.setOptions({
          highlight: (code, lang, callback) => {
            console.log('try hightlight ' + lang);
            let afterhl = hljs.highlightAuto(code, [lang]).value;
            return afterhl;
          }
        });
        this.postText = marked(this.post.postText);
      });
  }

  onInit() {

  }
  
  // 编辑
  edit() {
    // 切换到编辑页面
    this.router.navigate('/wiki/wikiedit/' + this.post.id);
  }
  
  // 删除
  delete() {
    this.postService.deletePost(this.post.id);
    
    // 切换到首页
    this.router.navigate('/');
  }
  
  // 创建子文章
  createSubPost() {
    console.log('createSubPost');

    this.router.navigate('/wiki/wikinew/' + this.post.id);
  }
  
  transToIndex() {
    this.router.navigate('/');
  }
}
