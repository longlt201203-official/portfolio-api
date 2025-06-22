import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IQuote {
	author: string;
	content: string;
	source: string;
	category: string;
	createdAt: Date;
	updatedAt: Date;
	isVisible: boolean;
}

export type QuoteDocumentType = HydratedDocument<IQuote>;

export type QuoteModelType = Model<IQuote, {}, {}, {}, QuoteDocumentType>;

const QuoteSchema = new Schema<IQuote, QuoteModelType>({
	author: { type: String, required: true },
	content: { type: String, required: true },
	source: { type: String, required: false },
	category: { type: String, required: false },
	createdAt: { type: Date, required: true, default: () => new Date() },
	updatedAt: { type: Date, required: true, default: () => new Date() },
	isVisible: { type: Boolean, required: true, default: true },
});

export const QuoteModel = mongoose.model<IQuote, QuoteModelType>(
	"Quote",
	QuoteSchema,
);
