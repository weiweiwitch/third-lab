import superagent from 'superagent';
import config from '../config';

// 方法类型
const methods = ['get', 'post', 'put', 'patch', 'del'];

// 构建URL
// 这边涉及到跨域的问题,所以需要借助dev服务器的代理做转发。
function formatUrl(path) {
  const adjuectedPath = path[0] !== '/' ? '/' + path : path;

  if (__SERVER__) {
    return 'http://' + config.apiHost + ':' + config.apiPort + adjuectedPath;
  }

  return adjuectedPath;
}

// 用于向API服务端发送请求的客户端
export default class ApiClient {

  constructor(req) {
    // 遍历每类method
    methods.forEach((method) =>
      this[method] = (path, {params, data} = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        // 设置参数
        if (params) {
          request.query(params);
        }

        // 设置cookie
        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        // 发送数据
        if (data) {
          request.send(data);
        }

        request.end((err, {body} = {}) => err ? reject(body || err) : resolve(body));
      }));
  }

  empty() {
  }
}
