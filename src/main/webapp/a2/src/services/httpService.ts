import {Response, Http, Headers} from "angular2/http";
import {Injectable} from "angular2/core";

@Injectable()
export class HttpService {

	private baseUrl: string;

	constructor(private http: Http) {
		this.http = http;
		this.baseUrl = '/api';
	}

	httpGet(url: string, params: any, successCb) {
		let paramUrl = this.json2Params(params);
		this.http.get(this.baseUrl + url + paramUrl)
			.map((res: Response) => {
				return res.json();
			})
			.subscribe((data: any) => {
				successCb(data);
			});
	}

	postStr(url: string, params: any, strData: any, successCb, exceptionCb) {

		let headers = new Headers();
		headers.append('Content-Type', 'application/json;charset=UTF-8');
		let paramUrl = this.json2Params(params);
		this.http.post(this.baseUrl + url + paramUrl, strData, {
				headers: headers
			})
			.map((res: Response) => res.json())
			.subscribe(posts => {
				successCb(posts);
			});
	}

	post(url: string, params: any, data: any, successCb, exceptionCb) {

		let headers = new Headers();
		headers.append('Content-Type', 'application/json;charset=UTF-8');
		let paramUrl = this.json2Params(params);
		this.http.post(this.baseUrl + url + paramUrl, JSON.stringify(data), {
				headers: headers
			})
			.map((res: Response) => res.json())
			.subscribe(posts => {
				successCb(posts);
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