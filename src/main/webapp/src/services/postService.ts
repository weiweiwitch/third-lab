/// <reference path="../../typings/tsd.d.ts"/>

import { Inject, bind, Injectable } from 'angular2/core';
import { Http, Headers, Response } from 'angular2/http';

import 'rxjs/add/operator/map';

export class PostData {
	id: number = 0;
	parantId: number = 0;
	title: string = '';
	postText: string = '';
}

@Injectable()
export class PostService {

	hideOnEdit: boolean = false;

	allPosts = [];

	http: Http;
	baseUrl: string;

	constructor(@Inject(Http) http) {
		this.http = http;
		this.baseUrl = '/api/posts';
	}

	// 获取所有的文章
	findAllPosts() {
		this.http.get(this.baseUrl)
			.map((res: Response) => {
				console.log(res);
				return res.json();
			})
			.subscribe((posts: any) => {
				this.syncPostHideMark(posts);
				this.allPosts = posts;
			});
	}

	private syncPostHideMark(newPosts) {
		// 生成源节点的map
		let postMap: Map<number, any> = new Map<number, any>();
		this.genereatePostMap(this.allPosts, postMap);

		// 同步hide标记
		this.changeHideMark(newPosts, postMap);
	}

	private genereatePostMap(nodes: Array<any>, postMap: Map<number, any>): void {
		for (let idx in nodes) {
			let node = nodes[idx];
			postMap.set(node.id, node);
			if (node.nodes != null) {
				this.genereatePostMap(node.nodes, postMap);
			}
		}
	}

	private changeHideMark(newPosts, postMap: Map<number, any>) {
		for (let idx in newPosts) {
			let node = newPosts[idx];
			let id: number = node.id;
			let existNode = postMap.get(id);
			if (existNode != null) {
				node.hide = existNode.hide == null ? true : existNode.hide;
			} else {
				node.hide = true; // 设置为默认隐藏
			}
			if (node.nodes != null) {
				this.changeHideMark(node.nodes, postMap);
			}
		}
	}

	// 获取特定文章
	findSpecPosts(searchParam: string, successCb, exceptionCb) {
		let params = {
			postParam: searchParam
		};
		this.http.get('/api/whichpost' + this.json2Params(params))
			.map((res: Response) => res.json())
			.subscribe(posts => {
				//this.allPosts = posts;
				successCb(posts);
			});
	}

	getPost(id: string) {
		return this.http.get(this.baseUrl + '/' + id);
	}

	updatePost(post: PostData) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json;charset=UTF-8');
		return this.http.put(this.baseUrl + '/' + post.id, JSON.stringify(post), {
			headers: headers
		});
	}

	createPost(newPost: PostData) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json;charset=UTF-8');
		return this.http.post(this.baseUrl, JSON.stringify(newPost), {
			headers: headers
		});
	}

	deletePost(id: number) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json;charset=UTF-8');
		return this.http.delete(this.baseUrl + '/' + id, {
			headers: headers
		});
	}

	json2Params(data: any) {
		if (data === null || data.length === 0) {
			return '';
		}

		let urlParams: string = Object.keys(data).map(function (k) {
			return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
		}).join('&');

		return '?' + urlParams;
	}

}
