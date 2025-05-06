import { ProjectDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";

export class ProjectResponse {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	description: string;

	@ApiProperty()
	projectLink: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	isHidden: boolean;

	@ApiProperty()
	order: number;

	static fromDocument(d: ProjectDocumentType): ProjectResponse {
		return {
			id: d._id.toString(),
			name: d.name,
			description: d.description,
			projectLink: d.projectLink,
			createdAt: d.createdAt,
			isHidden: d.isHidden,
			order: d.order,
		};
	}

	static fromDocuments(ds: ProjectDocumentType[]): ProjectResponse[] {
		return ds.map(this.fromDocument);
	}
}
