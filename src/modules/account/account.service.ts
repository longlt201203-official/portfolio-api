import { Injectable } from "@nestjs/common";
import {
	CreateAccountRequest,
	UpdateAccountRequest,
	AccountQuery,
} from "./dto";
import { AccountModel } from "@db/models";

@Injectable()
export class AccountService {
	async createOne(dto: CreateAccountRequest) {}

	async updateOne(id: string | number, dto: UpdateAccountRequest) {}

	async findMany(query: AccountQuery) {}

	async findOne(id: string | number) {
		return await AccountModel.findById(id);
	}

	async deleteOne(id: string | number) {}
}
