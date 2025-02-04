import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail } from "class-validator";

export class BasicLoginRequest {
	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	password: string;

	@ApiProperty()
	@IsBoolean()
	remember: boolean;
}
