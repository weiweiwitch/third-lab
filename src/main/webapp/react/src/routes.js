import React from 'react';
import {IndexRoute, Route} from 'react-router';
import App from 'containers/app/app';
import ShowIndex from 'containers/showindex/showindex';
import Wiki from 'containers/wiki/wiki';
import WikiIndex from 'containers/wikiindex/wikiindex';
import WikiNew from 'containers/wikinew/wikinew';
import WikiEdit from 'containers/wikiedit/wikiedit';
import WikiPost from 'containers/wikipost/wikipost';
import Exam from 'containers/exam/exam';
import ExamSummary from 'containers/examsummary/examsummary';
import ExamQuestionList from 'containers/examquestionlist/examquestionlist';
import ExamQuestion from 'containers/examquestion/examquestion';
import ExamQuestionEdit from 'containers/examedit/examedit';
import ExamQuestionCreate from 'containers/examnew/examnew';

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
      <Route path="exam" component={Exam} >
        <Route path="examsummary" component={ExamSummary}/>
        <Route path="examquestionlist/:categoryId" component={ExamQuestionList}/>
        <Route path="examquestion/:categoryId/:questionId" component={ExamQuestion}/>
        <Route path="examquestionedit/:categoryId/:questionId" component={ExamQuestionEdit}/>
        <Route path="examquestionnew/:categoryId" component={ExamQuestionCreate}/>
      </Route>
    </Route>
  );
};
