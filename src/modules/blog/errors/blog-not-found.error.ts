import { ApiError } from "@errors";

export class BlogNotFoundError extends ApiError {
	constructor() {
		super({
			code: "blog_not_found_err",
			message: "Blog Not Found!",
			detail: null,
			status: 404,
		});
	}
}
