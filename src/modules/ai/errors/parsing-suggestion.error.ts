import { ApiError } from "@errors";

export class ParsingSuggestionError extends ApiError {
	constructor(originalError?: any) {
		super({
			code: "PARSING_SUGGESTION_FAILED",
			message: "Failed to parse suggestion from AI model",
			status: 500,
			detail: originalError?.message,
		});
	}
}
