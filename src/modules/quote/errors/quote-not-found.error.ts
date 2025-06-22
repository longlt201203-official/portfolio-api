import { ApiError } from "@errors";

export class QuoteNotFoundError extends ApiError {
	constructor() {
		super({
			code: "quote_not_found_err",
			message: "Quote Not Found!",
			detail: null,
			status: 404,
		});
	}
}
