import { ApiError } from "@errors";

export class InvalidTokenError extends ApiError {
	constructor() {
		super({
			code: "invalid_token_err",
			message: "Token is invalid",
			detail: null,
			status: 401,
		});
	}
}
