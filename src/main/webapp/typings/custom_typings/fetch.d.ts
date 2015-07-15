interface Fetch {
		(url: string): any;
		(url: string, options: any): any;
}

interface Request {
		post(options: any, cb: any): any;
}

declare var fetch: Fetch;

declare var request: Request;
