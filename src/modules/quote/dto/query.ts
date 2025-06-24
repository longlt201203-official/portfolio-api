import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class QuoteQuery {
	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	category?: string;

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	author?: string;
}
