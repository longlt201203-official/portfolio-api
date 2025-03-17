import { TimelineDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";

export class TimelineResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	time: string;

	@ApiProperty()
	title: string;

	@ApiProperty({ isArray: true })
	content: string[];

	@ApiProperty()
	sort: number;

	@ApiProperty()
	createdAt: Date;

	static fromDocument(d: TimelineDocumentType): TimelineResponse {
		return {
			id: d._id.toString(),
			time: d.time,
			title: d.title,
			content: d.content,
			sort: d.sort,
			createdAt: d.createdAt,
		};
	}

	static fromDocuments(d: TimelineDocumentType[]) {
		return d.map(this.fromDocument);
	}
}
