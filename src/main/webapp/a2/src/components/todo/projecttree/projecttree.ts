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
					this.projectitems.push(projectItem);
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

	// 添加组
	addGroup() {
		let params = {
			groupName: '新建项目组'
		};
		this.httpService.httpGet('/addprojectgroup', params, (data) => {
			console.log(data);

			// 将项目组添加到最后
			let groupItem = new ProjectItem();
			groupItem.id = data.groupId;
			groupItem.itemType = 1;
			groupItem.name = params.groupName;
			this.projectitems.push(groupItem);
		})
	}

	// 添加项目
	addProject() {
		if (this.selectedGroup == null || this.selectedGroup.itemType == 2) {
			console.log('尚未选择任何组');
			return;
		}

		let specGroupId = this.selectedGroup.id;
		let params = {
			name: '新建项目',
			groupId: specGroupId
		};
		this.httpService.httpGet('/addproject', params, (data) => {
			console.log(data);

			// 将项目添加到指定组的最后
			let groupItem = new ProjectItem();
			groupItem.id = data.projectId;
			groupItem.itemType = 2;
			groupItem.name = params.name;

			let index: number = 0;
			let foundSpecGroup: boolean = false;
			for (let item of this.projectitems) {
				if (foundSpecGroup == false) {
					// 寻找项目组
					if (item.itemType == 1 && item.id == specGroupId) {
						// 找到目标组
						foundSpecGroup = true;
					}
				} else {
					// 已经发现目标项目组, 寻找组中项目的最后位置
					if (item.itemType == 1) {
						// 找到的下一个是项目组,那么插入到之前项目组的后面
						break;
					}
				}

				index++;
			}
			this.projectitems.splice(index, 0, groupItem);
		})
	}

	del(item : ProjectItem) {
		if (item.itemType == 1) {
			// 删除项目组

		} else {
			// 删除项目
		}
	}


}