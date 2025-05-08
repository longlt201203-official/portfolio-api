import {
	BlogDocumentType,
	InfoDocumentType,
	ProjectDocumentType,
	TimelineDocumentType,
} from "@db/models";
import { BlogResponse } from "@modules/blog/dto";
import { InfoResponse } from "@modules/info/dto";
import { ProjectResponse } from "@modules/project/dto";
import { TimelineResponse } from "@modules/timeline/dto";
import { ApiProperty } from "@nestjs/swagger";

export class LandingPageInfoResponse {
	@ApiProperty({ type: BlogResponse, isArray: true })
	blogs: BlogResponse[];

	@ApiProperty({ type: TimelineResponse, isArray: true })
	timelines: TimelineResponse[];

	@ApiProperty({ type: InfoResponse })
	info: InfoResponse;

	@ApiProperty({ type: ProjectResponse, isArray: true })
	projects: ProjectResponse[];

	constructor(
		blogs: BlogDocumentType[],
		timelines: TimelineDocumentType[],
		info: InfoDocumentType,
		projects: ProjectDocumentType[],
	) {
		this.blogs = BlogResponse.fromDocuments(blogs);
		this.timelines = TimelineResponse.fromDocuments(timelines);
		this.info = InfoResponse.fromDocument(info);
		this.projects = ProjectResponse.fromDocuments(projects);
	}
}
