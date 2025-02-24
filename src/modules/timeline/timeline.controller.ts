import {
	Controller,
	Param,
	Body,
	Query,
	Post,
	Get,
	Put,
	Delete,
} from "@nestjs/common";
import { TimelineService } from "./timeline.service";
import {
	CreateTimelineRequest,
	UpdateTimelineRequest,
	TimelineQuery,
} from "./dto";
import { ApiResponseDto } from "@utils";

@Controller("timeline")
export class TimelineController {
	constructor(private readonly timelineService: TimelineService) {}

	@Post()
	async createOne(@Body() dto: CreateTimelineRequest) {
		await this.timelineService.createOne(dto);
		return new ApiResponseDto(null, null, "Created successfully");
	}

	@Put(":id")
	async updateOne(@Param("id") id: string, @Body() dto: UpdateTimelineRequest) {
		await this.timelineService.updateOne(id, dto);
		return new ApiResponseDto(null, null, "Updated successfully");
	}

	@Get()
	async findMany(@Query() query: TimelineQuery) {
		const data = await this.timelineService.findMany(query);
		return new ApiResponseDto(data);
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const data = await this.timelineService.findOne(id);
		return new ApiResponseDto(data);
	}

	@Delete(":id")
	async deleteOne(@Param("id") id: string) {
		await this.timelineService.deleteOne(id);
		return new ApiResponseDto(null, null, "Deleted successfully");
	}
}
