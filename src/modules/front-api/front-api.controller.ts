import { Controller, Get, Query } from "@nestjs/common";
import { FrontApiService } from "./front-api.service";
import { ListBlogsQuery } from "./dto";
import { ApiResponseDto } from "@utils";
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
			null,
			"Success!",
		);
	}
}
