import { Controller, Get, Query } from "@nestjs/common";
import { FrontApiService } from "./front-api.service";
import { LandingPageInfoResponse, ListBlogsQuery, ViewBlogQuery } from "./dto";
import { ApiResponseDto, PaginationDto } from "@utils";
import { BlogResponse } from "@modules/blog/dto";
import { SkipAuth } from "@modules/auth";

@Controller("front-api")
@SkipAuth()
export class FrontApiController {
	constructor(private readonly frontApiService: FrontApiService) {}

	@Get("list-blogs")
	async getListBlogs(@Query() query: ListBlogsQuery) {
		const { data, count } = await this.frontApiService.getListBlogs(query);
		return new ApiResponseDto(
			BlogResponse.fromDocuments(data),
			new PaginationDto(query.page || 1, query.take || 10, count),
			"Success!",
		);
	}

	@Get("view-blog")
	async viewBlog(@Query() query: ViewBlogQuery) {
		const data = await this.frontApiService.viewBlog(query);
		return new ApiResponseDto(
			BlogResponse.fromDocument(data),
			null,
			"Success!",
		);
	}

	@Get("landing-page")
	async getLandingPageInfo() {
		const { blogs } = await this.frontApiService.getLandingPageInfo();
		return new ApiResponseDto(
			new LandingPageInfoResponse(blogs),
			null,
			"Success!",
		);
	}
}
