import {Component, OnInit} from "angular2/core";
import {RouterOutlet, RouterLink} from "angular2/router";
import {CORE_DIRECTIVES} from "angular2/common";
import {ProjectStore, ProjectGroup, Project} from "../../../services/todoStore";
import {HttpService} from "../../../services/httpService";

var css = require('./projecttree.scss');

class ProjectItem {
	id: number;
	name: string;
	itemType: number; // 类型, 1: group, 2: 项目
	subItems: ProjectItem[] = [];
}

@Component({
	selector: 'projecttree',
	template: require('./projecttree.html'),
	directives: [RouterOutlet, RouterLink, CORE_DIRECTIVES]
})
export class ProjectTreeCom implements OnInit {

	projectitems: ProjectItem[] = [];
	selectedGroup: ProjectItem;

	constructor(private projectStore: ProjectStore, private httpService: HttpService) {

	}

	ngOnInit(): any {
		this.refresh();
	}

	refresh() {
		this.projectStore.findAllProjects((data) => {
			// 建立关联
			let tmpItems: ProjectItem[] = [];
			let groupMap = new Map<number, ProjectGroup>();
			data.groups.forEach((group: ProjectGroup) => {
				let item = new ProjectItem();
				item.id = group.id;
				item.name = group.name;
				item.itemType = 1;
				tmpItems.push(item);
				groupMap[group.id] = item;
			});
			data.projects.forEach((project: Project)=> {
				let item = new ProjectItem();
				item.id = project.id;
				item.name = project.name;
				item.itemType = 2;
				groupMap[project.groupId].subItems.push(item);
			});

			tmpItems.forEach((item) => {
				this.projectitems .push(item);
				item.subItems.forEach((projectItem) => {
					this.projectitems .push(projectItem);
				});
			});
		});
	}

	isProject(item): boolean {
		return item.itemType == 2 ? true : false;
	}

	selectProject(item) {
		this.selectedGroup = item;
	}

	addGroup() {
		let params = {
			groupName: 'aaaa'
		};
		this.httpService.httpGet('/addprojectgroup', params, (data) => {
			console.log(data);
		})
	}

	addProject() {
		if (this.selectedGroup == null) {
			console.log('尚未选择任何组');
			return;
		}

		let params = {
			name: 'bbbbbbb',
			groupId: this.selectedGroup.id
		};
		this.httpService.httpGet('/addproject', params, (data) => {
			console.log(data);
		})
	}

}