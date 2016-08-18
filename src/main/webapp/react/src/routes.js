import React from 'react';
import {IndexRoute, Route} from 'react-router';
import App from 'containers/app/app';
import Wiki from 'containers/wiki/wiki';

export default (store) => {
  // 返回路由组件
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Wiki}/>
    </Route>
  );
};
