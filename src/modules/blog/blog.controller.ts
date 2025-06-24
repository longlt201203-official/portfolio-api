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
import { BlogService } from "./blog.service";
import {
	CreateBlogRequest,
	UpdateBlogRequest,
	BlogQuery,
	BlogResponse,
} from "./dto";
import {
	ApiMessageResponseDto,
	ApiResponseDto,
	SwaggerApiMessageResponse,
	SwaggerApiResponse,
} from "@utils";

@Controller("blog")
export class BlogController {
	constructor(private readonly blogService: BlogService) {}

	@Post()
	@SwaggerApiMessageResponse()
	async createOne(@Body() dto: CreateBlogRequest) {
		await this.blogService.createOne(dto);
		return new ApiMessageResponseDto("Success!");
	}

	@Put(":id")
	@SwaggerApiMessageResponse()
	async updateOne(@Param("id") id: string, @Body() dto: UpdateBlogRequest) {
		await this.blogService.updateOne(id, dto);
		return new ApiMessageResponseDto("Success!");
	}

	@Get()
	@SwaggerApiResponse(BlogResponse, { isArray: true })
	async findMany() {
		const data = await this.blogService.findMany();
		return new ApiResponseDto(BlogResponse.fromDocuments(data));
	}

	@Get(":id/toggle-visible")
	@SwaggerApiMessageResponse()
	async toggleVisible(@Param("id") id: string) {
		await this.blogService.toggleVisible(id);
		return new ApiMessageResponseDto("Success!");
	}

	@Get(":id")
	@SwaggerApiResponse(BlogResponse)
	async findOne(@Param("id") id: string) {
		const data = await this.blogService.findOneOrFail(id);
		return new ApiResponseDto(BlogResponse.fromDocument(data));
	}

	@Delete(":id")
	@SwaggerApiMessageResponse()
	async deleteOne(@Param("id") id: string) {
		await this.blogService.deleteOne(id);
		return new ApiMessageResponseDto("Success!");
	}
}
