import { Controller, Param, Body, Put } from "@nestjs/common";
import { AccountService } from "./account.service";
import { UpdateAccountRequest } from "./dto";
import { ApiMessageResponseDto, SwaggerApiMessageResponse } from "@utils";
import { SkipAuth } from "@modules/auth";

@Controller("account")
@SkipAuth()
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Put(":id")
	@SwaggerApiMessageResponse()
	async updateOne(@Param("id") id: string, @Body() dto: UpdateAccountRequest) {
		await this.accountService.updateOne(id, dto);
		return new ApiMessageResponseDto("Updated successfully");
	}
}
