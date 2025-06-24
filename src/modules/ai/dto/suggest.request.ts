import { CreateBlogRequest } from "@modules/blog/dto";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";

export class PartialCreateBlogRequest extends PartialType(CreateBlogRequest) {}

export class SuggestRequest {
	@ApiProperty({ type: String, isArray: true })
	@IsArray()
	@IsString({ each: true })
	suggestRequestFields: string[];

	@ApiProperty({ type: PartialCreateBlogRequest })
	@ValidateNested()
	@Type(() => PartialCreateBlogRequest)
	params: PartialCreateBlogRequest;
}
