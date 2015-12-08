/// <reference path="../../../../typings/tsd.d.ts"/>

import { Component, View, CORE_DIRECTIVES, OnInit } from 'angular2/angular2';
import { Http, Response } from 'angular2/http';
import { RouteConfig, RouterOutlet, RouterLink, Router, RouteParams } from 'angular2/router';
import { FormBuilder, FORM_DIRECTIVES, Control, ControlGroup, Validators } from 'angular2/angular2';
//import 'rxjs/operators/map';
// import * as hljs from 'highlight';

import { PostData, PostService } from '../../../services/postService';

import * as marked from 'marked';

@Component({
	selector: 'wikipost'
})
@View({
	templateUrl: 'components/wiki/wikipost/wikiPost.html',
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
						let afterhl = hljs.highlightAuto(code, [lang]).value;
						return afterhl;
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
		this.router.navigate(['/Wiki/Wikiedit', {id: this.post.id}]);
	}

	// 删除
	deletePost() {
		this.postService.deletePost(this.post.id).subscribe(() => {
			// 切换到首页
			this.router.navigateByUrl('/');
		});
	}

	// 创建子文章
	createSubPost() {
		console.log('createSubPost');

		this.router.navigate(['/Wiki/Wikinew', {parentid: this.post.id}]);
	}

	transToIndex() {
		// 切换到首页
		this.router.navigateByUrl('/');
	}
}
