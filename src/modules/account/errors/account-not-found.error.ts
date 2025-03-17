import { ApiError } from "@errors";

export class AccountNotFoundError extends ApiError {
	constructor() {
		super({
			code: "account_not_found_err",
			message: "Account Not Found!",
			detail: null,
			status: 404,
		});
	}
}
