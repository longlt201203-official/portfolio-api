import { ApiProperty } from "@nestjs/swagger";
import { LoginTypeEnum } from "../enums";
import { IsString } from "class-validator";

export class LoginQuery {
	@ApiProperty()
	@IsString()
	code: string;

	@ApiProperty({ enum: LoginTypeEnum })
	@IsString()
	type: string;
}
