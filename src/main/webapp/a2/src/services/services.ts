import { PostService } from './postService';
import {ProjectStore} from "./todoStore";
import {HttpService} from "./httpService";

export var appServicesInjectables: Array<any> = [
	PostService,
	ProjectStore,
	HttpService
];
