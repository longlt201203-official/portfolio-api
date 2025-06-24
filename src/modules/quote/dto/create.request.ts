import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateQuoteRequest {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	author: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	content: string;

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	source?: string;

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	category?: string;
}
