import {
	Controller,
	Param,
	Body,
	Post,
	Get,
	Put,
	Delete,
} from "@nestjs/common";
import { TimelineService } from "./timeline.service";
import {
	CreateTimelineRequest,
	UpdateTimelineRequest,
	TimelineResponse,
} from "./dto";
import {
	ApiMessageResponseDto,
	ApiResponseDto,
	SwaggerApiMessageResponse,
	SwaggerApiResponse,
} from "@utils";

@Controller("timeline")
export class TimelineController {
	constructor(private readonly timelineService: TimelineService) {}

	@Post()
	@SwaggerApiMessageResponse()
	async createOne(@Body() dto: CreateTimelineRequest) {
		await this.timelineService.createOne(dto);
		return new ApiMessageResponseDto("Success!");
	}

	@Put(":id")
	@SwaggerApiMessageResponse()
	async updateOne(@Param("id") id: string, @Body() dto: UpdateTimelineRequest) {
		await this.timelineService.updateOne(id, dto);
		return new ApiMessageResponseDto("Success!");
	}

	@Get(":id/toggle-visible")
	@SwaggerApiMessageResponse()
	async toggleVisible(@Param("id") id: string) {
		await this.timelineService.toggleVisibility(id);
		return new ApiResponseDto(null, null, "Success!");
	}

	@Get()
	@SwaggerApiResponse(TimelineResponse, { isArray: true })
	async findMany() {
		const data = await this.timelineService.findMany();
		return new ApiResponseDto(
			TimelineResponse.fromDocuments(data),
			null,
			"Success!",
		);
	}

	@Delete(":id")
	@SwaggerApiMessageResponse()
	async deleteOne(@Param("id") id: string) {
		await this.timelineService.deleteOne(id);
		return new ApiResponseDto(null, null, "Deleted successfully");
	}
}
