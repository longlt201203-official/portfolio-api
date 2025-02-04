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
import { CreateBlogRequest, UpdateBlogRequest, BlogQuery } from "./dto";
import { ApiResponseDto } from "@utils";

@Controller("blog")
export class BlogController {
	constructor(private readonly blogService: BlogService) {}

	@Post()
	async createOne(@Body() dto: CreateBlogRequest) {
		await this.blogService.createOne(dto);
		return new ApiResponseDto(null, null, "Created successfully");
	}

	@Put(":id")
	async updateOne(@Param("id") id: string, @Body() dto: UpdateBlogRequest) {
		await this.blogService.updateOne(id, dto);
		return new ApiResponseDto(null, null, "Updated successfully");
	}

	@Get()
	async findMany(@Query() query: BlogQuery) {
		const data = await this.blogService.findMany(query);
		return new ApiResponseDto(data);
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const data = await this.blogService.findOne(id);
		return new ApiResponseDto(data);
	}

	@Delete(":id")
	async deleteOne(@Param("id") id: string) {
		await this.blogService.deleteOne(id);
		return new ApiResponseDto(null, null, "Deleted successfully");
	}
}
