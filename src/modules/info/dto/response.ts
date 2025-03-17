import { InfoDocumentType } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";

export class InfoResponse {
	@ApiProperty()
	avt: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	introduction: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	phone: string;

	@ApiProperty()
	location: string;

	@ApiProperty()
	githubLink: string;

	@ApiProperty()
	linkedinLink: string;

	@ApiProperty()
	githubUsername: string;

	@ApiProperty()
	linkedinName: string;

	@ApiProperty()
	updatedAt: Date;

	static fromDocument(d: InfoDocumentType): InfoResponse {
		return {
			avt: d.avt,
			name: d.name,
			introduction: d.introduction,
			email: d.email,
			phone: d.phone,
			location: d.location,
			githubLink: d.githubLink,
			githubUsername: d.githubUsername,
			linkedinLink: d.linkedinLink,
			linkedinName: d.linkedinName,
			updatedAt: d.updatedAt,
		};
	}
}
