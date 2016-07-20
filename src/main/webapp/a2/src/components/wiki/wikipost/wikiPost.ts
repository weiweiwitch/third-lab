import {Component, OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {RouteConfig, RouterOutlet, RouterLink, Router, RouteParams} from 'angular2/router';
import {FormBuilder, FORM_DIRECTIVES, CORE_DIRECTIVES, Control, ControlGroup, Validators} from 'angular2/common';
import {PostData, PostService} from '../../../services/postService';

import * as hljs from 'highlight.js';
import * as marked from 'marked';

var css = require('./wikiPost.scss');

@Component({
	selector: 'wikipost',
	template: require('./wikiPost.html'),
	directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class WikiPostCom implements OnInit {

	id: string; // 传入的要显示的文章id。
	post: PostData = new PostData();
	postText: string = '';

	searchParam: string;

	constructor(routeParams: RouteParams, private router: Router, private postService: PostService) {
		this.id = routeParams.params["id"];

		// 使用传入的id加载post。
		this.postService.getPost(this.id)
			.map((res: Response) => res.json())
			.subscribe((post: any) => {
				this.post = post;

				marked.setOptions({
					highlight: (code, lang, callback) => {
						console.log('try hightlight ' + lang);
						return hljs.highlightAuto(code, [lang]).value;
					}
				});
				this.postText = marked(this.post.postText);
			});
	}

	ngOnInit() {

	}

	// 编辑
	edit() {
		// 切换到编辑页面
		this.router.navigate(['Wikiedit', {id: this.post.id}]);
	}

	// 删除
	deletePost() {
		this.postService.deletePost(this.post.id).subscribe(() => {
			// 切换到首页
			this.router.navigate(['/Wiki', 'Wikiindex']);
		});
	}

	// 创建子文章
	createSubPost() {
		this.router.navigate(['Wikinew', {parentid: this.post.id}]);
	}

	transToIndex() {
		// 切换到首页
		this.router.navigate(['/Wiki', 'Wikiindex']);
	}
}
