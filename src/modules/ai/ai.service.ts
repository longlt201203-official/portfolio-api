import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Injectable } from "@nestjs/common";
import { Env } from "@utils";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import {
	suggestHumanInstruction,
	suggestSystemInstruction,
} from "./instructions";
import { SuggestionResponseSchema, SuggestRequest } from "./dto";
import { ChatOpenAI } from "@langchain/openai";
import zodToJsonSchema from "zod-to-json-schema";

@Injectable()
export class AiService {
	private readonly model: ChatOpenAI;
	constructor() {
		this.model = new ChatOpenAI({
			model: "gpt-4",
			apiKey: Env.OPENAI_API_KEY,
		});
	}

	async suggest(dto: SuggestRequest) {
		const promptValue = await ChatPromptTemplate.fromMessages([
			new SystemMessage(suggestSystemInstruction),
			new HumanMessage(suggestHumanInstruction(dto)),
		]).invoke({});

		return await this.model
			.withStructuredOutput(zodToJsonSchema(SuggestionResponseSchema))
			.invoke(promptValue);
	}
}
