/// <reference path="../../../../typings/tsd.d.ts" />

import { Component, View } from 'angular2/angular2';

import { PostService } from '../../../services/postService';

@Component({
	selector: 'wikiindex'
})
@View({
	templateUrl: 'components/wiki/wikiindex/wikiindex.html',
})
export class WikiIndexCom {
	
	constructor(private postService: PostService) {
		this.postService.findAllPosts();
	}
}
