import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateBlogRequest {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	language: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	shortDescription: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	content: string;

	@ApiProperty({ type: String, isArray: true })
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	@IsArray()
	categories: string[];
}
