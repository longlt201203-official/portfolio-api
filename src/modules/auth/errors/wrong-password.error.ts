import { ApiError } from "@errors";

export class WrongPasswordError extends ApiError {
	constructor() {
		super({
			code: "wrong_password_err",
			message: "Wrong password!",
			detail: null,
		});
	}
}
