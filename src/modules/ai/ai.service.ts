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
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ModelNotFoundError, ParsingSuggestionError } from "./errors";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

@Injectable()
export class AiService {
	private readonly modelMap: Map<string, BaseChatModel> = new Map();
	constructor() {
		this.modelMap.set(
			"gemini-2.0-flash",
			new ChatGoogleGenerativeAI({
				model: "gemini-2.0-flash",
				apiKey: Env.GEMINI_API_KEY,
			}),
		);

		this.modelMap.set(
			"gpt-4",
			new ChatOpenAI({
				model: "gpt-4",
				apiKey: Env.OPENAI_API_KEY,
			}),
		);
	}

	private getModel(model: string) {
		if (!this.modelMap.has(model)) {
			throw new ModelNotFoundError();
		}
		return this.modelMap.get(model)!;
	}

	private cleanJsonString(raw: string): string {
		const firstBrace = raw.indexOf("{");
		const lastBrace = raw.lastIndexOf("}");

		if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
			return "";
		}

		return raw.substring(firstBrace, lastBrace + 1);
	}

	async suggest(model: string, dto: SuggestRequest) {
		const promptValue = await ChatPromptTemplate.fromMessages([
			new SystemMessage(suggestSystemInstruction),
			new HumanMessage(suggestHumanInstruction(dto)),
		]).invoke({});

		const response = await this.getModel(model).invoke(promptValue);

		const cleanedJson = this.cleanJsonString(response.content.toString());

		try {
			const parsed = JSON.parse(cleanedJson);
			return SuggestionResponseSchema.parse(parsed);
		} catch (error) {
			throw new ParsingSuggestionError(error);
		}
	}
}
