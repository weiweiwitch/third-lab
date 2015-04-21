'use strict';

var ReactBootstrap = require('react-bootstrap');
var Router = require('react-router');
var React = require('react');
var Reflux = require('reflux');
var marked = require('marked');

var titlesActions = require('./titlesActions');
var titleStore = require('./titlesStores');

var postActions = require('./postActions');
var postStore = require('./postStores');

var AceEditor = require('./editor');

var Navbar = ReactBootstrap.Navbar;
var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;
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
            <RouteHandler  />
          </div>
        </div>
      </div>
    );
  }
});

var LabTitleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  handleAddNewRootPost: function() {
    // 切换到编辑页面
    this.context.router.transitionTo('edit', null, {newPost: true});
  },

  render: function() {
    return (
      <div>
        <Button onClick={this.handleAddNewRootPost}>添加新文章</Button>
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
  render: function() {
    return (
      <LabTitleTreeContainer titles={this.state.titles}/>
    );
  }
});

var LabTitleTreeContainer = React.createClass({
  render: function() {
    var titles = []
    if (this.props.titles !== null && this.props.titles !== undefined) {
      titles = this.props.titles.map(function(item) {
        return (
          <LabTitleTreeItem key={item.id} post={item}></LabTitleTreeItem>
        );
      });
    }

    return (
      <ul className="labtree-nodes">
        {titles}
      </ul>
    );
  }
});

var LabTitleTreeItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  handleDoClick: function(event) {
    var iid = this.props.post.id;

    // 切换
    this.context.router.transitionTo('content', {itemId: iid});

    // 获取数据
    postActions.postFetch(iid);
  },
  handleCollapse: function(title) {
    if (this.props.post.collapse !== false) {
      this.props.post.collapse = false;
    } else {
      this.props.post.collapse = true;
    }

    titlesActions.titleCollapse();
  },
  render: function() {
    var post = this.props.post;
    var classStr = 'labtree-node-hide';
    if (post.collapse === false) {
      classStr = '';
    }
    return (
      <li className="labtree-node" >
        <span onClick={this.handleCollapse}>&rarr;</span>
        <span onClick={this.handleDoClick}>
           {post.title}
        </span >
        <div className={classStr}>
          <LabTitleTreeContainer titles={post.nodes}/>
        </div>
      </li>
    );
  }
});

var LabTestNav = React.createClass({
  render: function() {
    return (
      <div>
        <li><Link to="index">Index</Link></li>
      </div>
    );
  }
});

var LabEdit = React.createClass({
  mixins: [Reflux.connect(postStore, 'post')],
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    console.log('getInitialState');
    return {
      post: {
        id: 0,
        title: '',
        postText: '...'
      }
    };
  },

  parantIdChange: function(event) {
    var parantId = event.target.value;

    this.state.post.parantId = parantId;
    this.setState(this.state.post);
  },

  titleChange: function(event) {
    var title = event.target.value;

    this.state.post.title = title;
    this.setState(this.state.post);
  },

  handleEditorUpdate: function(data) {
    this.state.post.postText = data;
    this.setState(this.state.post);
  },

  handleUpdate: function() {
    // 提交更新
    postActions.postUpdate(this.state.post);

    // 切换到内容视图
    this.context.router.transitionTo('content', {itemId: this.state.post.id});
  },

  handleCreate: function() {
    // 提交更新
    postActions.postCreate(this.state.post);

    titlesActions.titlesInit();

    // 切换到内容视图
    this.context.router.transitionTo('content', {itemId: 0});
  },

  render: function() {
    // 这边是从路由的query中获取参数。
    var newPost = this.context.router.getCurrentQuery().newPost;
    var updateClass = 'ele-hide';
    var createClass = '';
    if (newPost === 'false') {
      updateClass = '';
      createClass = 'ele-hide';
    }
    console.log('new post ' + newPost);

    return (
      <div className="container-fluid">
        <h3>编辑</h3>
        <div className="row">
          <form className="form-horizontal">

            <Input type="text" label="ID" value={this.state.post.id} labelClassName='col-xs-2' wrapperClassName='col-xs-2' readOnly />

            <Input type="number" label="上级" value={this.state.post.parantId} onChange={this.parantIdChange} labelClassName='col-xs-2' wrapperClassName='col-xs-2' />

            <Input type="text" label="标题" ref='titleInput' value={this.state.post.title} onChange={this.titleChange} labelClassName='col-xs-2' wrapperClassName='col-xs-2' />

            <div className="form-group">
              <label>内容：</label>
                <AceEditor
                  mode="markdown"
                  theme="github"
                  name="posttext"
                  height="6em"
                  onChange={this.handleEditorUpdate}
                  value={this.state.post.postText}
                  />
            </div>

            <div className="form-group">
              <Button className={updateClass} onClick={this.handleUpdate}>更新</Button>
              <Button className={createClass} onClick={this.handleCreate}>保存</Button>
            </div>
          </form>
        </div>
      </div>

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
    console.log('getInitialState');
    return {
      post: {
        id: 0,
        title: '',
        postText: '...'
      }
    };
  },

  handleDelete: function() {
    var postId = this.state.post.id;

    // 切换到主页
    this.context.router.transitionTo('index');

    // 删除
    postActions.postDelete(postId);
  },

  handleStartEdit: function() {
    var postId = this.state.post.id;

    // 切换到编辑页面
    this.context.router.transitionTo('edit', {itemId: postId}, {newPost: false});

    // 加载
    postActions.postFetch(postId);
  },

  render: function() {
    var rawMarkup = marked(this.state.post.postText);
    return (
      <div className="container-fluid">
        <div className="row">
          <Button onClick={this.handleStartEdit}>编辑</Button>
          <Button onClick={this.handleDelete}>删除</Button>
          <Button>添加子文章</Button>
        </div>
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
