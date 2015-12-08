/// <reference path="../../../../typings/tsd.d.ts"/>

import {Component, View} from 'angular2/angular2';
import {Http, Headers, Response} from 'angular2/http';

@Component({
	selector: 'tryhttp',
	templateUrl: 'components/ng2lab/tryhttp/tryhttp.html'
})
export class TryHttpCom {

	status: string = 'waiting';
	showTxt: string;

	localStorageText: string;

	constructor(private http: Http) {
		// 本地缓存存入数据
		localStorage.setItem('tryhttp', 'tryhttp');
	}

	showLocalStorage() {
		// 从本地缓存获取数据
		this.localStorageText = localStorage.getItem('tryhttp');
	}

	tryGet() {
		this.http.get('/test.html')
			.subscribe(
				(rt) => {
					console.log('successful');
					this.status = 'successful';

					console.log(rt);
					this.showTxt = rt.text();
				},
				() => {
					console.log('failed');
					this.status = 'failed';
				},
				() => {
					console.log('completed');
					this.status = 'completed';
				}
			);
	}

	tryPost() {
		// 下面只是演示了post的写法，实际并没有作用。
		var username = 'test';
		var password = '123456';

		var creds = "username=" + username + "&password=" + password;

		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		this.http.post('/sessions/create', creds, {
				headers: headers
			})
			.map((res: Response) => res.json())
			.subscribe(
				data => {
				},
				err => {
				},
				() => console.log('Authentication Complete')
			);
	}

}
