import {Component, OnInit} from "angular2/core";
import {RouterOutlet, RouterLink} from "angular2/router";
import {CORE_DIRECTIVES} from "angular2/common";
import {ProjectStore} from "../../services/todoStore";
import {ProjectTreeCom} from "./projecttree/projecttree";

var css = require('./todo.scss');

@Component({
	selector: 'todo',
	template: require('./todo.html'),
	directives: [RouterOutlet, RouterLink, CORE_DIRECTIVES, ProjectTreeCom]
})
export class TodoCom implements OnInit {

	constructor(private projectStore: ProjectStore) {

	}

	ngOnInit(): any {
		
	}

}
