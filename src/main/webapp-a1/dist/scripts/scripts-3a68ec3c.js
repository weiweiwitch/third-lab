"use strict";angular.module("mylabApp.post-tree",[]).directive("collection",function(){return{restrict:"E",replace:!0,scope:{collection:"="},templateUrl:"components/components/post-tree/collection-tpl.html"}}).directive("member",["$compile",function(t){return{restrict:"E",replace:!0,scope:{member:"=member"},templateUrl:"components/components/post-tree/exp-member.html",controller:["$scope",function(t){t.collapsed=!1,t.showThisPost=function(t){console.log(t)}}],link:function(e,o){if(e.toggle=function(){e.member.collapsed=!e.member.collapsed,e.collapsed=e.member.collapsed},e.collapsed=e.member.collapsed,angular.isArray(e.member.nodes)){var n='<div ng-show="!collapsed"><collection collection="member.nodes"></collection></div>',i=t(n);i(e,function(t){o.append(t)})}}}}]),angular.module("mylabApp",["ngCookies","ngResource","ngSanitize","ngMaterial","ui.router","ui.ace","hc.marked","restangular","mylabApp.post-tree"]).config(["$locationProvider","$httpProvider",function(){}]).config(["$stateProvider","$urlRouterProvider",function(t,e){e.otherwise("/wiki")}]).config(["markedProvider",function(t){t.setOptions({gfm:!0,tables:!0,highlight:function(t){return hljs.highlightAuto(t).value}})}]).factory("authInterceptor",["$rootScope","$q","$cookieStore","$location",function(t,e,o,n){return console.log("authInterceptor"),{request:function(t){return t.headers=t.headers||{},o.get("token")&&(t.headers.Authorization="Bearer "+o.get("token")),t},responseError:function(t){return 401===t.status?(console.log("login"),n.path("/login"),o.remove("token"),e.reject(t)):e.reject(t)}}}]).run(["$rootScope","$location","Auth",function(){}]),angular.module("mylabApp").controller("NavbarCtrl",["$scope","$location","Auth",function(t,e,o){t.menu=[{title:"Wiki",link:"wiki"}],t.isCollapsed=!0,t.isLoggedIn=o.isLoggedIn,t.isAdmin=o.isAdmin,t.getCurrentUser=o.getCurrentUser,t.logout=function(){o.logout(),e.path("/login")},t.isActive=function(t){return t===e.path()}}]),console.log("post service"),angular.module("mylabApp").factory("PostRes",["Restangular",function(t){console.log("PostRes init");var e=t.all("api/posts");return e}]),angular.module("mylabApp").factory("User",["$resource",function(t){return console.log("User init"),t("/api/users/:id/:controller",{id:"@_id"},{changePassword:{method:"PUT",params:{controller:"password"}},get:{method:"GET",params:{id:"me"}}})}]),angular.module("mylabApp").factory("Auth",["$location","$rootScope","$http","User","$cookieStore","$q",function(t,e,o,n,i,a){var l={};return i.get("token")&&(l=n.get()),console.log("Auth init"),{login:function(t,e){var s=e||angular.noop,r=a.defer();return o.post("/auth/local",{email:t.email,password:t.password}).success(function(t){return i.put("token",t.token),l=n.get(),r.resolve(t),s()}).error(function(t){return this.logout(),r.reject(t),s(t)}.bind(this)),r.promise},logout:function(){i.remove("token"),l={}},createUser:function(t,e){var o=e||angular.noop;return n.save(t,function(e){return i.put("token",e.token),l=n.get(),o(t)},function(t){return this.logout(),o(t)}.bind(this)).$promise},changePassword:function(t,e,o){var i=o||angular.noop;return n.changePassword({id:l._id},{oldPassword:t,newPassword:e},function(t){return i(t)},function(t){return i(t)}).$promise},getCurrentUser:function(){return l},isLoggedIn:function(){return l.hasOwnProperty("role")},isAdmin:function(){return"admin"===l.role},getToken:function(){return i.get("token")}}}]),angular.module("mylabApp").config(["$stateProvider",function(t){t.state("wiki.id",{url:"/post/:id",templateUrl:"components/wiki/wikipost.html",controller:"WikiPostCtrl",resolve:{post:["$stateParams","PostRes",function(t,e){return e.get(t.id)}]}})}]).controller("WikiPostCtrl",["$scope","$location","LabShareData","PostRes","post","marked",function(t,e,o,n,i,a){t.post=i,t.headingList=[];var l=a.lexer(i.postText);console.log(l);for(var s=0;s<l.length;s++){var r=l[s];if(console.log(r.type),void 0!==r&&"heading"===r.type){var c="tp-p0";2===r.depth?c="tp-p2":3===r.depth?c="tp-p3":4===r.depth?c="tp-p4":5===r.depth&&(c="tp-p5");var d={depth:r.depth,text:r.text,type:r.type,depthcls:c};t.headingList.push(d)}}console.log(t.headingList),t.ppp=a(i.postText),t["delete"]=function(){t.post.remove().then(function(){console.log("successful"),t.$emit("wikipostchg"),e.path("/wiki")},function(){console.log("failed"),e.path("/wiki")})},t.createSubPost=function(){o.parantId=i.id,e.path("/wiki/new")}}]),angular.module("mylabApp").config(["$stateProvider",function(t){t.state("wiki",{url:"/wiki",templateUrl:"components/wiki/wikiindex.html",controller:"WikiIndexCtrl",resolve:{posts:["PostRes",function(t){console.log("查询列表");var e=t.getList();return e}]}})}]).factory("LabShareData",function(){return console.log("factory LabShareData"),{}}).controller("WikiIndexCtrl",["$scope","$state","$location","$http","$q","LabShareData","PostRes","posts",function(t,e,o,n,i,a,l,s){console.log("WikiIndexCtrl"),t.addNewPost=function(){delete a.parantId,o.path("/wiki/new")},t.searchData={},t.jump2Post=function(){void 0!==t.searchData.selectedItem&&e.go("wiki.id",{id:t.searchData.selectedItem.id})},t.search=function(){var e=t.searchData.searchText,o=i.defer();return n.get("/api/whichpost",{params:{postParam:e}}).success(function(t){console.log(t);var e=t.postInfos;o.resolve(e)}).error(function(){o.reject("")}),o.promise};var r=function(t){for(var e=0;e<t.length;e++){var o=t[e];o.collapsed=!0,void 0!==o.nodes&&null!==o.nodes&&r(o.nodes)}};r(s),t.$on("wikipostchg",function(){console.log("监听到保存");var e=t.posts,o=[],n={},i=function(t,e,o){for(var n=0;n<o.length;n++){var a=o[n];t.push(a),e[a.id]=a,void 0!==a.nodes&&null!==a.nodes&&i(t,e,a.nodes)}};i(o,n,e),l.getList().then(function(e){t.posts=e;var o=[],a={};i(o,a,e),r(o);for(var l=0;l<o.length;l++){var s=o[l],c=n[s.id];void 0!==c&&c.collapsed===!1&&(s.collapsed=c.collapsed)}})}),t.posts=s}]),angular.module("mylabApp").filter("toMark",function(){return function(t){return t}}).config(["$stateProvider",function(t){t.state("wiki.editid",{url:"/edit/:id",templateUrl:"components/wiki/wikiedit.html",controller:"WikiPostEditCtrl",resolve:{post:["$stateParams","PostRes",function(t,e){return e.get(t.id)}]}}).state("wiki.new",{url:"/new",templateUrl:"components/wiki/wikiedit.html",controller:"WikiPostNewCtrl"})}]).controller("WikiPostEditCtrl",["$scope","$location","$filter","PostRes","post","Restangular",function(t,e,o,n,i,a){t.text="这是文章的编辑页",t.post=a.copy(i),t.isNew=function(){return!1},t.aceChanged=function(t){console.log(t)},t.saveUpdate=function(){console.log("测试保存更新 "+t.post.postText),t.post.put().then(function(){console.log("successful"),t.$emit("wikipostchg"),e.path("/wiki/post/"+i.id)},function(){console.log("failed"),e.path("/wiki/post/"+i.id)})}}]).controller("WikiPostNewCtrl",["$scope","$location","LabShareData","PostRes",function(t,e,o,n){t.post={user:"aaa",title:"",postText:"",parantId:0},void 0!==o.parantId&&(t.post.parantId=o.parantId),t.aceChanged=function(t){console.log(t)},t.isNew=function(){return!0},t.saveNew=function(){console.log("测试保存 "+t.post.postText),n.post(t.post).then(function(){console.log("successful"),t.$emit("wikipostchg"),e.path("/wiki")},function(){console.log("failed"),e.path("/wiki")})}}]),angular.module("mylabApp").run(["$templateCache",function(t){t.put("components/wiki/expander-tpl.html",'<div><div class="title" ng-click="toggle()">{{title}}</div><div class="body" ng-show="showMe" ng-transclude=""></div></div>'),t.put("components/wiki/pagination-tpl.html",'<div class="pagination"><ul><li ng-class="{disabled: noPrevious()}"><a ng-click="selectPrevious()">Previous</a></li><li ng-repeat="page in pages" ng-class="{active : isActive(page)}"><a ng-click="selectPage(page)">{{page}}</a></li><li ng-class="{disabled: noNext()}"><a ng-click="selectNext()">Next</a></li></ul></div>'),t.put("components/wiki/wikiedit.html",'<div layout="column"><h3>编辑</h3><div role="form"><md-content layout="row"><md-input-container class="form-group" flex="10"><label>ID：</label> <input type="text" class="form-control" ng-model="post.id" readonly=""></md-input-container><md-input-container class="form-group" flex="10"><label>上级：</label> <input type="text" class="form-control" ng-model="post.parantId"></md-input-container><md-input-container class="form-group" flex="*"><label>标题：</label> <input type="text" class="form-control" ng-model="post.title"></md-input-container></md-content><div class="form-group"><label>内容：</label><div class="form-control" ng-model="post.postText" ui-ace="{useWrapMode : true, mode: \'markdown\', onChange: aceChanged}"></div></div><div class="form-group"><md-button class="md-raised" ng-show="!isNew()" ng-click="saveUpdate()">更新</md-button><md-button class="md-raised" ng-show="isNew()" ng-click="saveNew()">保存</md-button></div></div></div>'),t.put("components/wiki/wikiindex.html",'<div layout="column"><div ng-include="\'components/components/navbar/navbar.html\'"></div><div layout="row"><div layout="column" flex="15" class="labtree"><div class="labtree-btn"><md-button class="md-raised" ng-click="addNewPost()">添加新文章</md-button></div><md-content class="topic-tree"><div><collection collection="posts"></collection></div></md-content></div><div flex="*" layout="column" class="lab-main-board"><div layout="row" layout-align="start center"><md-autocomplete flex="35" md-no-cache="true" md-selected-item="searchData.selectedItem" md-search-text="searchData.searchText" md-items="item in search()" md-item-text="item.title" placeholder="标题搜索"><span md-highlight-text="searchText">{{item.title}}</span></md-autocomplete><md-button class="md-raised md-primary" ng-disabled="searchData.searchText === undefined" ng-click="jump2Post()">显示</md-button></div><br><div ui-view=""></div></div></div></div>'),t.put("components/wiki/wikipost.html",'<div layout="column"><div><md-button class="md-raised md-primary" ui-sref="wiki.editid({id:post.id})">编辑</md-button><md-button class="md-raised" ng-click="delete()">删除</md-button><md-button class="md-raised" ng-click="createSubPost()">添加子文章</md-button></div><div layout="row"><md-content class="inner_topic_container" flex="*"><div class="topic_header"><span class="topic_full_title">{{post.title}}</span></div><div class="inner_topic"><div class="markdown-text" ng-bind-html="ppp"></div></div></md-content><ul class="chapter-nodes" flex="15"><li ng-repeat="heading in headingList"><span class="{{heading.depthcls}}">{{heading.text}}</span></li></ul></div></div>'),t.put("components/components/navbar/navbar.html",'<div class="navbar navbar-default navbar-static-top" ng-controller="NavbarCtrl"><md-toolbar class="navbar-header"><h1 class="md-toolbar-tools">mylab</h1></md-toolbar></div>'),t.put("components/components/post-tree/collection-tpl.html",'<ul class="labtree-nodes"><member ng-repeat="member in collection" member="member"></member></ul>'),t.put("components/components/post-tree/exp-member.html",'<li ui-sref-active="active" class="labtree-node"><span class="fa" ng-click="toggle()" ng-class="{\'fa-plus-square-o\': collapsed, \'fa-minus-square-o\': !collapsed}"></span> <a ui-sref="wiki.id({id:member.id})" class="labtree-node-text">{{member.title}}</a></li>')}]);