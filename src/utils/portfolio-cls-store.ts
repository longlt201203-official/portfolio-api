import { IAccount } from "@db/models";
import { ClsStore } from "nestjs-cls";

export interface PortfolioClsStore extends ClsStore {
	account: { id: string } & IAccount;
}
