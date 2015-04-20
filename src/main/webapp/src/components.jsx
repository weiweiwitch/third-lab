'use strict';

var ReactBootstrap = require('react-bootstrap');
var Router = require('react-router');
var React = require('react');
var Reflux = require('reflux');
var marked = require('marked');

var titlesActions = require('./actions');
var titleStore = require('./stores');
var postActions = require('./postActions');
var postStore = require('./postStores');

var Navbar = ReactBootstrap.Navbar;
var Button = ReactBootstrap.Button;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var LabApp = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getHandlerKey: function () {
    var key = 'post-' + this.context.router.getCurrentParams().itemId;
    return key;
  },
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Navbar brand='My Lab'>

          </Navbar>
        </div>
        <div className="row">
          <div className="col-md-2">
            <LabTitleContainer />
          </div>
          <div className="col-md-10">
            <LabTestNav></LabTestNav>
            <RouteHandler key={this.getHandlerKey()} />
          </div>
        </div>
      </div>
    );
  }
});

var LabTitleContainer = React.createClass({
  render: function() {
    return (
      <div>
        <Button>添加新文章</Button>
        <div className="labtree-container">
          <LabTitleTree></LabTitleTree>
        </div>
      </div>
    );
  }
});

var LabTitleTree = React.createClass({
  mixins: [Reflux.connect(titleStore, 'titles')],
  componentDidMount: function() {
    titlesActions.titlesInit();
  },
  getInitialState: function() {
    return {
      titles: []
    }
  },
  handleClick: function() {
    console.log('dddddd');
  },
  render: function() {
    var treeThis = this;
    var titles = this.state.titles.map(function(item) {
      return (
        <li key={item.id} className="labtree-node" >
          <a className="labtree-node-text" >
              <Link to="content" params={{itemId: item.id}}>{item.title}</Link>
          </a>
        </li>
      );
    });
    return (
      <ul className="labtree-nodes">
        {titles}
      </ul>
    );
  }
});

var LabTestNav = React.createClass({
  render: function() {
    return (
      <div>
        <Button><Link to="edit">Edit</Link></Button>
        <li><Link to="index">Index</Link></li>
      </div>
    );
  }
});

var LabEdit = React.createClass({
  render: function() {
    return (
      <div>Edit</div>
    );
  }
});

var LabIndex = React.createClass({
  render: function() {
    return (
      <div>Index</div>
    );
  }
});

var LabContent = React.createClass({
  mixins: [Reflux.connect(postStore, 'post')],
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      post: {
        title: '',
        postText: '...'
      }
    };
  },
  componentDidMount: function() {
    var iid = this.context.router.getCurrentParams().itemId;
    console.log('did mount ' + iid);

    postActions.postFetch(iid);
  },
  render: function() {
    var iid = this.context.router.getCurrentParams().itemId;
    console.log('dd ' + iid);
    var rawMarkup = marked(this.state.post.postText);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="inner_topic_container">
            <div className="topic_header">
              <span className="topic_full_title">{this.state.post.title}</span>
            </div>

            <div className="inner_topic">
              <div className="markdown-text" dangerouslySetInnerHTML={{__html: rawMarkup}}></div>
            </div>

          </div>
        </div>
      </div>
    );
  }
});

var routes = (
  <Route name="index" path="/" handler={LabApp}>
    <Route name="edit" handler={LabEdit}></Route>
    <Route name="content" path="content/:itemId" handler={LabContent} />
    <DefaultRoute handler={LabIndex}/>
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById('appcontent'));
})
