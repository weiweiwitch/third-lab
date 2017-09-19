import * as React from "react";
import {Route} from "react-router";
import App from "./containers/app/app";

export default (): any => {
	// 返回路由组件
	return (
		<Route path={'/'} component={App}>
		</Route>
	);
};
