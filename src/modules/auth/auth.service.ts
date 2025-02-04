import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { BasicLoginRequest, LoginQuery, TokenResponse } from "./dto";
import { AccountDocumentType, AccountModel } from "@db/models";
import {
	AccountInitializedError,
	InvalidLoginTypeError,
	WrongUsernameOrPasswordError,
} from "./errors";
import * as jwt from "jsonwebtoken";
import { Env } from "@utils";
import { LoginTypeEnum } from "./enums";

@Injectable()
export class AuthService {
	private firstLoginToken: string;

	signToken(
		accountId: string,
		ua: string,
		ip: string,
		isFirstLogin: boolean = false,
	): TokenResponse {
		const now = Date.now();
		const expiresAt = now + Env.JWT_AT_EXPIRE_IN * 1000;
		const at = jwt.sign(
			{
				ua,
				ip,
			},
			Env.JWT_AT_SECRET,
			{
				subject: accountId,
				expiresIn: Env.JWT_AT_EXPIRE_IN,
			},
		);
		return {
			accessToken: at,
			expiresAt,
			isFirstLogin,
		};
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
			account = await AccountModel.findOne({ emails: dto.email });
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
			emails: [dto.email],
			password: await bcrypt.hash(dto.password, 10),
			addresses: [],
			firstName: "Admin",
			lastName: "Admin",
			phoneNumbers: [],
		});
		return await account.save();
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
				throw new InvalidLoginTypeError();
		}
	}
}
