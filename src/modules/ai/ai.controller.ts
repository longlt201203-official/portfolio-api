import { Body, Controller, Post } from "@nestjs/common";
import { AiService } from "./ai.service";
import { SuggestRequest } from "./dto";

@Controller("ai")
export class AiController {
	constructor(private readonly aiService: AiService) {}

	@Post("suggest")
	async suggest(@Body() dto: SuggestRequest) {
		return await this.aiService.suggest(dto);
	}
}
