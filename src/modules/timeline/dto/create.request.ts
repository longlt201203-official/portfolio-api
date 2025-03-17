import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateTimelineRequest {
	@ApiProperty()
	@IsString()
	time: string;

	@ApiProperty()
	@IsString()
	title: string;

	@ApiProperty({ type: String, isArray: true })
	@IsString({ each: true })
	content: string[];

	@ApiProperty()
	@IsNumber()
	sort: number;
}
