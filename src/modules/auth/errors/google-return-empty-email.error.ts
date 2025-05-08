import { ApiError } from "@errors";

export class GoogleReturnEmptyEmailError extends ApiError {
	constructor() {
		super({
			code: "google_return_empty_email_err",
			detail: null,
			message: "Google return empty email",
			status: 401,
		});
	}
}
