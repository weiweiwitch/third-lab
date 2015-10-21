/// <reference path="../../../../typings/tsd.d.ts"/>

import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';

import {Dir} from './dir';

@Component({
    selector: 'tree-view',
    inputs: ['dirs: dirs']
})
@View({
    templateUrl: 'components/ng2lab/trytreeview/treeview.html',
    directives: [CORE_DIRECTIVES, TreeViewCom]
})
export class TreeViewCom {
    dirs: Array<Dir> = [];
}
