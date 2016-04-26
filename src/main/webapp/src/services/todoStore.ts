import {Injectable} from 'angular2/core';
import {HttpService} from "./httpService";

export class ProjectGroup {
	id: number;
	name: string;
}

export class Project {
	id: number;
	name: string;
	groupId: number;
}

export class ProjectTask {
	id: number;
	name: string;
	note: string;
	createTime: number;
	period: number;
	nextPeriodTime: number;
	status: number;
	projectId: number;
	parentTask: number;
}

export class TaskData {
	groups: ProjectGroup[];
	projects: Project[];
	tasks: ProjectTask[];
}

@Injectable()
export class ProjectStore {

	private data: TaskData;

	constructor(private httpService: HttpService) {

	}

	// 获取所有的项目组和项目和任务
	findAllTasks() {
		this.httpService.httpGet('/projecttasks', null, (data) => {
			this.data = data;
		})
	}
}
