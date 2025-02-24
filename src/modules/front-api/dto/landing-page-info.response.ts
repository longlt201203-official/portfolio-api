import { BlogDocumentType } from "@db/models";
import { BlogResponse } from "@modules/blog/dto";
import { ApiProperty } from "@nestjs/swagger";

export class LandingPageInfoResponse {
	@ApiProperty({ type: BlogResponse, isArray: true })
	blogs: BlogResponse[];

	constructor(blogs: BlogDocumentType[]) {
		this.blogs = BlogResponse.fromDocuments(blogs);
	}
}
