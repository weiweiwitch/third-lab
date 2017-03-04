import * as React from "react";
import {IndexRoute, Route} from "react-router";
import App from "./containers/app/app";
import ShowIndex from "./containers/showindex/showindex";
import Wiki from "./containers/wiki/wiki";
import WikiIndex from "./containers/wikiindex/wikiindex";
import WikiNew from "./containers/wikinew/wikinew";
import WikiEdit from "./containers/wikiedit/wikiedit";
import WikiPost from "./containers/wikipost/wikipost";

import Solution from './containers/solution/solution';
import SolutionIndex from './containers/solutionindex/solutionindex';

export default (store) => {
  // 返回路由组件
  return (
    <Route path="/" component={App}>
      <IndexRoute component={ShowIndex}/>
      <Route path="wiki" component={Wiki}>
        <Route path="wikiindex" component={WikiIndex}/>
        <Route path="wikinew/:parentId" component={WikiNew}/>
        <Route path="wikiedit" component={WikiEdit}/>
        <Route path="wikipost/:pId" component={WikiPost}/>
      </Route>
      <Route path="solution" component={Solution}>
        <Route path="solutionindex" component={SolutionIndex}></Route>
      </Route>
    </Route>
  );
};
