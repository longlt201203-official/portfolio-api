import { Injectable } from "@nestjs/common";
import {
	CreateAccountRequest,
	UpdateAccountRequest,
	AccountQuery,
} from "./dto";
import { AccountModel } from "@db/models";
import { AccountNotFoundError } from "./errors/account-not-found.error";

@Injectable()
export class AccountService {
	async createOne(dto: CreateAccountRequest) {}

	async updateOne(id: string, dto: UpdateAccountRequest) {
		const account = await this.findOne(id);
		if (!account) throw new AccountNotFoundError();

		account.emails = dto.emails;
		account.firstName = dto.firstName;
		account.lastName = dto.lastName;
		account.phoneNumbers = dto.phoneNumbers;
		account.addresses = dto.addresses;

		return await account.save();
	}

	async findMany(query: AccountQuery) {}

	async findOne(id: string | number) {
		return await AccountModel.findById(id);
	}

	async deleteOne(id: string | number) {}
}
