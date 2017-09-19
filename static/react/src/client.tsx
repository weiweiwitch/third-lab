import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router} from "react-router";
import { BrowserRouter } from 'react-router-dom';
import ApiClient from "./helpers/apiclient";
import myCreateStore from "./redux/create";
import getRoutes from "./routes";
import history from './appHistory';

//import {} from "./app.scss";
require('./app.scss');

export const client = new ApiClient();

const store = myCreateStore();

export const styles = {
	codeStyle: {
		fontFamily: 'Monaco, Menlo, Consolas, monospace',
		fontSize: '12px',
	},
};

console.info('__webpack_public_path__ ', __webpack_public_path__);

// 组件
const component = (
	<BrowserRouter basename={__webpack_public_path__}>
		{getRoutes()}
	</BrowserRouter>
);

const dest = document.getElementById('content'); // 获取根元素
ReactDOM.render(
	<Provider store={store}>
		{component}
	</Provider>,
	dest,
);
