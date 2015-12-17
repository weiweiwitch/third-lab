/// <reference path="../../../../typings/tsd.d.ts"/>

import {Component, View, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {Dir} from './dir';

@Component({
	selector: 'tree-view'
})
@View({
	templateUrl: 'components/ng2lab/trytreeview/treeview.html',
	directives: [CORE_DIRECTIVES, TreeViewCom]
})
export class TreeViewCom {
	@Input() dirs: Array<Dir> = [];
}
