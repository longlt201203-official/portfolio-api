import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export const SuggestionResponseSchema = z.object({
	title: z.string().optional().describe("Title of the blog"),
	shortDescription: z
		.string()
		.optional()
		.describe("Short description of the blog"),
	content: z.string().optional().describe("Content of the blog"),
	categories: z.array(z.string()).optional().describe("Categories of the blog"),
});

export type SuggestionResponseType = z.infer<typeof SuggestionResponseSchema>;

export class SuggestionResponse implements SuggestionResponseType {
	@ApiProperty({ required: false })
	title?: string;

	@ApiProperty({ type: String, isArray: true, required: false })
	categories?: string[];

	@ApiProperty({ required: false })
	content?: string;

	@ApiProperty({ required: false })
	shortDescription?: string;
}
