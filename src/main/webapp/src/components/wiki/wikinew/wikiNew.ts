import { Component, OnInit, OnDestroy, ElementRef } from 'angular2/core';
import { RouteConfig, RouterOutlet, RouterLink, Router, RouteParams } from 'angular2/router';
import { FormBuilder, FORM_DIRECTIVES, CORE_DIRECTIVES, Control, ControlGroup, Validators } from 'angular2/common';
import {Response} from 'angular2/http';

import { PostData, PostService } from '../../../services/postService';
import { ShowError } from '../../../directives/showError';

import * as hljs from 'highlight.js';
import * as marked from 'marked';

var css = require('./wikiNew.scss');

@Component({
	selector: 'wikinew',
	viewBindings: [
		FormBuilder
	],
	template: require('./wikiNew.html'),
	directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ShowError]
})
export class WikiNewCom implements OnInit, OnDestroy {

	post: PostData = new PostData();

	postView: string = '';

	constructor(private routeParams: RouteParams, fb: FormBuilder, private router: Router, private postService: PostService) {
		let parentId = this.routeParams.params['parentid'];
		this.post.parantId = Number(parentId);
	}

	// 初始化
	ngOnInit() {
		console.log('wiki new init, parentId: ' + this.post.parantId);
		this.postService.hideOnEdit = true;
	}

	ngOnDestroy() {
		console.log('wiki new destroy');
		this.postService.hideOnEdit = false;
	}

	// 标题验证
	titleValidator(c: Control): Map<string, boolean> {
		if (c.value.length >= 2) {
			return null;
		}

		let rt: Map<string, boolean> = new Map<string, boolean>();
		rt['tooShort'] = true;
		return rt;
	}

	onChange() {
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

	// 保存更新
	create(event) {
		event.preventDefault();

		console.log('save new post');
		console.log(this.post);

		this.postService.createPost(this.post)
			.map((res: Response) => {
				let rt = res.json();
				console.log('create rt ' + rt);
			})
			.subscribe((data) => {
				// 切换到首页
				this.router.navigate(['/Wiki', 'Wikiindex']);
			});

	}

	cancel(event) {
		event.preventDefault();

		this.router.navigate(['/Wiki', 'Wikiindex']);
	}

	isNew() {
		return true;
	}
}
