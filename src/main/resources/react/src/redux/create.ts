import {routerMiddleware} from "react-router-redux";
import {createStore, applyMiddleware} from "redux";
import clientMiddleware from "./middleware/clientMiddleware";
import reducer from "./modules/reducer"; // 得到reducer

// 创建store的方法
// data是最原始的state
export default function myCreateStore(history, client, data) {
  // 获取并合并出中间件
  const reduxRouterMiddleware = routerMiddleware(history);
  const client4Middleware = clientMiddleware(client);

  console.info('生产环境附加中间件');

  // 创建store, 这里绑定了reducer和原始state
  const store = createStore(reducer, data, applyMiddleware(client4Middleware, reduxRouterMiddleware));

  return store;
}

