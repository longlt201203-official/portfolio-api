import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Injectable } from "@nestjs/common";
import { Env } from "@utils";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import {
	suggestHumanInstruction,
	suggestSystemInstruction,
} from "./instructions";
import { SuggestRequest } from "./dto";

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
		console.log(suggestHumanInstruction(dto));
		// const promptValue = await ChatPromptTemplate
		//     .fromMessages([
		//         new SystemMessage(suggestSystemInstruction),
		//         new HumanMessage(suggestHumanInstruction)
		//     ])
		//     .invoke(dto)

		// const data = await this.model.invoke(promptValue)
	}
}
