angular.module('mylabApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('modules/account/login/login.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><div class=row><div class=col-sm-12><h1>Login</h1><p>Accounts are reset on server restart from <code>server/config/seed.js</code>. Default account is <code>test@test.com</code> / <code>test</code></p><p>Admin account is <code>admin@admin.com</code> / <code>admin</code></p></div><div class=col-sm-12><form class=form name=form ng-submit=login(form) novalidate><div class=form-group><label>Email</label><input name=email class=form-control ng-model=user.email></div><div class=form-group><label>Password</label><input type=password name=password class=form-control ng-model=user.password></div><div class=\"form-group has-error\"><p class=help-block ng-show=\"form.email.$error.required && form.password.$error.required && submitted\">Please enter your email and password.</p><p class=help-block>{{ errors.other }}</p></div><div><button class=\"btn btn-inverse btn-lg btn-login\" type=submit>Login</button> <a class=\"btn btn-default btn-lg btn-register\" href=/signup>Register</a></div></form></div></div><hr></div>"
  );


  $templateCache.put('modules/account/settings/settings.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><div class=row><div class=col-sm-12><h1>Change Password</h1></div><div class=col-sm-12><form class=form name=form ng-submit=changePassword(form) novalidate><div class=form-group><label>Current Password</label><input type=password name=password class=form-control ng-model=user.oldPassword mongoose-error><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.other }}</p></div><div class=form-group><label>New Password</label><input type=password name=newPassword class=form-control ng-model=user.newPassword ng-minlength=3 required><p class=help-block ng-show=\"(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || submitted)\">Password must be at least 3 characters.</p></div><p class=help-block>{{ message }}</p><button class=\"btn btn-lg btn-primary\" type=submit>Save changes</button></form></div></div></div>"
  );


  $templateCache.put('modules/account/signup/signup.html',
    "<div ng-include=\"'components/navbar/navbar.html'\"></div><div class=container><div class=row><div class=col-sm-12><h1>Sign up</h1></div><div class=col-sm-12><form class=form name=form ng-submit=register(form) novalidate><div class=form-group ng-class=\"{ 'has-success': form.name.$valid && submitted,\n" +
    "                                            'has-error': form.name.$invalid && submitted }\"><label>Name</label><input name=name class=form-control ng-model=user.name required><p class=help-block ng-show=\"form.name.$error.required && submitted\">A name is required</p></div><div class=form-group ng-class=\"{ 'has-success': form.email.$valid && submitted,\n" +
    "                                            'has-error': form.email.$invalid && submitted }\"><label>Email</label><input type=email name=email class=form-control ng-model=user.email required mongoose-error><p class=help-block ng-show=\"form.email.$error.email && submitted\">Doesn't look like a valid email.</p><p class=help-block ng-show=\"form.email.$error.required && submitted\">What's your email address?</p><p class=help-block ng-show=form.email.$error.mongoose>{{ errors.email }}</p></div><div class=form-group ng-class=\"{ 'has-success': form.password.$valid && submitted,\n" +
    "                                            'has-error': form.password.$invalid && submitted }\"><label>Password</label><input type=password name=password class=form-control ng-model=user.password ng-minlength=3 required mongoose-error><p class=help-block ng-show=\"(form.password.$error.minlength || form.password.$error.required) && submitted\">Password must be at least 3 characters.</p><p class=help-block ng-show=form.password.$error.mongoose>{{ errors.password }}</p></div><div><button class=\"btn btn-inverse btn-lg btn-login\" type=submit>Sign up</button> <a class=\"btn btn-default btn-lg btn-register\" href=/login>Login</a></div></form></div></div></div>"
  );


  $templateCache.put('modules/admin/admin.html',
    "<div ng-include=\"'modules/components/navbar/navbar.html'\"></div><div class=container><p>The delete user and user index api routes are restricted to users with the 'admin' role.</p><ul class=list-group><li class=list-group-item ng-repeat=\"user in users\"><strong>{{user.name}}</strong><br><span class=text-muted>{{user.email}}</span> <a ng-click=delete(user) class=trash><span class=\"glyphicon glyphicon-trash pull-right\"></span></a></li></ul></div>"
  );


  $templateCache.put('modules/components/navbar/navbar.html',
    "<div class=\"navbar navbar-default navbar-static-top\" ng-controller=NavbarCtrl><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click=\"isCollapsed = !isCollapsed\"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <a href=\"/\" class=navbar-brand>mylab</a></div><div collapse=isCollapsed class=\"navbar-collapse collapse\" id=navbar-main><ul class=\"nav navbar-nav\"><!--<li ng-repeat=\"item in menu\" ng-class=\"{active: isActive2(item.link)}\">--><li ng-repeat=\"item in menu\" ui-sref-active=active><a ui-sref={{item.link}}>{{item.title}}</a></li><li ng-show=isAdmin() ng-class=\"{active: isActive('/admin')}\"><a href=/admin>Admin</a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li ng-hide=isLoggedIn() ng-class=\"{active: isActive('/signup')}\"><a href=/signup>Sign up</a></li><li ng-hide=isLoggedIn() ng-class=\"{active: isActive('/login')}\"><a href=/login>Login</a></li><li ng-show=isLoggedIn()><p class=navbar-text>Hello {{ getCurrentUser().name }}</p></li><li ng-show=isLoggedIn() ng-class=\"{active: isActive('/settings')}\"><a href=/settings><span class=\"glyphicon glyphicon-cog\"></span></a></li><li ng-show=isLoggedIn() ng-class=\"{active: isActive('/logout')}\"><a href=\"\" ng-click=logout()>Logout</a></li></ul></div></div></div>"
  );


  $templateCache.put('modules/components/ui-tree/nodes_renderer.html',
    "<div><div ui-tree-handle class=\"tree-node tree-node-content\"><a data-nodrag ng-click=toggle(this)><span class=glyphicon ng-class=\"{'glyphicon-chevron-right': collapsed, 'glyphicon-chevron-down': !collapsed}\"></span></a> <a href=/wikipost/{{node._id}}>{{node.title}}</a></div><ol ui-tree-nodes=\"\" ng-model=node.nodes ng-class=\"{hidden: collapsed}\"><li ng-repeat=\"node in node.nodes\" ui-tree-node ng-include=\"'components/ui-tree/nodes_renderer.html'\"></li></ol></div>"
  );


  $templateCache.put('modules/main/main.html',
    "<div ng-include=\"'modules/components/navbar/navbar.html'\"></div><footer class=footer><div class=container></div></footer>"
  );


  $templateCache.put('modules/wiki/collection-tpl.html',
    "<ul class=labtree-nodes><member ng-repeat=\"member in collection\" member=member></member></ul>"
  );


  $templateCache.put('modules/wiki/exp-member.html',
    "<li ui-sref-active=active class=labtree-node><span class=fa ng-click=toggle() ng-class=\"{'fa-plus-square-o': collapsed, 'fa-minus-square-o': !collapsed}\"></span> <a ui-sref=wiki.id({id:member.id}) class=labtree-node-text><span>{{member.title}}</span></a></li>"
  );


  $templateCache.put('modules/wiki/expander-tpl.html',
    "<div><div class=title ng-click=toggle()>{{title}}</div><div class=body ng-show=showMe ng-transclude></div></div>"
  );


  $templateCache.put('modules/wiki/pagination-tpl.html',
    "<div class=pagination><ul><li ng-class=\"{disabled: noPrevious()}\"><a ng-click=selectPrevious()>Previous</a></li><li ng-repeat=\"page in pages\" ng-class=\"{active : isActive(page)}\"><a ng-click=selectPage(page)>{{page}}</a></li><li ng-class=\"{disabled: noNext()}\"><a ng-click=selectNext()>Next</a></li></ul></div>"
  );


  $templateCache.put('modules/wiki/wikiedit.html',
    "<div class=container-fluid><div class=row><div class=col-md-12><div>编辑<form role=form><div class=form-group><label>ID：</label><input class=form-control ng-model=post.id readonly></div><div class=form-group><label>标题：</label><input class=form-control ng-model=post.title></div><div class=form-group><label>上级：</label><input class=form-control ng-model=post.parantId></div><div class=form-group><label>内容：</label><div class=form-control ng-model=post.post ui-ace=\"{useWrapMode : true, mode: 'markdown'}\"></div></div><div class=form-group><button class=\"btn btn-default\" ng-show=!isNew() ng-click=saveUpdate()>更新</button> <button class=\"btn btn-default\" ng-show=isNew() ng-click=saveNew()>保存</button></div></form></div></div></div></div>"
  );


  $templateCache.put('modules/wiki/wikiindex.html',
    "<div ng-include=\"'modules/components/navbar/navbar.html'\"></div><div class=container-fluid><div class=row><div class=\"col-md-3 labtree\"><div class=labtree-btn><button class=\"btn btn-primary\" ng-click=addNewPost()>添加新文章</button></div><div><collection collection=posts></collection></div></div><div class=col-md-9><div ui-view></div></div></div></div>"
  );


  $templateCache.put('modules/wiki/wikipost.html',
    "<div class=container-fluid><div class=row><div class=col-md-12><div><a class=\"btn btn-primary\" href=/wiki/edit/{{post.id}}>编辑</a> <button class=\"btn btn-default\" ng-click=delete()>删除</button> <button class=\"btn btn-default\" ng-click=createSubPost()>添加子文章</button></div><div class=topic_header><span class=topic_full_title>{{post.title}}</span></div><div class=inner_topic><div class=markdown-text ng-bind-html=ppp></div></div></div></div></div>"
  );

}]);
