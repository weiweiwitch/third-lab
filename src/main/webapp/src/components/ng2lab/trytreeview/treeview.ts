import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {Dir} from './dir';

@Component({
	selector: 'tree-view',
	template: require('./treeview.html'),
	directives: [CORE_DIRECTIVES, TreeViewCom]
})
export class TreeViewCom {
	@Input() dirs: Array<Dir> = [];
}
