import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateInfoAvtRequest {
	@ApiProperty({ type: "string", format: "binary" })
	file: any;
}

export class UpdateInfoRequest {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsString()
	introduction: string;

	@ApiProperty()
	@IsString()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsString()
	phone: string;

	@ApiProperty()
	@IsString()
	location: string;

	@ApiProperty()
	@IsString()
	githubLink: string;

	@ApiProperty()
	@IsString()
	linkedinLink: string;

	@ApiProperty()
	@IsString()
	githubUsername: string;

	@ApiProperty()
	@IsString()
	linkedinName: string;
}
