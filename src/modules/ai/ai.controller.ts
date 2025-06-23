import { Body, Controller, Param, Post } from "@nestjs/common";
import { AiService } from "./ai.service";
import { SuggestRequest } from "./dto";
import { ApiResponseDto } from "@utils";

@Controller("ai/:model")
export class AiController {
	constructor(private readonly aiService: AiService) {}

	@Post("suggest")
	async suggest(@Param("model") model: string, @Body() dto: SuggestRequest) {
		const data = await this.aiService.suggest(model, dto);
		return new ApiResponseDto(data);
	}
}
