import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import {syncHistoryWithStore} from 'react-router-redux';

import ApiClient from './helpers/apiclient';
import createStore from './redux/create';
import getRoutes from './routes';

const _browserHostory = useScroll(() => browserHistory)();
const client = new ApiClient();
const store = createStore(_browserHostory, client, window.__data);
const history = syncHistoryWithStore(_browserHostory, store);

// 组件
const component = (
  <Router history={history}>
    {getRoutes(store)}
  </Router>
);

const dest = document.getElementById('content'); // 获取根元素
ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);
