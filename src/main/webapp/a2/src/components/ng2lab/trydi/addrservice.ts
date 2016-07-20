import {Injectable} from 'angular2/core'

@Injectable()
export class AddrService {
	constructor() {
		console.log('AddrService constructor');
	}

	getAddr() {
		return "这里显示的是来自服务的地址";
	}
}
