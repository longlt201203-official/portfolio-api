import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class ListBlogsQuery {
	@ApiProperty({ required: false })
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	page?: number;

	@ApiProperty({ required: false })
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	limit?: number;
}
