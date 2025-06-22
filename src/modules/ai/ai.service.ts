import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Injectable } from "@nestjs/common";
import { Env } from "@utils";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import {
	suggestHumanInstruction,
	suggestSystemInstruction,
} from "./instructions";
import { SuggestionResponseSchema, SuggestRequest } from "./dto";

@Injectable()
export class AiService {
	private readonly model: ChatGoogleGenerativeAI;
	constructor() {
		this.model = new ChatGoogleGenerativeAI({
			model: "gemini-2.0-flash",
			apiKey: Env.GEMINI_API_KEY,
		});
	}

	async suggest(dto: SuggestRequest) {
		const promptValue = await ChatPromptTemplate.fromMessages([
			new SystemMessage(suggestSystemInstruction),
			new HumanMessage(suggestHumanInstruction(dto)),
		]).invoke({});

		return await this.model
			.withStructuredOutput(SuggestionResponseSchema)
			.invoke(promptValue);
	}
}
