import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import ApiClient from "./helpers/apiclient";
import myCreateStore from "./redux/create";
import getRoutes from "./routes";

const client = new ApiClient();
const initialState = {};
const store = myCreateStore(browserHistory, client, initialState);
const history = syncHistoryWithStore(browserHistory, store);

require('./app.scss');

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
		{component}
	</Provider>,
	dest
);
