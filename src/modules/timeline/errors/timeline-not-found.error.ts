import { ApiError } from "@errors";

export class TimelineNotFoundError extends ApiError {
	constructor() {
		super({
			code: "timeline_not_found_err",
			message: "Timeline Not Found!",
			detail: null,
			status: 404,
		});
	}
}
