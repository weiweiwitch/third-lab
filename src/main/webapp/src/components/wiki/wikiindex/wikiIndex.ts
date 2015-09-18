/// <reference path="../../../../typings/tsd.d.ts" />

import { Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES, OnDestroy } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, Router } from 'angular2/router';

import { Observable } from 'rx';

import { PostService } from '../../../services/postService';

@Component({
  selector: 'wikiindex'
})
@View({
  templateUrl: 'components/wiki/wikiindex/wikiIndex.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class WikiIndexCom implements OnDestroy {

  searchParam: string = '';
  posts = [];
  selectedPost = {
    id: 0,
    title: ''
  };

  constructor(private router: Router, private postService: PostService) {
    this.postService.findAllPosts();
  }

  onDestroy() {
    console.log('wiki index destroy');
  }

  search() {
    if (this.searchParam === '') {
      return;
    }

    this.postService.findSpecPosts(this.searchParam,
      (postData) => {
        console.log(postData);
        this.posts = postData.postInfos;
      }, () => { })
  }

  selectTarget(post) { this.selectedPost = post; }

  transTo() {
    if (this.selectedPost.id === 0) {
      return;
    }

    this.router.navigate('/wiki/wikipost/' + this.selectedPost.id);
  }

  test() {
    console.log('test');
    var array = [1, 2, 3, 4, 5];

    // Converts an array to an observable sequence
    var source = Observable.from(array);

    // Prints out each item
    var subscription = source.subscribe(
      x => console.log('onNext: %s', x),
      e => console.log('onError: %s', e),
      () => console.log('onCompleted'));
  }
}
