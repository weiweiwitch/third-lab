import * as superagent from "superagent";

// 方法类型
const methods = ['get', 'post', 'put', 'patch', 'del'];

// 构建URL
// 这边涉及到跨域的问题,所以需要借助dev服务器的代理做转发。
function formatUrl(path) {
	const adjuectedPath = path[0] !== '/' ? '/' + path : path;

	return adjuectedPath;
}

// 用于向API服务端发送请求的客户端
export default class ApiClient {

	constructor() {
	}

	post(path, r?: any) {
		const p = new Promise((resolve, reject) => {
			const url = formatUrl(path);
			const request = superagent['post'](url);

			// 设置参数
			if (r && r.params) {
				request.query(r.params);
			}

			// 发送数据
			if (r && r.data) {
				request.send(r.data);
			}

			request.end((err, response: any) => {
				err ? reject(response.body || err) : resolve(response.body)
			});
		});

		return p;
	}

	get(path, r?: any) {
		const p = new Promise((resolve, reject) => {
			const url = formatUrl(path);
			const request = superagent['get'](url);

			// 设置参数
			if (r && r.params) {
				request.query(r.params);
			}

			// 发送数据
			if (r && r.data) {
				request.send(r.data);
			}

			request.end((err, response: any) => {
				err ? reject(response.body || err) : resolve(response.body)
			});
		});

		return p;
	}

	put(path, r?: any) {
		const p = new Promise((resolve, reject) => {
			const url = formatUrl(path);
			const request = superagent['put'](url);

			// 设置参数
			if (r && r.params) {
				request.query(r.params);
			}

			// 发送数据
			if (r && r.data) {
				request.send(r.data);
			}

			request.end((err, response: any) => {
				err ? reject(response.body || err) : resolve(response.body)
			});
		});

		return p;
	}

	del(path, r?: any) {
		const p = new Promise((resolve, reject) => {
			const url = formatUrl(path);
			const request = superagent['del'](url);

			// 设置参数
			if (r && r.params) {
				request.query(r.params);
			}

			// 发送数据
			if (r && r.data) {
				request.send(r.data);
			}

			request.end((err, response: any) => {
				err ? reject(response.body || err) : resolve(response.body)
			});
		});

		return p;
	}

	empty() {
	}
}
