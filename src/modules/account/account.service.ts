import { Injectable } from "@nestjs/common";
import { AccountModel } from "@db/models";
import { AccountNotFoundError } from "./errors/account-not-found.error";

@Injectable()
export class AccountService {
	async findOne(id: string, fail: boolean = false) {
		const account = await AccountModel.findById(id);
		if (!account && fail) throw new AccountNotFoundError();
		return account;
	}
}
