import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { AccountService } from "@modules/account";
import { InvalidTokenError } from "./errors";
import { ClsService } from "nestjs-cls";
import { PortfolioClsStore } from "@utils";
import { Reflector } from "@nestjs/core";
import { SkipAuth } from "./skip-auth.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly authService: AuthService,
		private readonly accountService: AccountService,
		private readonly cls: ClsService<PortfolioClsStore>,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext) {
		const opts = this.reflector.getAllAndOverride(SkipAuth, [
			context.getClass(),
			context.getHandler(),
		]);
		if (opts != undefined) return true;

		const req = context.switchToHttp().getRequest<Request>();
		const ua = req.headers["user-agent"];
		const ip =
			(req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress;
		const token = this.getTokenFromCookie(req);
		if (!token) throw new InvalidTokenError();
		const accountId = await this.authService.verifyAccessToken(token, ua, ip);
		if (!accountId) throw new InvalidTokenError();
		const account = await this.accountService.findOne(accountId);
		if (!account) throw new InvalidTokenError();
		this.cls.set("account", {
			...account.toObject(),
			id: account._id.toString(),
		});
		return true;
	}

	getTokenFromCookie(req: Request) {
		return req.cookies["accessToken"];
	}
}
