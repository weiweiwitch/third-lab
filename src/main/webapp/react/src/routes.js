import React from 'react';
import {IndexRoute, Route} from 'react-router';
import App from 'containers/app/app';
import ShowIndex from 'containers/showindex/showindex';
import Wiki from 'containers/wiki/wiki';
import WikiIndex from 'containers/wikiindex/wikiindex';
import WikiNew from 'containers/wikinew/wikinew';
import WikiEdit from 'containers/wikiedit/wikiedit';
import WikiPost from 'containers/wikipost/wikipost';

export default (store) => {
  // 返回路由组件
  return (
    <Route path="/" component={App}>
      <IndexRoute component={ShowIndex}/>
      <Route path="wiki" component={Wiki}>
        <Route path="wikiindex" component={WikiIndex}/>
        <Route path="wikinew" component={WikiNew}/>
        <Route path="wikiedit" component={WikiEdit}/>
        <Route path="wikipost" component={WikiPost}/>
      </Route>
    </Route>
  );
};
