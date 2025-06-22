import { Injectable } from "@nestjs/common";
import { CreateQuoteRequest, UpdateQuoteRequest, QuoteQuery } from "./dto";
import { QuoteModel } from "@db/models";
import { QuoteNotFoundError } from "./errors";

@Injectable()
export class QuoteService {
	async createOne(dto: CreateQuoteRequest) {
		const quote = new QuoteModel(dto);
		return await quote.save();
	}

	async updateOne(id: string, dto: UpdateQuoteRequest) {
		const quote = await this.findOne(id);
		quote.author = dto.author;
		quote.content = dto.content;
		quote.source = dto.source;
		quote.category = dto.category;
		quote.updatedAt = new Date();
		return await quote.save();
	}

	async findMany(query: QuoteQuery) {
		const filter: any = {};

		if (query.category) {
			filter.category = query.category;
		}

		if (query.author) {
			filter.author = query.author;
		}

		return await QuoteModel.find(filter).sort({ updatedAt: -1 });
	}

	async findOne(id: string) {
		const quote = await QuoteModel.findById(id);
		if (!quote) throw new QuoteNotFoundError();
		return quote;
	}

	async deleteOne(id: string) {
		const quote = await this.findOne(id);
		await QuoteModel.deleteOne({ _id: quote._id });
	}

	async toggleVisibility(id: string) {
		const quote = await this.findOne(id);
		quote.isVisible = !quote.isVisible;
		await quote.save();
	}
}
