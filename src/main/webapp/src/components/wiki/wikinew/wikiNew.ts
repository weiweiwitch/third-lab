/// <reference path="../../../../typings/tsd.d.ts"/>

import { Component, View, coreDirectives, LifecycleEvent, ElementRef } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, Router, RouteParams } from 'angular2/router';
import { FormBuilder, formDirectives, Control, ControlGroup, Validators } from 'angular2/angular2';

import { PostData, PostService } from '../../../services/postService';
import { ShowError } from '../../../directives/showError';

import * as marked from 'marked';

@Component({
  selector: 'wikinew',
  lifecycle: [LifecycleEvent.onInit],
  viewInjector: [
    FormBuilder
  ]
})
@View({
  templateUrl: 'components/wiki/wikinew/wikiNew.html',
  directives: [coreDirectives, formDirectives, ShowError]
})
export class WikiNewCom {

  form: ControlGroup;
  post: PostData = new PostData();

  constructor(private routeParams: RouteParams, fb: FormBuilder, private router: Router, private postService: PostService) {
    let parentId = this.routeParams.params['parentid'];
    this.form = fb.group({
      'id': [0],
      'parantId': [parentId],
      'title': ['', Validators.compose([Validators.required, this.titleValidator])],
      'postText': ['', Validators.required],
    })
  }

  onInit() {
  }

  titleValidator(c: Control): StringMap<string, boolean> {
    if (c.value.length >= 4) {
      return null;
    }

    return {
      'tooShort': true
    };
  }
  
  // 保存更新
  create(event) {
    event.preventDefault();

    console.log(this.post);

    let formValue = this.form.value;
    console.log(formValue);

    this.post.parantId = formValue.parantId;
    this.post.title = formValue.title;
    this.post.postText = formValue.postText;
    this.postService.createPost(this.post)
      .toRx()
      .map(res => {
        let rt = res.json();
        console.log('create rt ' + rt);
      });
      
    // 切换到首页
    this.router.navigate('/');
  }

  isNew() {
    return true;
  }
}
