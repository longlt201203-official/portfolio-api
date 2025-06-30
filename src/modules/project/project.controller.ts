import {
	Controller,
	Param,
	Body,
	Post,
	Get,
	Put,
	Delete,
} from "@nestjs/common";
import { ProjectService } from "./project.service";
import {
	CreateProjectRequest,
	UpdateProjectRequest,
	ProjectResponse,
} from "./dto";
import {
	ApiResponseDto,
	SwaggerApiMessageResponse,
	SwaggerApiResponse,
} from "@utils";

@Controller("project")
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Post()
	@SwaggerApiMessageResponse()
	async createOne(@Body() dto: CreateProjectRequest) {
		await this.projectService.createOne(dto);
		return new ApiResponseDto(null, null, "Created successfully");
	}

	@Put(":id")
	@SwaggerApiMessageResponse()
	async updateOne(@Param("id") id: string, @Body() dto: UpdateProjectRequest) {
		await this.projectService.updateOne(id, dto);
		return new ApiResponseDto(null, null, "Updated successfully");
	}

	@Get(":id/toggle-visible")
	@SwaggerApiMessageResponse()
	async toggleVisibility(@Param("id") id: string) {
		await this.projectService.toggleVisibility(id);
		return new ApiResponseDto(null, null, "Updated successfully");
	}

	@Get()
	@SwaggerApiResponse(ProjectResponse, { isArray: true })
	async findMany() {
		const data = await this.projectService.findMany();
		return new ApiResponseDto(ProjectResponse.fromDocuments(data));
	}

	@Get(":id")
	@SwaggerApiResponse(ProjectResponse)
	async findOne(@Param("id") id: string) {
		const data = await this.projectService.findOne(id);
		return new ApiResponseDto(ProjectResponse.fromDocument(data));
	}

	@Delete(":id")
	@SwaggerApiMessageResponse()
	async deleteOne(@Param("id") id: string) {
		await this.projectService.deleteOne(id);
		return new ApiResponseDto(null, null, "Deleted successfully");
	}
}
