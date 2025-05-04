import { IAccount } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class AccountResponse {
	@ApiProperty()
	id: string;

	@ApiProperty({ type: String })
	email: string;

	static fromDocument(
		account: { _id: Types.ObjectId } & IAccount,
	): AccountResponse {
		return {
			id: account._id.toString(),
			email: account.email,
		};
	}
}
