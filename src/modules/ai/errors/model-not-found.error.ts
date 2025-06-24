import { ApiError } from "@errors";

export class ModelNotFoundError extends ApiError {
	constructor() {
		super({
			code: "model_not_found_err",
			message: "Model not found",
			detail: null,
			status: 404,
		});
	}
}
