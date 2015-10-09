/// <reference path="../../../../typings/tsd.d.ts"/>

import { Component, View, CORE_DIRECTIVES, OnInit, ElementRef } from 'angular2/angular2';
import { RouteConfig, RouterOutlet, RouterLink, Router, RouteParams } from 'angular2/router';
import { FormBuilder, FORM_DIRECTIVES, Control, ControlGroup, Validators } from 'angular2/angular2';

import { PostData, PostService } from '../../../services/postService';
import { ShowError } from '../../../directives/showError';

import * as marked from 'marked';

@Component({
    selector: 'wikinew',
    viewBindings: [
        FormBuilder
    ]
})
@View({
    templateUrl: 'components/wiki/wikinew/wikiNew.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ShowError]
})
export class WikiNewCom implements OnInit {

    form: ControlGroup;
    post: PostData = new PostData();
    showMarkdown: boolean = true;
    postView: string = '';

    constructor(private routeParams: RouteParams, fb: FormBuilder, private router: Router, private postService: PostService) {
        let parentId = this.routeParams.params['parentid'];
        this.form = fb.group({
            'id': [0],
            'parantId': [parentId],
            'title': ['', Validators.compose([Validators.required, this.titleValidator])],
            'postText': ['', Validators.required],
        })
    }

    // 初始化
    onInit() {
    }

    // 是否显示markdown源
    showSource(): boolean {
        return this.showMarkdown;
    }

    // 切换视图
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

        let formValue = this.form.value;
        this.postView = marked(formValue.postText);
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
            .map(res => {
                let rt = res.json();
                console.log('create rt ' + rt);
            });

        // 切换到首页
        this.router.navigateByUrl('/');
    }

    isNew() {
        return true;
    }
}
