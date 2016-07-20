import {Injectable} from 'angular2/core';
import {HttpService} from "./httpService";

export class ProjectGroup {
	id: number;
	name: string;
	projects: Project[] = [];
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

	public data: TaskData;

	constructor(private httpService: HttpService) {

	}

	// 获取所有的项目组和项目和任务
	findAllProjects(successCb) {
		this.httpService.httpGet('/projects', null, (data) => {
			successCb(data);
		})
	}
}
