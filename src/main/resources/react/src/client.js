import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import {syncHistoryWithStore} from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ApiClient from './helpers/apiclient';
import createStore from './redux/create';
import getRoutes from './routes';

const _browserHostory = useScroll(() => browserHistory)();
const client = new ApiClient();
const store = createStore(_browserHostory, client, window.__data);
const history = syncHistoryWithStore(_browserHostory, store);

require('./app.scss');

injectTapEventPlugin();

export const styles = {
  codeStyle: {
    fontFamily: 'Monaco, Menlo, Consolas, monospace',
    fontSize: '12px'
  }
};

// 组件
const component = (
  <Router history={history}>
    {getRoutes(store)}
  </Router>
);

const dest = document.getElementById('content'); // 获取根元素
ReactDOM.render(
  <Provider store={store} key="provider">
    <MuiThemeProvider>
    {component}
    </MuiThemeProvider>
  </Provider>,
  dest
);
