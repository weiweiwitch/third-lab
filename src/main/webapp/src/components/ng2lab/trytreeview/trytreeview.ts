/// <reference path="../../../../typings/tsd.d.ts"/>

import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {Dir} from './dir';
import {TreeViewCom} from './treeview';

@Component({
    selector: 'trytreeview',
    templateUrl: 'components/ng2lab/trytreeview/trytreeview.html',
    directives: [CORE_DIRECTIVES, TreeViewCom]
})
export class TryTreeViewCom {
    dirs: Array<Dir> = [];

    constructor() {
        var dir1: Dir = new Dir('1');
        this.dirs.push(dir1);
        var dir2: Dir = new Dir('2');
        this.dirs.push(dir2);
        var dir3: Dir = new Dir('3');
        this.dirs.push(dir3);
        var dir4: Dir = new Dir('4');
        this.dirs.push(dir4);

        var dir11: Dir = new Dir('11');
        dir1.dirs.push(dir11);
        var dir12: Dir = new Dir('12');
        dir1.dirs.push(dir12);

        var dir21: Dir = new Dir('21');
        dir2.dirs.push(dir11);
        var dir22: Dir = new Dir('22');
        dir2.dirs.push(dir12);
    }
}
