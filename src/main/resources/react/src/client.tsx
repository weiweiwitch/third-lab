import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, browserHistory} from "react-router";
import ApiClient from "./helpers/apiclient";
import myCreateStore from "./redux/create";
import getRoutes from "./routes";

require('./app.scss');

export const client = new ApiClient();

const store = myCreateStore();

export const styles = {
	codeStyle: {
		fontFamily: 'Monaco, Menlo, Consolas, monospace',
		fontSize: '12px'
	}
};

// 组件
const component = (
	<Router history={browserHistory}>
		{getRoutes()}
	</Router>
);

const dest = document.getElementById('content'); // 获取根元素
ReactDOM.render(
	<Provider store={store}>
		{component}
	</Provider>,
	dest
);
