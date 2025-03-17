import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class CreateAccountRequest {
	@ApiProperty({ type: String, isArray: true })
	@IsArray()
	@IsString({ each: true })
	emails: string[];

	@ApiProperty()
	@IsString()
	firstName: string;

	@ApiProperty()
	@IsString()
	lastName: string;

	@ApiProperty({ type: String, isArray: true })
	@IsArray()
	@IsString({ each: true })
	phoneNumbers: string[];

	@ApiProperty({ type: String, isArray: true })
	@IsArray()
	@IsString({ each: true })
	addresses: string[];
}
