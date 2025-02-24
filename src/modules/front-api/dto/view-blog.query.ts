import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ViewBlogQuery {
	@ApiProperty()
	@IsString()
	blogId: string;
}
