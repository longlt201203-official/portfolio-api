import { ApiError } from "@errors";

export class AccountInitializedError extends ApiError {
	constructor() {
		super({
			code: "account_initialized_err",
			message: "Account has already been initialized",
			detail: null,
		});
	}
}
