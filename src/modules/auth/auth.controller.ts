import {
	Body,
	Controller,
	Get,
	Post,
	Put,
	Query,
	Req,
	Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { BasicLoginRequest, ChangePasswordRequest, LoginQuery } from "./dto";
import { Request, Response } from "express";
import { ApiResponseDto, Env } from "@utils";
import { ApiError } from "@errors";
import { SkipAuth } from "./skip-auth.decorator";
import { AccountResponse } from "@modules/account/dto";
import { Types } from "mongoose";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("basic-login")
	async basicLogin(@Body() dto: BasicLoginRequest, @Req() req: Request) {
		const ua = req.headers["user-agent"];
		const ip =
			(req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress;
		const data = await this.authService.basicLogin(dto, ua, ip);
		return new ApiResponseDto(data, null, "Login successful");
	}

	@Get("login")
	@SkipAuth()
	async login(
		@Query() query: LoginQuery,
		@Req() req: Request,
		@Res() res: Response,
	) {
		try {
			const ua = req.headers["user-agent"];
			const ip =
				(req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress;
			const { accessToken, isFirstLogin, expiresAt } =
				await this.authService.login(query, ua, ip);
			res.cookie("accessToken", accessToken, {
				httpOnly: true,
				domain: Env.NODE_ENV != "local" && Env.APP_DOMAIN,
				expires: new Date(expiresAt),
			});
			if (isFirstLogin) {
				res.redirect(Env.FRONT_CHANGE_PASS_URI);
			} else {
				res.redirect(Env.FRONT_ADMIN_URI);
			}
		} catch (err) {
			if (err instanceof ApiError) {
				res.redirect(`${Env.FRONT_LOGIN_URI}?error=${err.code}`);
			} else {
				console.log(err);
				res.redirect(`${Env.FRONT_LOGIN_URI}?error=unknow_err`);
			}
		}
	}

	@Put("change-password")
	async changePassword(@Body() dto: ChangePasswordRequest) {
		await this.authService.changePassword(dto);
		return new ApiResponseDto(null, null, "Success!");
	}

	@Get("profile")
	async getProfile() {
		const account = this.authService.getProfileCls();
		return new ApiResponseDto(
			AccountResponse.fromDocument({
				...account,
				_id: new Types.ObjectId(account.id),
			}),
			null,
			"Success!",
		);
	}
}
