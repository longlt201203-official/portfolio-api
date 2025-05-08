import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import {
	BasicLoginRequest,
	ChangePasswordRequest,
	LoginQuery,
	TokenResponse,
} from "./dto";
import { AccountDocumentType, AccountModel } from "@db/models";
import {
	AccountInitializedError,
	GoogleReturnEmptyEmailError,
	InvalidLoginTypeError,
	WrongPasswordError,
	WrongUsernameOrPasswordError,
} from "./errors";
import * as jwt from "jsonwebtoken";
import { Env, PortfolioClsStore } from "@utils";
import { LoginTypeEnum } from "./enums";
import { ClsService } from "nestjs-cls";
import { OAuth2Client } from "google-auth-library";
import { AccountNotFoundError } from "@modules/account/errors";

@Injectable()
export class AuthService {
	private firstLoginToken: string;
	private googleClient: OAuth2Client;
	constructor(private readonly cls: ClsService<PortfolioClsStore>) {
		this.googleClient = new OAuth2Client();
	}

	signToken(
		accountId: string,
		ua: string,
		ip: string,
		isFirstLogin: boolean = false,
	): TokenResponse {
		const now = Date.now();
		const expiresAt = now + Env.JWT_AT_EXPIRE_IN * 1000;
		const at = jwt.sign({ ua, ip }, Env.JWT_AT_SECRET, {
			subject: accountId,
			expiresIn: Env.JWT_AT_EXPIRE_IN,
		});
		return { accessToken: at, expiresAt, isFirstLogin };
	}

	async verifyAccessToken(token: string, ua: string, ip: string) {
		const data = jwt.verify(token, Env.JWT_AT_SECRET, {});
		if (typeof data === "string") return null;
		// if (data.ua == ua && ip == data.ip) return data.sub;
		return data.sub;
	}

	async generateFirstLoginToken() {
		const token = await bcrypt.genSalt(10);
		this.firstLoginToken = token;
		return token;
	}

	async basicLogin(dto: BasicLoginRequest, ua: string, ip: string) {
		let account: AccountDocumentType;
		let isFirstLogin = false;
		if (dto.password == this.firstLoginToken) {
			account = await this.initAccount(dto);
			isFirstLogin = true;
		} else {
			account = await AccountModel.findOne({ email: dto.email });
		}
		if (!account) throw new WrongUsernameOrPasswordError();
		const isPasswordValid = await bcrypt.compare(
			dto.password,
			account.password,
		);
		if (!isPasswordValid) throw new WrongUsernameOrPasswordError();
		return this.signToken(account._id.toString(), ua, ip, isFirstLogin);
	}

	async initAccount(dto: BasicLoginRequest) {
		let account = await AccountModel.findOne();
		if (account) throw new AccountInitializedError();
		account = new AccountModel({
			email: dto.email,
			password: await bcrypt.hash(dto.password, 10),
		});
		return await account.save();
	}

	private async googleLogin(credential: string, ua: string, ip: string) {
		const ticket = await this.googleClient.verifyIdToken({
			idToken: credential,
			audience: Env.GOOGLE_CLIENT_ID,
		});
		const payload = ticket.getPayload();
		if (!payload.email) throw new GoogleReturnEmptyEmailError();
		let account = await AccountModel.findOne({ email: payload.email });
		if (!account) throw new AccountNotFoundError();

		return this.signToken(account._id.toString(), ua, ip, false);
	}

	async login(query: LoginQuery, ua: string, ip: string) {
		switch (query.type) {
			case LoginTypeEnum.BASIC:
				const [email, password] = Buffer.from(query.code, "base64")
					.toString()
					.split(":");
				return await this.basicLogin(
					{ email, password, remember: false },
					ua,
					ip,
				);
			default:
				return await this.googleLogin(query.code, ua, ip);
		}
	}

	async changePassword(dto: ChangePasswordRequest) {
		const account = this.cls.get("account");
		const checkPassword = await bcrypt.compare(
			dto.currentPassword,
			account.password,
		);
		if (!checkPassword) throw new WrongPasswordError();
		await AccountModel.findByIdAndUpdate(account.id, {
			password: await bcrypt.hash(dto.newPassword, 10),
		});
	}

	getProfileCls() {
		const account = this.cls.get("account");
		return account;
	}
}
