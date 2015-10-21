/// <reference path="../../../../typings/tsd.d.ts"/>

import { Component, View, CORE_DIRECTIVES, OnInit, ElementRef } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, Router, RouteParams } from 'angular2/router';
import { FormBuilder, FORM_DIRECTIVES, Control, ControlGroup, Validators } from 'angular2/angular2';

import { PostData, PostService } from '../../../services/postService';

import * as marked from 'marked';

@Component({
    selector: 'wikiedit'
})
@View({
    templateUrl: 'components/wiki/wikiedit/wikiEdit.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class WikiEditCom implements OnInit {

    id: string;
    post: PostData = new PostData();

    showMarkdown: boolean = true;
    postView: string = '';

    constructor(routeParams: RouteParams, private router: Router, private postService: PostService) {
        this.id = routeParams.params['id'];

        // 使用传入的id加载post。
        this.postService.getPost(this.id)
            .map(res => res.json())
            .subscribe(post => {
                console.log(post);

                this.post = post;
            });
    }

    onInit() {
    }

    // 是否显示markdown源
    showSource(): boolean {
        return this.showMarkdown;
    }

    switchView(change: boolean) {
        this.showMarkdown = change;
        if (this.showMarkdown) {
            return;
        }

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
    update() {
        console.log(this.post);

        this.postService.updatePost(this.post)
            .map(res => {
                let rt = res.json();
                console.log(rt);
            })
            .subscribe(() => {

            });

        // 切换到首页
        this.router.navigate(['/Wiki/Wikipost', { id: this.post.id }]);
    }
}
