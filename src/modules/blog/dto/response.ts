import { BlogDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";

export class BlogResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	language: string;

	@ApiProperty()
	title: string;

	@ApiProperty()
	shortDescription: string;

	@ApiProperty()
	content?: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;

	@ApiProperty()
	isVisible: boolean;

	static fromDocument(d: BlogDocumentType): BlogResponse {
		return {
			id: d._id.toString(),
			language: d.language,
			title: d.title,
			content: d.content,
			shortDescription: d.shortDescription,
			createdAt: d.createdAt,
			updatedAt: d.updatedAt,
			isVisible: d.isVisible,
		};
	}

	static fromDocuments(d: BlogDocumentType[]) {
		return d.map(this.fromDocument);
	}
}
