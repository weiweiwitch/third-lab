import {routerMiddleware} from 'react-router-redux';
import {
  createStore as _createStore,
  applyMiddleware,
  compose
} from 'redux';
import clientMiddleware from './middleware/clientMiddleware';

// 创建store的方法
// data是最原始的state
export default function createStore(history, client, data) {
  // 获取并合并出中间件
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [clientMiddleware(client), reduxRouterMiddleware];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    console.info('开发环境 附加中间件');

    const {persistState} = require('redux-devtools');
    const DevTools = require('../containers/devtools/devtools');

    // compose相当于装饰器,用于拼凑出最终的createStore方法。
    finalCreateStore = compose(
      applyMiddleware(...middleware), // 这边返回接收createStore作为参数的函数对象,执行后,返回createStore接口的修饰方法
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);

  } else {
    console.info('生产环境附加中间件');
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  // 得到reducer
  const reducer = require('./modules/reducer');

  // 创建store, 这里绑定了reducer和原始state
  const store = finalCreateStore(reducer, data);

  // 下面是热更新的触发配置
  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }

  return store;
}

