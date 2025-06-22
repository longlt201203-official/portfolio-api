import { QuoteDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";

export class QuoteResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	author: string;

	@ApiProperty()
	content: string;

	@ApiProperty({ required: false })
	source?: string;

	@ApiProperty({ required: false })
	category?: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;

	@ApiProperty()
	isVisible: boolean;

	static fromDocument(d: QuoteDocumentType): QuoteResponse {
		return {
			id: d._id.toString(),
			author: d.author,
			content: d.content,
			source: d.source,
			category: d.category,
			createdAt: d.createdAt,
			updatedAt: d.updatedAt,
			isVisible: d.isVisible,
		};
	}

	static fromDocuments(d: QuoteDocumentType[]) {
		return d.map(this.fromDocument);
	}
}
