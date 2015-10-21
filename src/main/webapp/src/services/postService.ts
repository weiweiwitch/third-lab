/// <reference path="../../typings/tsd.d.ts"/>

import { Inject, bind, Injectable } from 'angular2/angular2';
import { Http, Headers } from 'angular2/http';

export class PostData {
    id: number = 0;
    parantId: number = 0;
    title: string = '';
    postText: string = '';
}

@Injectable()
export class PostService {

    allPosts = [];

    http: Http;
    baseUrl: string;

    constructor( @Inject(Http) http) {
        this.http = http;
        this.baseUrl = '/api/posts';
    }

    // 获取所有的文章
    findAllPosts() {
        this.http.get(this.baseUrl)
            .map((res) => {
                console.log(res);
                return res.json();
            })
            .subscribe((posts) => {
                this.allPosts = posts;
            });
    }

    findSpecPosts(searchParam: string, successCb, exceptionCb) {
        let params = {
            postParam: searchParam
        }
        this.http.get('/api/whichpost' + this.json2Params(params))
            .map(res => res.json())
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

        let urlParams: string = Object.keys(data).map(function(k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }).join('&')

        return '?' + urlParams;
    }

}
