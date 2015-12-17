/// <reference path="../../../../typings/tsd.d.ts"/>

import { Component, View, OnInit, OnDestroy, ElementRef } from 'angular2/core';
import { RouteConfig, RouterOutlet, RouterLink, Router, RouteParams } from 'angular2/router';
import { FormBuilder, FORM_DIRECTIVES, CORE_DIRECTIVES, Control, ControlGroup, Validators } from 'angular2/common';
import {Response} from 'angular2/http';

import { PostData, PostService } from '../../../services/postService';

import * as marked from 'marked';

@Component({
	selector: 'wikiedit'
})
@View({
	templateUrl: 'components/wiki/wikiedit/wikiEdit.html',
	directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class WikiEditCom implements OnInit, OnDestroy {

	id: string;
	post: PostData = new PostData();

	postView: string = '';

	constructor(routeParams: RouteParams, private router: Router, private postService: PostService) {
		this.id = routeParams.params['id'];

		// 使用传入的id加载post。
		this.postService.getPost(this.id)
			.map((res: Response) => res.json())
			.subscribe((post: any) => {
				console.log(post);

				this.post = post;

				this.render();
			});
	}

	ngOnInit() {
		console.log('wiki new destroy');


	}

	render() {
		// 渲染markdown
		marked.setOptions({
			highlight: (code, lang, callback) => {
				console.log('try hightlight ' + lang);
				let afterhl = hljs.highlightAuto(code, [lang]).value;
				return afterhl;
			}
		});

		this.postView = marked(this.post.postText);
	}


	ngOnDestroy() {
		console.log('wiki edit destroy');
	}

	onChange() {
		this.render();
	}

	// 保存更新
	update() {
		console.log(this.post);

		this.postService.updatePost(this.post)
			.map((res: Response) => {
				let rt = res.json();
				console.log(rt);

				return rt;
			})
			.subscribe((data) => {
				console.log('show save result');
				console.log(data);

				// 切换到指定页
				this.router.navigate(['/Wiki/Wikipost', {id: this.post.id}]);
			});

	}

	cancel() {
		this.router.navigate(['/Wiki/Wikipost', {id: this.post.id}]);
	}

}
