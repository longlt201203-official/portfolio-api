import { Body, Controller, Post } from "@nestjs/common";
import { AiService } from "./ai.service";
import { SuggestRequest } from "./dto";
import { ApiResponseDto } from "@utils";

@Controller("ai")
export class AiController {
	constructor(private readonly aiService: AiService) {}

	@Post("suggest")
	async suggest(@Body() dto: SuggestRequest) {
		const data = await this.aiService.suggest(dto);
		return new ApiResponseDto(data);
	}
}
