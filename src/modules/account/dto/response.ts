import { AccountDocumentType, IAccount } from "@db/models";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class AccountResponse {
	@ApiProperty()
	id: string;

	@ApiProperty({ type: String, isArray: true })
	emails: string[];

	@ApiProperty()
	firstName: string;

	@ApiProperty()
	lastName: string;

	@ApiProperty({ type: String, isArray: true })
	phoneNumbers: string[];

	@ApiProperty({ type: String, isArray: true })
	addresses: string[];

	static fromDocument(
		account: { _id: Types.ObjectId } & IAccount,
	): AccountResponse {
		return {
			id: account._id.toString(),
			emails: account.emails,
			firstName: account.firstName,
			lastName: account.lastName,
			phoneNumbers: account.phoneNumbers,
			addresses: account.addresses,
		};
	}
}
