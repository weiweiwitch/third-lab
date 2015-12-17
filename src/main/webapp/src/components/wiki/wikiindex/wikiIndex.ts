/// <reference path="../../../../typings/tsd.d.ts" />

import { Component, View, OnInit, OnDestroy } from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import { RouteConfig, RouterOutlet, RouterLink, Router } from 'angular2/router';

import { PostService } from '../../../services/postService';

@Component({
	selector: 'wikiindex'
})
@View({
	templateUrl: 'components/wiki/wikiindex/wikiIndex.html',
	directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class WikiIndexCom implements OnInit, OnDestroy {

	searchParam: string = '';
	posts = [];
	selectedPost = {
		id: 0,
		title: ''
	};

	constructor(private router: Router, private postService: PostService) {

	}

	ngOnInit() {
		console.log('wiki index init');
		this.postService.findAllPosts();
	}

	ngOnDestroy() {
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
			}, () => {
			})
	}

	selectTarget(post) {
		this.selectedPost = post;
	}

	transTo() {
		if (this.selectedPost.id === 0) {
			return;
		}

		this.router.navigate(['/Wiki/Wikipost', {id: this.selectedPost.id}]);
	}

}
