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
import { ProjectService } from "./project.service";
import {
	CreateProjectRequest,
	UpdateProjectRequest,
	ProjectQuery,
	ProjectResponse,
} from "./dto";
import { ApiResponseDto } from "@utils";

@Controller("project")
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Post()
	async createOne(@Body() dto: CreateProjectRequest) {
		await this.projectService.createOne(dto);
		return new ApiResponseDto(null, null, "Created successfully");
	}

	@Put(":id")
	async updateOne(@Param("id") id: string, @Body() dto: UpdateProjectRequest) {
		await this.projectService.updateOne(id, dto);
		return new ApiResponseDto(null, null, "Updated successfully");
	}

	@Get()
	async findMany(@Query() query: ProjectQuery) {
		const data = await this.projectService.findMany(query);
		return new ApiResponseDto(ProjectResponse.fromDocuments(data));
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const data = await this.projectService.findOne(id);
		return new ApiResponseDto(ProjectResponse.fromDocument(data));
	}

	@Delete(":id")
	async deleteOne(@Param("id") id: string) {
		await this.projectService.deleteOne(id);
		return new ApiResponseDto(null, null, "Deleted successfully");
	}
}
