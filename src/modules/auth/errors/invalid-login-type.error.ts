import { ApiError } from "@errors";

export class InvalidLoginTypeError extends ApiError {
	constructor() {
		super({
			code: "invalid_login_type_err",
			message: "Invalid login type",
			detail: null,
		});
	}
}
