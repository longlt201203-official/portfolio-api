import {
	BlogDocumentType,
	InfoDocumentType,
	TimelineDocumentType,
} from "@db/models";
import { BlogResponse } from "@modules/blog/dto";
import { InfoResponse } from "@modules/info/dto";
import { TimelineResponse } from "@modules/timeline/dto";
import { ApiProperty } from "@nestjs/swagger";

export class LandingPageInfoResponse {
	@ApiProperty({ type: BlogResponse, isArray: true })
	blogs: BlogResponse[];

	@ApiProperty({ type: TimelineResponse, isArray: true })
	timelines: TimelineResponse[];

	@ApiProperty({ type: InfoResponse })
	info: InfoResponse;

	constructor(
		blogs: BlogDocumentType[],
		timelines: TimelineDocumentType[],
		info: InfoDocumentType,
	) {
		this.blogs = BlogResponse.fromDocuments(blogs);
		this.timelines = TimelineResponse.fromDocuments(timelines);
		this.info = InfoResponse.fromDocument(info);
	}
}
